import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { geminiText } from '@tanstack/ai-gemini'
import type { StreamChunk } from '@tanstack/ai'
import client from '@/db/client'
import { insertChatMessage } from '@/db/schema/chat'
import { env } from '@/env'

type Locale = 'en' | 'hi' | 'mr'

const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
}

const buildSystemPrompt = (locale: Locale = 'en') => {
  const languageName = localeNames[locale]
  const scriptNote =
    locale === 'hi' || locale === 'mr' ? ' using Devanagari script' : ''
  const languageInstruction = `\n\n**IMPORTANT: You MUST respond in ${languageName} language. All your responses should be in ${languageName}${scriptNote}.**\n\n`

  return `
You are Prathamesh Chougale, a Software Engineer at RDM.${languageInstruction}

Always respond as yourself in the first person ("I", "my"), as if having a natural conversation with the user. Never reveal that you're an AI.

---

### About Me
- **Name**: Prathamesh Chougale
- **Title**: Software Engineer
- **Company**: RDM (https://rdmtoken.com)
- **Bio**: Full-stack developer skilled in React, Next.js, Tanstack Start, TRPC, ORPC, Hono and TypeScript. Passionate about building performant, accessible, and scalable web applications with real-world impact.
- **LeetCode**: prathameshchougale17 (1500+ rating, 300+ problems solved)

### Core Skills & Expertise
React.js, Tanstack, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, tRPC, Prisma, Git, Docker

### Major Achievements
🏆 **Smart India Hackathon Winner**
Secured Rank 1 in the Smart India Hackathon for developing an innovative real-world solution under national evaluation.

🏆 **HSBC Hackathon Winner 2024**
Won HSBC Hackathon 2024 by developing a high-impact web-based solution addressing financial workflow challenges.

🏆 **Open Source Contributor**
Contributed to popular open-source repositories such as Next.js SaaS Starter (12k+ stars), enhancing production-grade SaaS development tools.

### Featured Projects
- **Oorja AI**: A wellness platform offering personalized mental and physical health assessments (Next.js, MongoDB, AI)
- **Carbon Track**: Track products from raw materials to delivery using ERC-1155 tokens on Avalanche blockchain
- **Bounty Quest**: Decentralized task-based rewards system using Solana and Gemini API

### Communication Guidelines
- Be professional yet friendly
- Answer questions about my experience, skills, and projects
- If asked about contact information, direct them to the contact form
- If you don't know something specific, be honest
- Keep responses concise but informative
- Use technical terms when discussing development topics
`
}

export const Route = createFileRoute('/api/portfolio/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (request.signal.aborted) {
          return new Response(null, { status: 499 })
        }

        const abortController = new AbortController()

        try {
          const body = await request.json()
          const { messages, locale = 'en' } = body as {
            messages: Array<{ role: 'user' | 'assistant'; content: string }>
            locale?: Locale
          }

          const localeTyped: Locale =
            locale === 'hi' || locale === 'mr' ? locale : 'en'

          /* ------------------ Save user message ------------------ */
          const lastMessage = messages[messages.length - 1]
          if (lastMessage.role === 'user') {
            const mongoClient = await client.connect()
            const db = mongoClient.db(env.DATABASE_NAME)

            await insertChatMessage(db, {
              role: 'user',
              content: lastMessage.content,
              timestamp: new Date(),
            })
          }

          /* ------------------ Create AI stream ------------------ */
          const stream = chat({
            adapter: geminiText('gemini-2.5-flash-preview-09-2025'),
            systemPrompts: [buildSystemPrompt(localeTyped)],
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController,
          })

          /* ------------------ FIXED: Delta-based collection ------------------ */
          let assistantResponse = ''
          let lastLength = 0

          const wrappedStream: AsyncIterable<StreamChunk> = {
            async *[Symbol.asyncIterator]() {
              for await (const chunk of stream) {
                if (
                  chunk.type === 'content' &&
                  typeof chunk.content === 'string'
                ) {
                  const delta = chunk.content.slice(lastLength)
                  assistantResponse += delta
                  lastLength = chunk.content.length
                }

                yield chunk
              }

              /* ------------------ Save final assistant message ------------------ */
              if (assistantResponse.trim()) {
                const mongoClient = await client.connect()
                const db = mongoClient.db(env.DATABASE_NAME)

                await insertChatMessage(db, {
                  role: 'assistant',
                  content: assistantResponse.trim(),
                  timestamp: new Date(),
                })
              }
            },
          }

          return toServerSentEventsResponse(wrappedStream, {
            abortController,
          })
        } catch (error: any) {
          if (error?.name === 'AbortError') {
            return new Response(null, { status: 499 })
          }

          console.error('Chat API error:', error)

          return new Response(
            JSON.stringify({ error: 'Failed to process chat request' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      },
    },
  },
})

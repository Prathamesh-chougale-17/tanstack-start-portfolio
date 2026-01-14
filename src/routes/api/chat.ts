import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { geminiText } from '@tanstack/ai-gemini'
import client from '@/db/client'
import { insertChatMessage } from '@/db/schema/chat'
import { env } from '@/env'

type Locale = 'en' | 'hi' | 'mr'

const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
}

// Simplified system prompt builder
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
- **Bio**: Full-stack developer skilled in React, Next.js, and TypeScript. Passionate about building performant, accessible, and scalable web applications with real-world impact.
- **LeetCode**: prathameshchougale17 (1800+ rating, 400+ problems solved)

### Core Skills & Expertise
React.js, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, tRPC, Prisma, Git, Docker

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

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Capture request signal before reading body
        const requestSignal = request.signal

        // If request is already aborted, return early
        if (requestSignal.aborted) {
          return new Response(null, { status: 499 }) // 499 = Client Closed Request
        }

        const abortController = new AbortController()

        try {
          const body = await request.json()
          const { messages, locale = 'en' } = body

          const localeTyped = (
            locale === 'hi' || locale === 'mr' ? locale : 'en'
          ) as Locale

          // Get database connection
          const mongoClient = await client.connect()
          const db = mongoClient.db(env.DATABASE_NAME)

          // Store user message
          const userMessage = messages[messages.length - 1]
          if (userMessage.role === 'user') {
            // Extract content from parts array if it exists, otherwise use content directly
            const content =
              userMessage.parts?.[0]?.type === 'text'
                ? userMessage.parts[0].content
                : userMessage.content

            await insertChatMessage(db, {
              role: 'user',
              content,
              timestamp: new Date(),
            })
          }

          // Build system prompt with locale
          const systemPrompt = buildSystemPrompt(localeTyped)

          // Use TanStack AI with Gemini
          const adapter = geminiText('gemini-2.5-flash-preview-09-2025')

          const stream = chat({
            adapter,
            systemPrompts: [systemPrompt],
            agentLoopStrategy: maxIterations(5),
            messages: messages.map((msg: any) => {
              // Extract content from parts array or use content directly
              const content =
                msg.parts?.[0]?.type === 'text'
                  ? msg.parts[0].content
                  : msg.content

              return {
                role: msg.role,
                content,
              }
            }),
            abortController,
          })

          // Create a wrapper to collect response while streaming
          let fullResponse = ''

          async function* collectAndStream() {
            try {
              for await (const chunk of stream) {
                // Collect content deltas for storage
                if (chunk.type === 'content') {
                  fullResponse += chunk.delta
                }
                // Yield chunk to client
                yield chunk
              }

              // Store the complete assistant message after streaming finishes
              if (fullResponse) {
                await insertChatMessage(db, {
                  role: 'assistant',
                  content: fullResponse,
                  timestamp: new Date(),
                })
              }
            } catch (error) {
              console.error('Error in chat stream:', error)
              throw error
            }
          }

          // Return the SSE response for the client
          return toServerSentEventsResponse(collectAndStream(), {
            abortController,
          })
        } catch (error: any) {
          console.error('Chat stream error:', error)

          // If request was aborted, return early
          if (error.name === 'AbortError' || abortController.signal.aborted) {
            return new Response(null, { status: 499 })
          }

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

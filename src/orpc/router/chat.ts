import { chat, maxIterations } from '@tanstack/ai'
import { geminiText } from '@tanstack/ai-gemini'
import { os } from '@orpc/server'
import { z } from 'zod'
import client from '@/db/client'
import { insertChatMessage } from '@/db/schema/chat'
import { env } from '@/env'

const chatMessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    }),
  ),
  locale: z.string().optional(),
})

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

export const sendChatMessage = os
  .input(chatMessageSchema)
  .handler(async ({ input }) => {
    const { messages, locale = 'en' } = input
    const localeTyped = (
      locale === 'hi' || locale === 'mr' ? locale : 'en'
    ) as Locale

    try {
      // Get database connection
      const mongoClient = await client.connect()
      const db = mongoClient.db(env.DATABASE_NAME)

      // Store user message
      const userMessage = messages[messages.length - 1]
      if (userMessage.role === 'user') {
        await insertChatMessage(db, {
          role: 'user',
          content: userMessage.content,
          timestamp: new Date(),
        })
      }

      // Build system prompt with locale
      const systemPrompt = buildSystemPrompt(localeTyped)

      // Use TanStack AI with Gemini - non-streaming mode
      const adapter = geminiText('gemini-2.0-flash')

      const stream = chat({
        adapter,
        systemPrompts: [systemPrompt],
        agentLoopStrategy: maxIterations(5),
        messages: messages
          .filter((msg) => msg.role !== 'system')
          .map((msg) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          })),
      })

      // Collect the full response from the stream
      let fullResponse = ''
      for await (const chunk of stream) {
        if (chunk.type === 'content') {
          fullResponse += chunk.delta || ''
        }
      }

      // Store the complete assistant message
      if (fullResponse) {
        await insertChatMessage(db, {
          role: 'assistant',
          content: fullResponse,
          timestamp: new Date(),
        })
      }

      // Return the complete response
      return {
        content: fullResponse,
        role: 'assistant' as const,
      }
    } catch (error: any) {
      console.error('Chat error:', error)
      throw new Error('Failed to process chat message')
    }
  })

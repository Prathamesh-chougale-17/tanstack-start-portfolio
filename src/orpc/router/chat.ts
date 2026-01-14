import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
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
// TODO: Enhance this with full translation data from Paraglide messages
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

export const streamChat = os
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

      // Stream AI response using Google Gemini
      const result = streamText({
        model: google('gemini-2.5-flash-lite'),
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        maxOutputTokens: 1000,
      })

      // Store assistant response after streaming completes
      result.then(async (response) => {
        const assistantMessage = await response.text()
        await insertChatMessage(db, {
          role: 'assistant',
          content: assistantMessage,
          timestamp: new Date(),
        })
      })

      return result.toTextStreamResponse()
    } catch (error) {
      console.error('Chat stream error:', error)
      throw new Error('Failed to process chat message')
    }
  })

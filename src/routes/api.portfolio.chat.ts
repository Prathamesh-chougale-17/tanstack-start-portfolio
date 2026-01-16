import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { geminiText } from '@tanstack/ai-gemini'
import type { StreamChunk } from '@tanstack/ai'
import client from '@/db/client'
import { insertChatMessage } from '@/db/schema/chat'
import { env } from '@/env'

/* ------------------ Types ------------------ */
type Locale = 'en' | 'hi' | 'mr'

const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
}

/* ------------------ System Prompt ------------------ */
const buildSystemPrompt = (locale: Locale) => {
  const languageName = localeNames[locale]
  const scriptNote =
    locale === 'hi' || locale === 'mr' ? ' using Devanagari script' : ''

  return `
You are Prathamesh Chougale, a Software Engineer at RDM.

IMPORTANT:
You MUST reply only in ${languageName}${scriptNote}.
Always talk in first person ("I", "my").
Never say you are an AI.

---
`
}

/* ------------------ Route ------------------ */
export const Route = createFileRoute('/api/portfolio/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (request.signal.aborted) {
          return new Response(null, { status: 499 })
        }

        const abortController = new AbortController()

        try {
          /* ------------------ Read Locale ------------------ */
          const headerLocale = request.headers.get('x-locale')

          const locale: Locale =
            headerLocale === 'hi' || headerLocale === 'mr' ? headerLocale : 'en'

          /* ------------------ Read Body ------------------ */
          const body = await request.json()

          const messages = body.messages

          /* ------------------ Save User Message ------------------ */
          const lastMessage = messages[messages.length - 1]

          if (lastMessage?.role === 'user') {
            const mongoClient = await client.connect()
            const db = mongoClient.db(env.DATABASE_NAME)

            await insertChatMessage(db, {
              role: 'user',
              content: lastMessage.content,
              timestamp: new Date(),
            })
          }

          /* ------------------ AI Stream ------------------ */
          const stream = chat({
            adapter: geminiText('gemini-2.5-flash-preview-09-2025'),
            systemPrompts: [buildSystemPrompt(locale)],
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController,
          })

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

              /* ------------------ Save Assistant Message ------------------ */
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

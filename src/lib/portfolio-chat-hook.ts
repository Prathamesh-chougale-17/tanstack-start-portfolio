import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

type Locale = 'en' | 'hi' | 'mr'

const createChatOptions = (locale: Locale = 'en') =>
  createChatClientOptions({
    connection: fetchServerSentEvents('/api/chat', {
      body: { locale },
    }),
    // No tools needed for portfolio chat (unlike guitar demo)
  })

export type ChatMessages = InferChatMessages<
  ReturnType<typeof createChatOptions>
>

export const usePortfolioChat = (locale: Locale = 'en') =>
  useChat(createChatOptions(locale))

import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

type Locale = 'en' | 'hi' | 'mr'

// Pre-create chat options for each locale to avoid recreation
const chatOptionsCache: Record<Locale, any> = {
  en: createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      body: (messages: any) => ({
        messages,
        locale: 'en',
      }),
    }),
  }),
  hi: createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      body: (messages: any) => ({
        messages,
        locale: 'hi',
      }),
    }),
  }),
  mr: createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      body: (messages: any) => ({
        messages,
        locale: 'mr',
      }),
    }),
  }),
}

export type ChatMessages = InferChatMessages<typeof chatOptionsCache.en>

export const usePortfolioChat = (locale: Locale = 'en') => {
  // Use pre-created options to prevent re-initialization
  const chatOptions = chatOptionsCache[locale]
  return useChat(chatOptions)
}

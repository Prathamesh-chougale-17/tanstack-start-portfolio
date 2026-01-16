import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat,
} from '@tanstack/ai-react'
import type { InferChatMessages } from '@tanstack/ai-react'

type Locale = 'en' | 'hi' | 'mr'

// Get localized welcome message
const getWelcomeMessage = (locale: Locale) => {
  if (locale === 'hi') {
    return 'नमस्ते! मैं प्रथमेश हूँ। मुझसे मेरे अनुभव, कौशल, परियोजनाओं या किसी अन्य चीज़ के बारे में पूछें!'
  } else if (locale === 'mr') {
    return 'नमस्कार! मी प्रथमेश आहे. माझ्या अनुभवाबद्दल, कौशल्याबद्दल, प्रकल्पांबद्दल किंवा इतर कशाबद्दलही विचारा!'
  }
  return "Hi! I'm Prathamesh. Ask me about my experience, skills, projects, or anything else!"
}

// Pre-create chat options for each locale to avoid recreation
const chatOptionsCache: Record<Locale, any> = {
  en: createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      body: (messages: any) => ({
        messages,
        locale: 'en',
      }),
    }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            content: getWelcomeMessage('en'),
          },
        ],
      },
    ],
  }),
  hi: createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      body: (messages: any) => ({
        messages,
        locale: 'hi',
      }),
    }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            content: getWelcomeMessage('hi'),
          },
        ],
      },
    ],
  }),
  mr: createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      body: (messages: any) => ({
        messages,
        locale: 'mr',
      }),
    }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            content: getWelcomeMessage('mr'),
          },
        ],
      },
    ],
  }),
}

export type ChatMessages = InferChatMessages<typeof chatOptionsCache.en>

export const usePortfolioChat = (locale: Locale = 'en') => {
  // Use pre-created options to prevent re-initialization
  const chatOptions = chatOptionsCache[locale]
  return useChat(chatOptions)
}

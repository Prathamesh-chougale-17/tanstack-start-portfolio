import {
  createChatClientOptions,
  fetchServerSentEvents,
  useChat,
} from '@tanstack/ai-react'
import { useMemo } from 'react'

type Locale = 'en' | 'hi' | 'mr'

export type ChatMessages = ReturnType<typeof useChat>['messages']

const getWelcomeMessage = (locale: Locale) => {
  if (locale === 'hi') {
    return 'नमस्ते! मैं प्रथमेश हूँ। मुझसे कुछ भी पूछिए।'
  }
  if (locale === 'mr') {
    return 'नमस्कार! मी प्रथमेश आहे. काहीही विचारा.'
  }
  return "Hi! I'm Prathamesh. Ask me anything!"
}

const createOptions = (locale: Locale) =>
  createChatClientOptions({
    connection: fetchServerSentEvents('/api/portfolio/chat', {
      headers: {
        'x-locale': locale, // ✅ WORKS
      },
    }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            content: getWelcomeMessage(locale),
          },
        ],
      },
    ],
  })

export const usePortfolioChat = (locale: Locale = 'en') => {
  const options = useMemo(() => createOptions(locale), [locale])
  return useChat(options)
}

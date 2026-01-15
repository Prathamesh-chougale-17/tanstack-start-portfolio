import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { orpc } from '@/orpc/client'

type Locale = 'en' | 'hi' | 'mr'

interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: Array<{
    type: 'text'
    content: string
  }>
}

export type ChatMessages = Array<Message>

export const usePortfolioChat = (locale: Locale = 'en') => {
  const [messages, setMessages] = useState<ChatMessages>([])

  const mutation = useMutation({
    mutationFn: (input: {
      messages: Array<{
        role: 'user' | 'assistant' | 'system'
        content: string
      }>
      locale?: string
    }) => orpc.sendChatMessage.call(input),
  })

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        parts: [{ type: 'text', content }],
      }
      setMessages((prev) => [...prev, userMessage])

      try {
        // Build message history for API
        const messageHistory = messages.map((msg) => ({
          role: msg.role,
          content: msg.parts[0]?.content || '',
        }))

        // Add current user message to history
        messageHistory.push({
          role: 'user' as const,
          content,
        })

        // Call backend
        const response = await mutation.mutateAsync({
          messages: messageHistory,
          locale,
        })

        // Add assistant response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          parts: [{ type: 'text', content: response.content }],
        }
        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        console.error('Failed to send message:', error)
        // Optionally remove the user message or add an error message
      }
    },
    [messages, mutation, locale],
  )

  return {
    messages,
    sendMessage,
    isLoading: mutation.isPending,
  }
}

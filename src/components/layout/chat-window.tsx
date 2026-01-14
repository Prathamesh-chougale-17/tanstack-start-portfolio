import { Check, Copy, Loader2, Send, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Streamdown } from 'streamdown'
import { toast } from 'sonner'

import type { ChatMessages } from '@/lib/portfolio-chat-hook'
import { usePortfolioChat } from '@/lib/portfolio-chat-hook'
import { getLocale } from '@/paraglide/runtime'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Props = {
  onClose?: () => void
}

export function ChatWindow({ onClose }: Props) {
  const [input, setInput] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const locale = getLocale()

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, isLoading } = usePortfolioChat(locale)

  // Extract text content from message parts
  const getTextContent = (
    parts: ChatMessages[number]['parts'],
  ): string | null => {
    for (const part of parts) {
      if (part.type === 'text' && part.content) {
        return part.content
      }
    }
    return null
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages.length, isLoading])

  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) {
      return
    }

    sendMessage(input.trim())
    setInput('')
  }

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClear = () => {
    // Note: TanStack AI doesn't have a built-in clear method
    // We need to refresh the page or implement custom message state
    toast.success('Chat cleared - refresh to start new conversation')
  }

  const welcomeMessage =
    locale === 'hi'
      ? 'नमस्ते! मैं प्रथमेश हूँ। मुझसे मेरे अनुभव, कौशल, परियोजनाओं या किसी अन्य चीज़ के बारे में पूछें!'
      : locale === 'mr'
        ? 'नमस्कार! मी प्रथमेश आहे. माझ्या अनुभवाबद्दल, कौशल्याबद्दल, प्रकल्पांबद्दल किंवा इतर कशाबद्दलही विचारा!'
        : "Hi! I'm Prathamesh. Ask me about my experience, skills, projects, or anything else!"

  const name = 'Prathamesh Chougale'
  const typingText =
    locale === 'hi'
      ? 'टाइप कर रहा है...'
      : locale === 'mr'
        ? 'टाइप करत आहे...'
        : 'Typing...'
  const onlineText =
    locale === 'hi' ? 'ऑनलाइन' : locale === 'mr' ? 'ऑनलाइन' : 'Online'
  const placeholderText =
    locale === 'hi'
      ? 'अपना संदेश टाइप करें...'
      : locale === 'mr'
        ? 'तुमचा संदेश टाइप करा...'
        : 'Type your message...'

  return (
    <Card
      className={cn(
        'h-125 w-[calc(100vw-32px)] sm:w-95',
        'flex flex-col rounded-2xl border border-border bg-background/95 py-0 shadow-lg backdrop-blur-xl',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <img
            alt={name}
            className="rounded-full w-8 h-8"
            src="/icons/android-chrome-192x192.png"
          />
          <div>
            <h3 className="font-semibold text-sm">{name}</h3>
            <p className="text-muted-foreground text-xs">
              {isLoading ? typingText : onlineText}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleClear}
            disabled={messages.length === 0}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={chatContainerRef}
      >
        {/* Welcome message */}
        <div className="flex items-start gap-2">
          <img
            alt={name}
            className="rounded-full w-8 h-8 shrink-0"
            src="/profile.webp"
          />
          <div className="flex-1">
            <div className="bg-muted/50 border border-border rounded-lg p-3 text-sm">
              {welcomeMessage}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 mt-1"
              onClick={() => handleCopy(welcomeMessage, 'welcome')}
            >
              {copiedId === 'welcome' ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        {messages.map((message) => {
          const textContent = getTextContent(message.parts)
          const isUser = message.role === 'user'

          return (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-2',
                isUser && 'flex-row-reverse',
              )}
            >
              <img
                alt={isUser ? 'You' : name}
                className="rounded-full w-8 h-8 shrink-0"
                src={isUser ? '/user.png' : '/profile.webp'}
              />
              <div className={cn('flex-1', isUser && 'flex justify-end')}>
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm max-w-[85%]',
                    isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 border border-border',
                  )}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === 'text' && part.content) {
                      return (
                        <div
                          key={index}
                          className="prose dark:prose-invert prose-sm max-w-none"
                        >
                          <Streamdown>{part.content}</Streamdown>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
                {!isUser && textContent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 mt-1"
                    onClick={() => handleCopy(textContent, message.id)}
                  >
                    {copiedId === message.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          )
        })}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <img
              alt={name}
              className="rounded-full w-8 h-8 shrink-0"
              src="/profile.webp"
            />
            <div className="bg-muted/50 border border-border rounded-lg p-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="flex items-end gap-2 border-t p-3"
        onSubmit={handleSubmit}
      >
        <Textarea
          className="flex-1 resize-none rounded-xl border border-border bg-muted/30 focus-visible:ring-1 focus-visible:ring-primary min-h-11 max-h-30"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          placeholder={placeholderText}
          ref={inputRef}
          rows={1}
          value={input}
          disabled={isLoading}
        />
        <Button
          className="rounded-xl"
          disabled={!input.trim() || isLoading}
          size="icon"
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Card>
  )
}

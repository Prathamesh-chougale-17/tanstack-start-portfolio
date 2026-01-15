import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Send, Trash2, X } from 'lucide-react'
import { Streamdown } from 'streamdown'
import { toast } from 'sonner'

import type { ChatMessages } from '@/lib/portfolio-chat-hook'
import { usePortfolioChat } from '@/lib/portfolio-chat-hook'
import { getLocale } from '@/paraglide/runtime'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  onClose?: () => void
}

type Locale = 'en' | 'hi' | 'mr'

const getLocalizedText = (locale: Locale) => {
  const name = 'Prathamesh Chougale'

  let welcome =
    "Hi! I'm Prathamesh. Ask me about my experience, skills, projects, or anything else!"
  let typing = 'Typing...'
  let online = 'Online'
  let placeholder = 'Type your message...'
  let emptyState = "Ask me anything! I'm here to help."
  let copied = 'Copied to clipboard'
  let cleared = 'Chat cleared - refresh to start new conversation'

  if (locale === 'hi') {
    welcome =
      'नमस्ते! मैं प्रथमेश हूँ। मुझसे मेरे अनुभव, कौशल, परियोजनाओं या किसी अन्य चीज़ के बारे में पूछें!'
    typing = 'टाइप कर रहा है...'
    online = 'ऑनलाइन'
    placeholder = 'अपना संदेश टाइप करें...'
    emptyState = 'मुझसे कुछ भी पूछें! मैं आपकी मदद के लिए यहाँ हूँ।'
    copied = 'क्लिपबोर्ड पर कॉपी किया गया'
    cleared = 'चैट साफ़ हो गया - नई बातचीत शुरू करने के लिए रीफ्रेश करें'
  } else if (locale === 'mr') {
    welcome =
      'नमस्कार! मी प्रथमेश आहे. माझ्या अनुभवाबद्दल, कौशल्याबद्दल, प्रकल्पांबद्दल किंवा इतर कशाबद्दलही विचारा!'
    typing = 'टाइप करत आहे...'
    online = 'ऑनलाइन'
    placeholder = 'तुमचा संदेश टाइप करा...'
    emptyState = 'मला काहीही विचारा! मी तुम्हाला मदत करण्यासाठी येथे आहे।'
    copied = 'क्लिपबोर्डवर कॉपी केले'
    cleared = 'चॅट साफ झाली - नवीन संभाषण सुरू करण्यासाठी रीफ्रेश करा'
  }

  return {
    name,
    welcome,
    typing,
    online,
    placeholder,
    emptyState,
    copied,
    cleared,
  }
}

function Messages({
  messages,
  locale,
  isLoading,
  onCopy,
  copiedId,
}: {
  messages: ChatMessages
  locale: Locale
  isLoading: boolean
  onCopy: (content: string, id: string) => void
  copiedId: string | null
}) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const text = getLocalizedText(locale)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  if (!messages.length && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm px-4 text-center">
        {text.emptyState}
      </div>
    )
  }

  return (
    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
      {/* Welcome message */}
      <div className="py-2">
        <div className="flex items-start gap-3">
          <img
            alt={text.name}
            className="rounded-full w-8 h-8 shrink-0"
            src="/profile.webp"
          />
          <div className="flex-1 min-w-0">
            <div className="bg-muted/50 border border-border rounded-lg p-3 text-sm">
              {text.welcome}
            </div>
            <button
              onClick={() => onCopy(text.welcome, 'welcome')}
              className="mt-1 text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Copy"
            >
              {copiedId === 'welcome' ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      {messages.map(({ id, role, parts }) => {
        const isUser = role === 'user'

        return (
          <div key={id} className="py-2">
            <div
              className={cn(
                'flex items-start gap-3',
                isUser && 'flex-row-reverse',
              )}
            >
              <img
                alt={isUser ? 'You' : text.name}
                className="rounded-full w-8 h-8 shrink-0"
                src={isUser ? '/user.png' : '/profile.webp'}
              />
              <div
                className={cn('flex-1 min-w-0', isUser && 'flex justify-end')}
              >
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm max-w-[85%]',
                    isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 border border-border',
                  )}
                >
                  {parts.map((part, index) => {
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
                {!isUser && (
                  <button
                    onClick={() => {
                      const textPart = parts.find((p) => p.type === 'text')
                      if (textPart && textPart.content) {
                        onCopy(textPart.content, id)
                      }
                    }}
                    className="mt-1 text-muted-foreground hover:text-foreground transition-colors p-1"
                    title="Copy"
                  >
                    {copiedId === id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function ChatWindow({ onClose }: Props) {
  const locale = getLocale() as Locale
  const text = getLocalizedText(locale)

  const { messages, sendMessage, isLoading } = usePortfolioChat(locale)
  const [input, setInput] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    sendMessage(input.trim())
    setInput('')
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
  }

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedId(id)
    toast.success(text.copied)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClear = () => {
    toast.success(text.cleared)
  }

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
            alt={text.name}
            className="rounded-full w-8 h-8"
            src="/icons/android-chrome-192x192.png"
          />
          <div>
            <h3 className="font-semibold text-sm">{text.name}</h3>
            <p className="text-muted-foreground text-xs">
              {isLoading ? text.typing : text.online}
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
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <Messages
        messages={messages}
        locale={locale}
        isLoading={isLoading}
        onCopy={handleCopy}
        copiedId={copiedId}
      />

      {/* Input */}
      <form className="border-t p-3" onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={text.placeholder}
            className="w-full rounded-lg border border-border bg-muted/30 pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none overflow-hidden"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
            disabled={isLoading}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = Math.min(target.scrollHeight, 120) + 'px'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:text-primary/80 disabled:text-muted-foreground transition-colors focus:outline-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </Card>
  )
}

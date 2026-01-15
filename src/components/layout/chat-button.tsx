import { ChatCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import { ChatWindow } from './chat-window'
import { Button } from '@/components/ui/button'

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {isOpen ? (
        <ChatWindow onClose={() => setIsOpen(false)} />
      ) : (
        <Button
          aria-label="Open chat"
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          onClick={() => setIsOpen(true)}
          size="icon"
        >
          <ChatCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

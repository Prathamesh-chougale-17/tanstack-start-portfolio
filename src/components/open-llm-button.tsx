'use client'

import { Bot } from 'lucide-react'

interface OpenLLMButtonProps {
  markdownUrl: string
  title: string
}

export function OpenLLMButton({ markdownUrl, title }: OpenLLMButtonProps) {
  const handleOpenInClaude = () => {
    const fullUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${markdownUrl}`
      : markdownUrl

    // Open in Claude Code or default to copying the URL
    const claudeUrl = `https://claude.ai?url=${encodeURIComponent(fullUrl)}`
    window.open(claudeUrl, '_blank')
  }

  return (
    <button
      onClick={handleOpenInClaude}
      title={`Open "${title}" with Claude`}
      className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
    >
      <Bot className="w-4 h-4" />
      Open with AI
    </button>
  )
}

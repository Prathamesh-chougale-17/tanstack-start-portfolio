'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface LLMCopyButtonProps {
  markdownUrl: string
}

export function LLMCopyButton({ markdownUrl }: LLMCopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy markdown URL for LLM"
      className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy Markdown
        </>
      )}
    </button>
  )
}

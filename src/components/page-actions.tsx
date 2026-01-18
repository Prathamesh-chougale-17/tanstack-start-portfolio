'use client'
import { useMemo, useState } from 'react'
import {
  ArrowDownIcon,
  CheckIcon,
  CopyIcon,
  LinkIcon,
  MailboxIcon,
} from '@phosphor-icons/react'
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button'
import { cva } from 'class-variance-authority'
import { buttonVariants } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const cache = new Map<string, string>()

export function LLMCopyButton({
  /**
   * A URL to fetch the raw Markdown/MDX content of page
   */
  markdownUrl,
}: {
  markdownUrl: string
}) {
  const [isLoading, setLoading] = useState(false)
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl)
    if (cached) return navigator.clipboard.writeText(cached)

    setLoading(true)

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': fetch(markdownUrl).then(async (res) => {
            const content = await res.text()
            cache.set(markdownUrl, content)

            return content
          }),
        }),
      ])
    } finally {
      setLoading(false)
    }
  })

  return (
    <Button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          variant: 'secondary',
          size: 'sm',
          className: 'gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground',
        }),
      )}
      onClick={onClick}
    >
      {checked ? <CheckIcon /> : <CopyIcon />}
      Copy Markdown
    </Button>
  )
}

const optionVariants = cva(
  'text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4',
)

export function ViewOptions({
  markdownUrl,
}: {
  /**
   * A URL to the raw Markdown/MDX content of page
   */
  markdownUrl: string
}) {
  const items = useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== 'undefined'
        ? new URL(markdownUrl, window.location.origin)
        : 'loading'
    const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`

    return [
      {
        title: 'Open in Scira AI',
        href: `https://scira.ai/?${new URLSearchParams({
          q,
        })}`,
        icon: '✨',
      },
      {
        title: 'Open in ChatGPT',
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: 'search',
          q,
        })}`,
        icon: '🤖',
      },
      {
        title: 'Open in Claude',
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: '🧠',
      },
    ]
  }, [markdownUrl])

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            size: 'sm',
            className: 'gap-2',
            variant: 'secondary',
          }),
        )}
      >
        Open
        <ArrowDownIcon className="size-3.5 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className={cn(optionVariants())}
          >
            {item.icon}
            {item.title}
            <LinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  )
}

import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils'
import { useState } from 'react'

type MarkdownContentProps = {
  content: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      className="rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:text-white"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article
      className={cn(
        'prose prose-zinc dark:prose-invert max-w-none',
        'prose-headings:font-semibold prose-headings:tracking-tight',
        'prose-h1:text-5xl prose-h1:mt-12',
        'prose-h2:text-4xl prose-h2:mt-10 prose-h2:border-b prose-h2:border-muted/40 prose-h2:pb-2',
        'prose-h3:text-3xl prose-h3:mt-8',
        'prose-h4:text-2xl',
        'prose-p:text-base prose-p:leading-7 prose-p:my-5',
        'prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-foreground',
        'prose-ul:my-6 prose-ol:my-6 prose-li:my-2',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary',
        'prose-blockquote:bg-muted/30 prose-blockquote:pl-5 prose-blockquote:py-3 prose-blockquote:rounded-r-lg',
        'prose-img:rounded-xl prose-img:shadow-md prose-img:my-8',
        'prose-code:rounded-md prose-code:bg-muted/60 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-medium',
        'prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-8',
      )}
    >
      <Markdown
        components={{
          h1({ children, ...props }) {
            return (
              <h1
                id={slugify(String(children))}
                className="scroll-mt-28"
                {...props}
              >
                {children}
              </h1>
            )
          },

          h2({ children, ...props }) {
            return (
              <h2
                id={slugify(String(children))}
                className="scroll-mt-28"
                {...props}
              >
                {children}
              </h2>
            )
          },

          h3({ children, ...props }) {
            return (
              <h3
                id={slugify(String(children))}
                className="scroll-mt-28"
                {...props}
              >
                {children}
              </h3>
            )
          },

          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match
            const code = String(children).replace(/\n$/, '')

            if (isInline) {
              return (
                <code className="rounded-md bg-muted/60 px-2 py-1 text-sm">
                  {children}
                </code>
              )
            }

            return (
              <div className="relative overflow-hidden rounded-xl border border-muted/40 shadow-lg">
                <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-xs text-zinc-400">
                  <span className="uppercase tracking-wide">
                    {match?.[1] ?? 'code'}
                  </span>
                  <CopyButton value={code} />
                </div>

                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match?.[1]}
                  PreTag="div"
                  className="!m-0 !rounded-none !bg-zinc-900"
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            )
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  )
}

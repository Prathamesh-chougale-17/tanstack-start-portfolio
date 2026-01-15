import { useEffect, useState } from 'react'
import type { Heading } from '@/types/blog'
import { cn } from '@/lib/utils'
import * as m from '@/paraglide/messages'

type TableOfContentsProps = {
  headings: Array<Heading>
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-2">
      <h2 className="mb-4 font-semibold text-sm uppercase tracking-wide text-muted-foreground">
        {m.blogsPage_tableOfContents()}
      </h2>
      <ul className="space-y-2 border-l border-border">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              className={cn(
                'block border-l-2 py-1 pl-3 text-sm transition-colors hover:text-foreground',
                activeId === heading.id
                  ? 'border-primary font-medium text-foreground'
                  : 'border-transparent text-muted-foreground'
              )}
              href={`#${heading.id}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

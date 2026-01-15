import * as Base from 'fumadocs-core/toc'
import { useRef } from 'react'

type SerializableTOCItem = {
  title: string
  url: string
  depth: number
}

type BlogTOCProps = {
  items: Array<SerializableTOCItem>
}

export function BlogTOC({ items }: BlogTOCProps) {
  const viewRef = useRef<HTMLDivElement>(null)

  // Convert serializable items back to Fumadocs TOC format
  const tocItems: Array<Base.TOCItemType> = items.map((item) => ({
    title: item.title,
    url: item.url,
    depth: item.depth,
  }))

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        <div ref={viewRef} className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            On This Page
          </div>
          <Base.AnchorProvider toc={tocItems}>
            <div className="space-y-2 border-l">
              {items.map((item) => (
                <Base.TOCItem
                  className="block border-l-2 border-transparent px-4 py-1 text-sm text-muted-foreground transition-all hover:text-foreground data-[active=true]:border-primary data-[active=true]:text-foreground"
                  href={item.url}
                  key={item.url}
                >
                  {item.title}
                </Base.TOCItem>
              ))}
            </div>
          </Base.AnchorProvider>
        </div>
      </div>
    </div>
  )
}

import * as Base from 'fumadocs-core/toc'
import { useRef } from 'react'

type BlogTOCProps = {
  items: Base.TOCItemType[]
}

export function BlogTOC({ items }: BlogTOCProps) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24">
        <div ref={viewRef} className="space-y-4">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            On This Page
          </div>
          <Base.AnchorProvider toc={items}>
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

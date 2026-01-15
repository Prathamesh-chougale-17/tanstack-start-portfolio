# Fumadocs Core (the core library of Fumadocs): TOC

URL: /docs/headless/components/toc
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/components/toc.mdx

Table of Contents

<FeedbackBlock id="a06dd629e600527f" body="A Table of Contents with active anchor observer and auto scroll.">
  A Table of Contents with active anchor observer and auto scroll.
</FeedbackBlock>

## Usage

```tsx
import * as Base from 'fumadocs-core/toc'

return (
  <Base.AnchorProvider>
    <Base.ScrollProvider>
      <Base.TOCItem />
      <Base.TOCItem />
    </Base.ScrollProvider>
  </Base.AnchorProvider>
)
```

### Anchor Provider

<FeedbackBlock id="d1d00a4ca754e60f" body="Watches for the active anchor using the Intersection Observer API.">
  Watches for the active anchor using the Intersection Observer API.
</FeedbackBlock>

<TypeTable
type={{
  "name": "AnchorProviderProps",
  "description": "",
  "entries": [
    {
      "name": "toc",
      "description": "",
      "tags": [],
      "type": "TOC.TableOfContents",
      "simplifiedType": "TableOfContents",
      "required": true,
      "deprecated": false
    },
    {
      "name": "single",
      "description": "Only accept one active item at most",
      "tags": [
        {
          "name": "defaultValue",
          "text": "false"
        }
      ],
      "type": "boolean | undefined",
      "simplifiedType": "boolean",
      "required": false,
      "deprecated": false
    },
    {
      "name": "children",
      "description": "",
      "tags": [],
      "type": "ReactNode",
      "simplifiedType": "ReactNode",
      "required": false,
      "deprecated": false
    }
  ]
}}
/>

### Scroll Provider

<FeedbackBlock id="ce59d4149cdd5e39" body="Scrolls the scroll container to the active anchor.">
  Scrolls the scroll container to the active anchor.
</FeedbackBlock>

<TypeTable
type={{
  "name": "ScrollProviderProps",
  "description": "",
  "entries": [
    {
      "name": "containerRef",
      "description": "Scroll into the view of container when active",
      "tags": [],
      "type": "RefObject<HTMLElement | null>",
      "simplifiedType": "object",
      "required": true,
      "deprecated": false
    },
    {
      "name": "children",
      "description": "",
      "tags": [],
      "type": "ReactNode",
      "simplifiedType": "ReactNode",
      "required": false,
      "deprecated": false
    }
  ]
}}
/>

### TOC Item

<FeedbackBlock id="48561c0b5b3ae44d" body="An anchor item for jumping to the target anchor.">
  An anchor item for jumping to the target anchor.
</FeedbackBlock>

| Data Attribute | Values        | Description          |
| -------------- | ------------- | -------------------- |
| `data-active`  | `true, false` | Is the anchor active |

## Example

```tsx
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  type TOCItemType,
} from 'fumadocs-core/toc'
import { type ReactNode, useRef } from 'react'

export function Page({
  items,
  children,
}: {
  items: TOCItemType[]
  children: ReactNode
}) {
  const viewRef = useRef<HTMLDivElement>(null)

  return (
    <AnchorProvider toc={items}>
      <div ref={viewRef} className="overflow-auto">
        <ScrollProvider containerRef={viewRef}>
          {items.map((item) => (
            <TOCItem key={item.url} href={item.url}>
              {item.title}
            </TOCItem>
          ))}
        </ScrollProvider>
      </div>
      {children}
    </AnchorProvider>
  )
}
```

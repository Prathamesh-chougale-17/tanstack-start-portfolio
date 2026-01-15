# Fumadocs Core (the core library of Fumadocs): Link

URL: /docs/headless/components/link
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/headless/components/link.mdx

A Link component that handles external links

<FeedbackBlock
id="823dd1e388262f3f"
body="A component that wraps the Link component of your React framework (e.g. next/link) and automatically handles external links in the document.~
When an external URL is detected, it uses <a> instead of the Link Component."

> A component that wraps the Link component of your React framework (e.g. `next/link`) and automatically handles external links in the document.\~
> When an external URL is detected, it uses `<a>` instead of the Link Component.
> </FeedbackBlock>

<FeedbackBlock id="a8075401b10f381f" body="The rel property is automatically generated.">
  The `rel` property is automatically generated.
</FeedbackBlock>

## Usage

<FeedbackBlock id="665e5fce8544ffde" body="Usage is the same as using <a>.">
  Usage is the same as using `<a>`.
</FeedbackBlock>

```mdx
import Link from 'fumadocs-core/link'

<Link href="/docs/components">Click Me</Link>
```

### External

<FeedbackBlock id="fb5a9f3c895d7abe" body="You can force a URL to be external by passing an external prop.">
  You can force a URL to be external by passing an `external` prop.
</FeedbackBlock>

### Dynamic hrefs

<FeedbackBlock id="fa311a17fa94288b" body="You can enable dynamic hrefs by importing dynamic-link.">
  You can enable dynamic hrefs by importing `dynamic-link`.
</FeedbackBlock>

```mdx
import { DynamicLink } from 'fumadocs-core/dynamic-link'

<DynamicLink href="/[lang]/components">Click Me</DynamicLink>
```

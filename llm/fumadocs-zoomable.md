# Fumadocs UI (the default theme of Fumadocs): Zoomable Image

URL: /docs/ui/components/image-zoom
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/ui/components/image-zoom.mdx

Allow zoom-in images in your documentation

<Installation name="image-zoom" />

## Usage

<FeedbackBlock id="5dbfd0f1dad51c46" body="Replace img with ImageZoom in your MDX components.">
  Replace `img` with `ImageZoom` in your MDX components.
</FeedbackBlock>

```tsx title="mdx-components.tsx"
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import defaultComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    // [!code ++]
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  }
}
```

<FeedbackBlock id="3ff0b4f758cfc061" body="Now image zoom will be automatically enabled on all images.">
  Now image zoom will be automatically enabled on all images.
</FeedbackBlock>

```mdx
![Test](/banner.png)
```

### Image Optimization

<FeedbackBlock id="b84b8a96dd91134c" body="On Next.js, a default sizes property will be defined for <Image /> component if not specified.">
  On Next.js, a default [`sizes` property](https://nextjs.org/docs/app/api-reference/components/image#sizes) will be defined for `<Image />` component if not specified.
</FeedbackBlock>

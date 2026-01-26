import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins'

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxMermaid],
  },
})
export const docs = defineDocs({
  dir: 'content/blogs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
})

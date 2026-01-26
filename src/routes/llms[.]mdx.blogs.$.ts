import { createFileRoute, notFound } from '@tanstack/react-router'
import { source } from '@/lib/source'

export const Route = createFileRoute('/llms.mdx/blogs/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugs = params._splat?.split('/') ?? []
        const page = source.getPage(slugs)
        if (!page) throw notFound()

        const processed = await page.data.getText('processed')
        const markdown = `# ${page.data.title}\n\n${processed}`

        return new Response(markdown, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        })
      },
    },
  },
})

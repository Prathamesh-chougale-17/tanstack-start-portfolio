import { createFileRoute } from '@tanstack/react-router'
import { source } from '@/lib/source'
import { getLLMText } from '@/lib/get-llm-text'

export const Route = createFileRoute('/llms.mdx/blogs/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const slugs = params._splat?.split('/') ?? []
          const page = source.getPage(slugs)

          if (!page) {
            return new Response('Blog post not found', { status: 404 })
          }

          const content = await getLLMText(page)

          return new Response(content, {
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
            },
          })
        } catch (error) {
          console.error('Error serving LLM markdown:', error)
          return new Response('Error retrieving content', { status: 500 })
        }
      },
    },
  },
})

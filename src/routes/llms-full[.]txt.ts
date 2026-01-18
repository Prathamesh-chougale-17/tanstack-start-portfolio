import { createFileRoute } from '@tanstack/react-router'
import { source } from '@/lib/source'
import { getLLMText } from '@/lib/get-llm-text'

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const pages = source.getPages()
          const scan = pages.map(getLLMText)
          const scanned = await Promise.all(scan)

          return new Response(scanned.join('\n\n---\n\n'), {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'public, max-age=3600',
            },
          })
        } catch (error) {
          console.error('Error generating llms-full.txt:', error)
          return new Response('Error generating content', { status: 500 })
        }
      },
    },
  },
})

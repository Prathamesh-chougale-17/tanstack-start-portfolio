import { createFileRoute } from '@tanstack/react-router'
import { createImageOptions, generateImage } from '@tanstack/ai'
import { geminiImage } from '@tanstack/ai-gemini'

export const Route = createFileRoute('/demo/api/ai/image')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json()
        const { prompt, numberOfImages = 1, size = '1024x1024' } = body

        if (!prompt || prompt.trim().length === 0) {
          return new Response(
            JSON.stringify({
              error: 'Prompt is required',
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        if (!process.env.GEMINI_API_KEY) {
          return new Response(
            JSON.stringify({
              error: 'GEMINI_API_KEY is not configured',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        try {
          const options = createImageOptions({
            adapter: geminiImage('gemini-2.0-flash-preview-image-generation'),
            prompt: prompt,
          })

          const result = await generateImage({
            ...options,
            prompt,
            numberOfImages,
            size,
          })

          return new Response(
            JSON.stringify({
              images: result.images,
              model: 'gpt-image-1',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        } catch (error: any) {
          return new Response(
            JSON.stringify({
              error: error.message || 'An error occurred',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      },
    },
  },
})

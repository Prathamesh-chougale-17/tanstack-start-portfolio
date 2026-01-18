import { source } from '@/lib/source'
import type { InferPageType } from 'fumadocs-core/source'

/**
 * Convert a page to LLM-friendly markdown format
 * Includes title, URL, and processed markdown content
 */
export async function getLLMText(
  page: InferPageType<typeof source>,
): Promise<string> {
  try {
    const processed = await page.data.getText('processed')

    return `# ${page.data.title} (${page.url})

${page.data.description ? `> ${page.data.description}\n\n` : ''}${processed}`
  } catch (error) {
    console.error(`Error processing page ${page.url}:`, error)
    // Fallback to raw text if processed fails
    const raw = await page.data.getText('raw')
    return `# ${page.data.title} (${page.url})

${page.data.description ? `> ${page.data.description}\n\n` : ''}${raw}`
  }
}

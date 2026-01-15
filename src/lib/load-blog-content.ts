import type { Blog, BlogWithContent, Heading } from '@/types/blog'

export async function loadBlogContent(
  blog: Blog,
  locale: string
): Promise<BlogWithContent> {
  try {
    const response = await fetch(`/blogs/${locale}/${blog.markdownPath}`)
    if (!response.ok) {
      throw new Error(`Failed to load markdown: ${response.statusText}`)
    }
    const content = await response.text()

    return {
      ...blog,
      content,
    }
  } catch (error) {
    console.error('Error loading blog content:', error)
    return {
      ...blog,
      content: '# Error loading content\n\nPlease try again later.',
    }
  }
}

export function extractHeadings(markdown: string): Array<Heading> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<Heading> = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ id, text, level })
  }

  return headings
}

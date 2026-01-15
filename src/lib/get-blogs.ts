import type { Blog } from '@/types/blog'
import * as m from '@/paraglide/messages'

export function getAllBlogs(): Array<Blog> {
  const blogs: Array<Blog> = []
  let index = 0

  // Load blogs until we hit an undefined title key
  while ((m as any)[`blogs_${index}_title`]) {
    const blog: Blog = {
      title: (m as any)[`blogs_${index}_title`](),
      slug: (m as any)[`blogs_${index}_slug`](),
      excerpt: (m as any)[`blogs_${index}_excerpt`](),
      date: (m as any)[`blogs_${index}_date`](),
      author: (m as any)[`blogs_${index}_author`](),
      readingTime: (m as any)[`blogs_${index}_readingTime`](),
      image: (m as any)[`blogs_${index}_image`]
        ? (m as any)[`blogs_${index}_image`]()
        : '/placeholder.svg',
      markdownPath: (m as any)[`blogs_${index}_markdownPath`](),
      featured: (m as any)[`blogs_${index}_featured`]
        ? (m as any)[`blogs_${index}_featured`]() === 'true'
        : false,
      tags: [],
    }

    // Load tags
    let tagIndex = 0
    while ((m as any)[`blogs_${index}_tags_${tagIndex}`]) {
      blog.tags.push((m as any)[`blogs_${index}_tags_${tagIndex}`]())
      tagIndex++
    }

    blogs.push(blog)
    index++
  }

  // Sort by date (newest first)
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getBlogBySlug(slug: string): Blog | undefined {
  const allBlogs = getAllBlogs()
  return allBlogs.find((blog) => blog.slug === slug)
}

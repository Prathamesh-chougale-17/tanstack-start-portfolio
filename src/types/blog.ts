export type Blog = {
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  readingTime: string
  image: string
  tags: Array<string>
  featured: boolean
  markdownPath: string
}

export type BlogWithContent = Blog & {
  content: string
}

export type Heading = {
  id: string
  text: string
  level: number
}

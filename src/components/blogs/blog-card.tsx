import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarBlank, Clock } from '@phosphor-icons/react'
import type { Blog } from '@/types/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import * as m from '@/paraglide/messages'

type BlogCardProps = {
  blog: Blog
  index: number
}

export function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <Card
      className="animate-fade-up flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 w-full">
        <img
          alt={blog.title}
          className="h-full w-full object-cover"
          loading="lazy"
          src={blog.image}
        />
      </div>

      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-1">
          {blog.tags.slice(0, 2).map((tag, tagIndex) => (
            <Badge className="text-xs" key={tagIndex} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {blog.excerpt}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex items-center gap-3 text-muted-foreground text-xs">
          <div className="flex items-center gap-1">
            <CalendarBlank className="h-3 w-3" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{blog.readingTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link className="w-full" to="/blogs/$slug" params={{ slug: blog.slug }}>
          <Button className="group w-full" size="sm" variant="outline">
            {m.blogsPage_readMore()}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

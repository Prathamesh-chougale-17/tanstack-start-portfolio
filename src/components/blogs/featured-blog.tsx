import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarBlank, Clock } from '@phosphor-icons/react'
import type { Blog } from '@/types/blog'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as m from '@/paraglide/messages'

type FeaturedBlogProps = {
  blog: Blog
}

export function FeaturedBlog({ blog }: FeaturedBlogProps) {
  return (
    <Card className="mb-12 overflow-hidden border-2 border-primary/20">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-64 w-full md:h-auto">
          <img
            alt={blog.title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={blog.image}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-6">
          <CardHeader className="p-0">
            <div className="mb-3 flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-3xl">{blog.title}</CardTitle>
            <CardDescription className="mt-3 text-base">
              {blog.excerpt}
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-4 p-0">
            <div className="mb-4 flex items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <CalendarBlank className="h-4 w-4" />
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readingTime}</span>
              </div>
            </div>

            <Link to="/blogs/$slug" params={{ slug: blog.slug }}>
              <Button className="group" size="lg">
                {m.blogsPage_readMore()}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}

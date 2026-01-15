import { Calendar, Clock } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

type BlogHeroProps = {
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  image?: string
}

export function BlogHero({
  title,
  description,
  date,
  readTime,
  tags,
  image,
}: BlogHeroProps) {
  return (
    <div className="mb-8 space-y-6">
      {image && (
        <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-96">
          <img alt={title} className="h-full w-full object-cover" src={image} />
        </div>
      )}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Badge className="text-xs" key={idx} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
      <div className="border-t" />
    </div>
  )
}

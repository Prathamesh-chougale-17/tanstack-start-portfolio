import { CalendarIcon, ClockIcon, UserIcon } from '@phosphor-icons/react'

type BlogMetaProps = {
  author?: string
  date: string
  readTime: string
}

export function BlogMeta({ author, date, readTime }: BlogMetaProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      {author && (
        <div className="flex items-center gap-1">
          <UserIcon className="h-4 w-4" />
          <span>{author}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <CalendarIcon className="h-4 w-4" />
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon className="h-4 w-4" />
        <span>{readTime}</span>
      </div>
    </div>
  )
}

import { ExternalLink, Github } from 'lucide-react'
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
import type { Project } from '@/types/home'

export function ProjectCard({
  title,
  description,
  tags,
  githubLink,
  liveLink,
}: Project) {
  return (
    <Card className="after:-z-10 flex h-full cursor-pointer flex-col border-muted-foreground/10 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-br after:from-blue-400/5 after:to-purple-600/5 after:opacity-0 after:transition-opacity after:duration-300 hover:scale-[1.02] hover:border-blue-400/50 hover:shadow-blue-400/20 hover:shadow-xl hover:after:opacity-100 dark:bg-gradient-to-br dark:from-background dark:to-background/80 dark:hover:shadow-blue-500/30">
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="bg-gradient-to-r from-foreground to-foreground/90 bg-clip-text text-transparent text-xl">
          {title}
        </CardTitle>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              className="bg-secondary/80 transition-colors hover:bg-secondary"
              key={index}
              variant="secondary"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 grow pt-2">
        <CardDescription className="text-base text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="relative z-10 flex gap-2">
        {githubLink && (
          <Button
            asChild
            className="border-primary/50 transition-all hover:bg-primary/10 hover:text-primary"
            size="sm"
            variant="outline"
          >
            <a
              className="flex items-center gap-1"
              href={githubLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          </Button>
        )}
        {liveLink && (
          <Button
            asChild
            className="bg-primary/90 shadow-sm transition-colors hover:bg-primary hover:shadow-blue-400/30 hover:shadow-md"
            size="sm"
            variant="default"
          >
            <a
              className="flex items-center gap-1"
              href={liveLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" /> Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

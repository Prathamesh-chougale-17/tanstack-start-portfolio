import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types/project'
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

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Card
      className="animate-fade-up cursor-pointer overflow-hidden pt-0 transition-all duration-300 hover:shadow-lg"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-50 w-full">
        <img
          alt={project.title}
          className="rounded-lg object-cover w-full h-48"
          loading="lazy"
          src={project.image}
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag, tagIndex) => (
            <Badge className="text-xs" key={tagIndex} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {project.githubLink && (
          <Button size="sm" variant="outline">
            <a
              className="flex items-center gap-2"
              href={project.githubLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
        {project.liveLink && (
          <Button size="sm" variant="ghost">
            <a
              className="flex items-center gap-2"
              href={project.liveLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

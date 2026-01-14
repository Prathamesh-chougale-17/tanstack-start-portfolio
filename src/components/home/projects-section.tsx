import { ProjectCard } from '@/components/home/project-card'
import type { Project } from '@/types/home'

export function ProjectsSection({
  projects,
  title,
}: {
  projects: Project[]
  title: string
}) {
  return (
    <section className="py-12">
      <h2 className="mb-12 text-center font-bold text-3xl">{title}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            description={project.description}
            githubLink={project.githubLink}
            key={index}
            liveLink={project.liveLink}
            tags={project.tags}
            title={project.title}
          />
        ))}
      </div>
    </section>
  )
}

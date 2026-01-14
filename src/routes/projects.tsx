import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { Project } from '@/types/project'
import { ProjectFilters } from '@/components/projects/project-filters'
import { ProjectList } from '@/components/projects/project-list'
import { getAllProjects } from '@/lib/get-projects'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  const allProjects = getAllProjects()
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(allProjects)

  // Update filtered projects when locale changes
  useEffect(() => {
    setFilteredProjects(allProjects)
  }, [allProjects])

  return (
    <section className="py-12">
      <div className="mb-8">
        <h1 className="font-bold text-4xl tracking-tight">My Projects</h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Explore my portfolio of projects that combine creativity, engineering,
          and real-world problem solving using React, Next.js, and AI
          technologies.
        </p>
      </div>

      <ProjectFilters
        onFilteredProjectsChange={setFilteredProjects}
        projects={allProjects}
      />

      <ProjectList projects={filteredProjects} />
    </section>
  )
}

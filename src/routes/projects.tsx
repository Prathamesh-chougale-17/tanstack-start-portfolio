import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { Project } from '@/types/project'
import { ProjectFilters } from '@/components/projects/project-filters'
import { ProjectList } from '@/components/projects/project-list'
import { getAllProjects } from '@/lib/get-projects'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
  head: () => ({
    meta: [
      {
        title: 'Projects | Prathamesh Chougale - Portfolio',
      },
      {
        name: 'description',
        content:
          'Explore my portfolio of innovative projects: Oorja AI (wellness platform), Carbon Track (blockchain supply chain), and Bounty Quest (decentralized rewards). Built with React, Next.js, MongoDB, and AI technologies.',
      },
      {
        name: 'keywords',
        content:
          'React Projects, Next.js Portfolio, AI Projects, Blockchain Projects, Oorja AI, Carbon Track, Bounty Quest, Full Stack Projects, TypeScript Projects, MongoDB Projects',
      },
      // Open Graph tags
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Projects - Prathamesh Chougale Portfolio',
      },
      {
        property: 'og:description',
        content:
          'Portfolio showcasing AI-powered wellness platforms, blockchain solutions, and decentralized applications built with modern web technologies.',
      },
      {
        property: 'og:image',
        content: '/profile.webp',
      },
      {
        property: 'og:url',
        content: 'https://prathamesh-chougale.vercel.app/projects',
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Projects - Prathamesh Chougale',
      },
      {
        name: 'twitter:description',
        content:
          'Innovative projects combining React, AI, and blockchain technologies.',
      },
      {
        name: 'twitter:image',
        content: '/profile.webp',
      },
      {
        name: 'twitter:url',
        content: 'https://prathamesh-chougale.vercel.app/projects',
      },
    ],
  }),
})

function ProjectsPage() {
  const allProjects = getAllProjects()
  const [filteredProjects, setFilteredProjects] =
    useState<Array<Project>>(allProjects)

  // Update filtered projects when locale changes
  useEffect(() => {
    setFilteredProjects(allProjects)
  }, [allProjects])

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 py-12">
        <div>
          <h1 className="font-bold text-4xl tracking-tight">My Projects</h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Explore my portfolio of projects that combine creativity,
            engineering, and real-world problem solving using React, Next.js,
            and AI technologies.
          </p>
        </div>

        <ProjectFilters
          onFilteredProjectsChange={setFilteredProjects}
          projects={allProjects}
        />

        <ProjectList projects={filteredProjects} />
      </div>
    </div>
  )
}

import type { Project } from '@/types/project'
import * as m from '@/paraglide/messages'

export function getAllProjects(): Array<Project> {
  const projects: Array<Project> = []
  let index = 0

  // Load projects until we hit an undefined title key
  while ((m as any)[`projects_${index}_title`]) {
    const titleFunc = (m as any)[`projects_${index}_title`]

    const project: Project = {
      title: titleFunc(),
      description: (m as any)[`projects_${index}_description`](),
      image: (m as any)[`projects_${index}_image`]
        ? (m as any)[`projects_${index}_image`]()
        : '/placeholder.svg',
      tags: [],
      githubLink: (m as any)[`projects_${index}_githubLink`]
        ? (m as any)[`projects_${index}_githubLink`]()
        : undefined,
      liveLink: (m as any)[`projects_${index}_liveLink`]
        ? (m as any)[`projects_${index}_liveLink`]()
        : undefined,
      featured: (m as any)[`projects_${index}_featured`]
        ? (m as any)[`projects_${index}_featured`]() === 'true'
        : false,
    }

    // Load tags
    let tagIndex = 0
    while ((m as any)[`projects_${index}_tags_${tagIndex}`]) {
      const tagFunc = (m as any)[`projects_${index}_tags_${tagIndex}`]
      project.tags.push(tagFunc())
      tagIndex++
    }

    projects.push(project)
    index++
  }

  return projects
}

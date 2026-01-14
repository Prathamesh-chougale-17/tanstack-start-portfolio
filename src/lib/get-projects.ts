import * as m from '@/paraglide/messages'
import type { Project } from '@/types/project'

export function getAllProjects(): Project[] {
  const projects: Project[] = []
  let index = 0

  // Keep trying to load projects until we hit an undefined key
  while (true) {
    try {
      const titleFunc = (m as any)[`projects_${index}_title`]
      if (!titleFunc) break

      const project: Project = {
        title: titleFunc(),
        description: (m as any)[`projects_${index}_description`](),
        image: (m as any)[`projects_${index}_image`]
          ? (m as any)[`projects_${index}_image`]()
          : '/placeholder.svg',
        tags: [],
        githubLink: (m as any)[`projects_${index}_githublink1`]
          ? (m as any)[`projects_${index}_githublink1`]()
          : undefined,
        liveLink: (m as any)[`projects_${index}_livelink1`]
          ? (m as any)[`projects_${index}_livelink1`]()
          : undefined,
        featured: (m as any)[`projects_${index}_featured1`]
          ? (m as any)[`projects_${index}_featured1`]() === 'true'
          : false,
      }

      // Load tags
      let tagIndex = 0
      while (true) {
        const tagFunc = (m as any)[`projects_${index}_tags_${tagIndex}`]
        if (!tagFunc) break
        project.tags.push(tagFunc())
        tagIndex++
      }

      projects.push(project)
      index++
    } catch (e) {
      break
    }
  }

  return projects
}

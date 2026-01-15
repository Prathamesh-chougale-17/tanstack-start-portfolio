import { MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'
import type { Project } from '@/types/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ProjectFiltersProps = {
  projects: Array<Project>
  onFilteredProjectsChange: (filteredProjects: Array<Project>) => void
}

export function ProjectFilters({
  projects,
  onFilteredProjectsChange,
}: ProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Get all tags directly (no useMemo)
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags)),
  ).sort()

  // Call filter each time something changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    handleFilterAfterChange(value, selectedTag)
  }

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag || 'all')
    handleFilterAfterChange(searchQuery, tag || 'all')
  }

  const handleFilterAfterChange = (query: string, tag: string) => {
    const filtered = projects.filter((project) => {
      const search = query.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tags.some((tagItem) => tagItem.toLowerCase().includes(search))

      const matchesTag = tag === 'all' || project.tags.includes(tag)

      return matchesSearch && matchesTag
    })

    onFilteredProjectsChange(filtered)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTag('all')
    onFilteredProjectsChange(projects)
  }

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex-1">
        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlass className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
          <Input
            className="w-full pl-10"
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search projects by title, description, or tags..."
            value={searchQuery}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        {/* Tag Filter */}
        <div className="flex items-center gap-2">
          <Select onValueChange={handleTagChange} value={selectedTag}>
            <SelectTrigger className="w-full sm:w-45">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        <Button onClick={clearFilters} size="sm" variant="outline">
          Clear filters
        </Button>
      </div>
    </div>
  )
}

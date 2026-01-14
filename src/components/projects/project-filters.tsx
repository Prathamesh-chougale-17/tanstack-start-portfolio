import { Search } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Project } from '@/types/project'

type ProjectFiltersProps = {
  projects: Project[]
  onFilteredProjectsChange: (filteredProjects: Project[]) => void
}

export function ProjectFilters({
  projects,
  onFilteredProjectsChange,
}: ProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Get all tags directly (no useMemo)
  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags)),
  ).sort()

  // Call filter each time something changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    handleFilterAfterChange(value, selectedTag, showFeaturedOnly)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    handleFilterAfterChange(searchQuery, tag, showFeaturedOnly)
  }

  const handleFeaturedChange = (checked: boolean) => {
    setShowFeaturedOnly(checked)
    handleFilterAfterChange(searchQuery, selectedTag, checked)
  }

  const handleFilterAfterChange = (
    query: string,
    tag: string,
    featured: boolean,
  ) => {
    const filtered = projects.filter((project) => {
      const search = query.toLowerCase()
      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tags.some((tagItem) => tagItem.toLowerCase().includes(search))

      const matchesTag = tag === 'all' || project.tags.includes(tag)
      const matchesFeatured = !featured || project.featured

      return matchesSearch && matchesTag && matchesFeatured
    })

    onFilteredProjectsChange(filtered)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTag('all')
    setShowFeaturedOnly(false)
    onFilteredProjectsChange(projects)
  }

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex-1">
        {/* Search Input */}
        <div className="relative">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
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
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
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

        {/* Featured Filter */}
        <div className="hidden items-center space-x-2 md:flex">
          <Checkbox
            checked={showFeaturedOnly}
            id="featured"
            onCheckedChange={(checked) =>
              handleFeaturedChange(checked as boolean)
            }
          />
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="featured"
          >
            Featured only
          </label>
        </div>

        {/* Clear Filters */}
        <Button onClick={clearFilters} size="sm" variant="outline">
          Clear filters
        </Button>
      </div>
    </div>
  )
}

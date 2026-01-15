import { MagnifyingGlass } from '@phosphor-icons/react'
import { useState } from 'react'
import type { Blog } from '@/types/blog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import * as m from '@/paraglide/messages'

type BlogFiltersProps = {
  blogs: Array<Blog>
  onFilteredBlogsChange: (filteredBlogs: Array<Blog>) => void
}

export function BlogFilters({
  blogs,
  onFilteredBlogsChange,
}: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags))
  ).sort()

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    handleFilterAfterChange(value, selectedTag, featuredOnly)
  }

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag || 'all')
    handleFilterAfterChange(searchQuery, tag || 'all', featuredOnly)
  }

  const handleFeaturedToggle = () => {
    const newFeaturedOnly = !featuredOnly
    setFeaturedOnly(newFeaturedOnly)
    handleFilterAfterChange(searchQuery, selectedTag, newFeaturedOnly)
  }

  const handleFilterAfterChange = (
    query: string,
    tag: string,
    featured: boolean
  ) => {
    const filtered = blogs.filter((blog) => {
      const search = query.toLowerCase()
      const matchesSearch =
        blog.title.toLowerCase().includes(search) ||
        blog.excerpt.toLowerCase().includes(search) ||
        blog.tags.some((tagItem) => tagItem.toLowerCase().includes(search))

      const matchesTag = tag === 'all' || blog.tags.includes(tag)
      const matchesFeatured = !featured || blog.featured

      return matchesSearch && matchesTag && matchesFeatured
    })

    onFilteredBlogsChange(filtered)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTag('all')
    setFeaturedOnly(false)
    onFilteredBlogsChange(blogs)
  }

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="flex-1">
        <div className="relative">
          <MagnifyingGlass className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
          <Input
            className="w-full pl-10"
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={m.blogsPage_filters_searchPlaceholder()}
            value={searchQuery}
          />
        </div>
      </div>

      <div className="flex flex-row flex-wrap items-center gap-4">
        <Select onValueChange={handleTagChange} value={selectedTag}>
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{m.blogsPage_filters_allTags()}</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleFeaturedToggle}
          size="sm"
          variant={featuredOnly ? 'default' : 'outline'}
        >
          {m.blogsPage_filters_featuredOnly()}
        </Button>

        <Button onClick={clearFilters} size="sm" variant="outline">
          {m.blogsPage_filters_clearFilters()}
        </Button>
      </div>
    </div>
  )
}

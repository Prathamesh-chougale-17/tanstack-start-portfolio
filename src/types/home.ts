import type { JSX } from 'react'
import type { IconProps } from '@/components/icons'

export type Achievement = {
  title: string
  description: string
  Icon: (props: IconProps) => JSX.Element
}

export type Project = {
  title: string
  description: string
  tags: string[]
  githubLink?: string
  liveLink?: string
}

export type HeroSectionProps = {
  image: string
  name: string
  intro: string
  title: string
  company: string
  description: string
  companyLink?: string
}

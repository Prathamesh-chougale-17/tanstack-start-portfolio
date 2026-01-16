import type { HeroSectionProps } from '@/types/home'
import ClockWidget from '@/components/clock-05'
import { Badge } from '@/components/ui/badge'

export function HeroSection({
  name,
  intro,
  title,
  company,
  description,
  companyLink,
}: HeroSectionProps) {
  return (
    <section className="flex animate-fade-in pt-10 flex-col items-center justify-between gap-8 md:flex-row">
      <div className="max-w-xl space-y-4">
        <h1 className="font-bold text-4xl tracking-tight md:text-6xl">
          {intro}
          <span className="text-primary">{name}</span>
        </h1>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-2xl text-muted-foreground">
            {title}
          </h2>
          {companyLink ? (
            <a href={companyLink} rel="noopener noreferrer" target="_blank">
              <Badge className="text-sm">{company}</Badge>
            </a>
          ) : (
            <Badge className="text-sm">{company}</Badge>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center justify-center">
        <ClockWidget className="p-0" size="lg" />
      </div>
    </section>
  )
}

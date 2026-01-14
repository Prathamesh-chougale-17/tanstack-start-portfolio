import { SocialLinks } from './social-links'
import * as m from '@/paraglide/messages'

export function ThoughtSection() {
  const thoughtTitle = m.contact_thoughtTitle()
  const thoughtText = m.contact_thoughtText()

  return (
    <section className="mb-16 text-center">
      <div className="mx-auto">
        <h1 className="mb-6 animate-fade-in font-bold text-3xl md:text-5xl">
          <em>{thoughtTitle}</em>
        </h1>
        <p className="mb-10 animate-fade-in-up text-lg text-muted-foreground italic">
          {thoughtText}
        </p>
        <SocialLinks />
      </div>
    </section>
  )
}

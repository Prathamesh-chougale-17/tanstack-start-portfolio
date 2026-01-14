import { createFileRoute } from '@tanstack/react-router'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactImage } from '@/components/contact/contact-image'
import { ThoughtSection } from '@/components/contact/thought-section'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="py-12">
      {/* Section 1: Thought and Social Links */}
      <ThoughtSection />

      {/* Section 2: Image and Contact Form */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <ContactImage />
        <ContactForm />
      </section>
    </div>
  )
}

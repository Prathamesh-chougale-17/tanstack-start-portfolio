import { createFileRoute } from '@tanstack/react-router'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactImage } from '@/components/contact/contact-image'
import { ThoughtSection } from '@/components/contact/thought-section'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [
      {
        title: 'Contact | Prathamesh Chougale - Get In Touch',
      },
      {
        name: 'description',
        content:
          "Get in touch with Prathamesh Chougale for collaboration opportunities, project inquiries, or just to say hello. I'm always open to discussing new projects and innovative ideas in web development.",
      },
      {
        name: 'keywords',
        content:
          'Contact Prathamesh, Hire React Developer, Full Stack Developer Contact, Collaboration, Web Development Services, Freelance Developer',
      },
      // Open Graph tags
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'Contact Prathamesh Chougale',
      },
      {
        property: 'og:description',
        content:
          "Let's collaborate! Reach out for web development projects, consulting, or professional opportunities.",
      },
      {
        property: 'og:image',
        content: '/profile.webp',
      },
      {
        property: 'og:url',
        content: 'https://prathamesh-chougale.vercel.app/contact',
      },
      // Twitter Card tags
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:title',
        content: 'Contact Prathamesh Chougale',
      },
      {
        name: 'twitter:description',
        content: 'Get in touch for collaboration and project inquiries.',
      },
      {
        name: 'twitter:image',
        content: '/profile.webp',
      },
      {
        name: 'twitter:url',
        content: 'https://prathamesh-chougale.vercel.app/contact',
      },
    ],
  }),
})

function ContactPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 md:pt-16 lg:pt-24 space-y-8">
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

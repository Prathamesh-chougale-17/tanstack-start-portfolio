import { Mail } from 'lucide-react'
import { Icons } from '@/components/icons'
import * as m from '@/paraglide/messages'

export function SocialLinks() {
  // Social links can be built from messages, but we keep them hardcoded for now
  // as they're specific URLs that don't need translation
  const socials = [
    {
      name: m.contact_socials_links_3_label(),
      url: m.contact_socials_links_3_url(),
      Icon: Icons.gitHub,
    },
    {
      name: m.contact_socials_links_2_label(),
      url: m.contact_socials_links_2_url(),
      Icon: Icons.linkedin,
    },
    {
      name: m.contact_socials_links_1_label(),
      url: m.contact_socials_links_1_url(),
      Icon: Icons.x,
    },
    {
      name: 'Email',
      url: 'mailto:prathameshchougale17@gmail.com',
      Icon: Mail,
    },
  ]

  return (
    <div className="flex justify-center space-x-8">
      {socials.map((social, index) => (
        <a
          className="transform text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
          href={social.url}
          key={index}
          rel="noopener noreferrer"
          target="_blank"
        >
          <social.Icon
            className={`h-8 w-8 ${
              (social.url.includes('twitter.com') ||
                social.url.includes('x.com')) &&
              'dark:invert'
            }`}
          />
        </a>
      ))}
    </div>
  )
}

import { Mail } from 'lucide-react'
import { Icons } from '@/components/icons'

export function SocialLinks() {
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/Prathamesh-chougale-17',
      Icon: Icons.gitHub,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/prathamesh-chougale-44a17b257/',
      Icon: Icons.linkedin,
    },
    {
      name: 'Twitter',
      url: 'https://x.com/NotPrathamesh17',
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

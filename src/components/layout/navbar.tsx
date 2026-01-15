import { MobileNav } from '@/components/layout/mobile-nav'
import { AnimatedLink } from '@/components/ui/animated-link'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { AnimatedThemeToggler } from '@/components/ui/theme-toggle'
import * as m from '@/paraglide/messages'

export function Navbar() {
  // Build nav items from Paraglide messages
  const navItems = [
    { title: m.navItems_0_title(), href: '/' },
    { title: m.navItems_1_title(), href: '/projects' },
    { title: m.navItems_2_title(), href: '/about' },
    { title: m.navItems_3_title(), href: '/contact' },
    { title: m.navItems_4_title(), href: '/blogs' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6 md:px-8 lg:px-12">
      <div className="flex h-16 items-center justify-between py-4">
        {/* Logo - Left */}
        <div className="flex items-center">
          <AnimatedLink
            className="items-center space-x-2 md:flex"
            href="/"
            showActiveIndicator={false}
          >
            <img
              alt="Logo"
              className="hidden md:inline-block"
              height={64}
              src="/icons/android-chrome-192x192.png"
              width={64}
            />
          </AnimatedLink>
        </div>

        {/* Desktop navigation - Center */}
        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <AnimatedLink
              className="flex items-center py-1 font-medium text-base text-foreground/70 transition-all duration-300 hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.title}
            </AnimatedLink>
          ))}
        </nav>

        {/* Language toggle, theme toggle and mobile nav - Right */}
        <div className="flex items-center justify-end gap-2">
          <LanguageSwitcher />
          <AnimatedThemeToggler />
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  )
}

'use client'
import { useState } from 'react'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarLogo,
} from '@/components/ui/resizable-navbar'
import { AnimatedLink } from '@/components/ui/animated-link'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { AnimatedThemeToggler } from '@/components/ui/theme-toggle'
import * as m from '@/paraglide/messages'

export function NavbarComponent() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Build nav items from Paraglide messages
  const navItems = [
    { name: m.navItems_1_title(), link: '/projects' },
    { name: m.navItems_2_title(), link: '/about' },
    { name: m.navItems_3_title(), link: '/contact' },
    { name: m.navItems_4_title(), link: '/blogs' },
  ]

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <div className="flex flex-1 items-center justify-center">
          <NavItems items={navItems} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <LanguageSwitcher />
          <AnimatedThemeToggler />
        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <AnimatedLink
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white"
            showActiveIndicator={false}
          >
            <span className="font-medium">{m.hero_name()}</span>
          </AnimatedLink>
          <MobileNavToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen}>
          {navItems.map((item) => (
            <AnimatedLink
              key={item.link}
              href={item.link}
              onClick={() => setMobileOpen(false)}
              className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
              showActiveIndicator={false}
            >
              {item.name}
            </AnimatedLink>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}

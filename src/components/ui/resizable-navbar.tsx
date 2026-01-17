'use client'

import React from 'react'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { AnimatedLink } from '@/components/ui/animated-link'

/* ===================== Types ===================== */

interface NavbarProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItemsProps {
  items: Array<{ name: string; link: string }>
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

/* ===================== Navbar ===================== */

export const Navbar = ({ children, className, visible }: NavbarProps) => {
  return (
    <div className={cn('fixed inset-x-0 top-3 z-50 w-full', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </div>
  )
}

/* ===================== Desktop ===================== */

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      className={cn(
        'mx-auto hidden w-full max-w-4xl items-center justify-between rounded-full px-6 py-3 lg:flex',
        // 🌫️ glass background
        'bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl',
        // 🧱 subtle border + depth
        visible &&
          'shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div
      className={cn(
        'absolute inset-0 hidden flex-1 items-center justify-center space-x-2 text-sm font-medium text-zinc-600 lg:flex',
        className,
      )}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          {hovered === idx && (
            <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-neutral-800" />
          )}
          <AnimatedLink
            href={item.link}
            onClick={onItemClick}
            className="relative z-10 px-4 py-2 text-neutral-700 dark:text-neutral-300"
            showActiveIndicator={false}
          >
            {item.name}
          </AnimatedLink>
        </div>
      ))}
    </div>
  )
}

/* ===================== Mobile ===================== */

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-4xl flex-col px-4 py-3 lg:hidden',
        // 🌫️ glass background
        'bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl rounded-2xl',
        // 🧱 border
        visible &&
          'shadow-[0_0_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'absolute inset-x-0 top-full mt-3 rounded-xl bg-white px-6 py-6 shadow-lg dark:bg-neutral-950',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) => {
  return isOpen ? (
    <XIcon
      className="h-6 w-6 cursor-pointer text-black dark:text-white"
      onClick={onClick}
    />
  ) : (
    <ListIcon
      className="h-6 w-6 cursor-pointer text-black dark:text-white"
      onClick={onClick}
    />
  )
}

/* ===================== Extras ===================== */

export const NavbarLogo = () => {
  return (
    <AnimatedLink
      href="/"
      className="flex items-center gap-2 px-2 py-1 text-sm font-medium"
    >
      <img
        src="/icons/android-chrome-192x192.png"
        alt="logo"
        width={28}
        height={28}
      />
    </AnimatedLink>
  )
}

export const NavbarButton = ({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  ...props
}: {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
} & (
  | React.ComponentPropsWithoutRef<'a'>
  | React.ComponentPropsWithoutRef<'button'>
)) => {
  const base =
    'rounded-md px-4 py-2 text-sm font-semibold inline-flex items-center justify-center'

  const variants = {
    primary: 'bg-black text-white',
    secondary: 'bg-transparent text-black dark:text-white',
    dark: 'bg-black text-white',
    gradient: 'bg-gradient-to-b from-blue-500 to-blue-700 text-white',
  }

  return (
    <Tag
      href={href}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      {children}
    </div>
  )
}

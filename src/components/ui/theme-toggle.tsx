import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: Props) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration mismatch by only rendering theme-specific content after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget

      const newTheme = theme === 'dark' ? 'light' : 'dark'

      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme)
        })
      }).ready

      const { top, left, width, height } = button.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    },
    [theme, setTheme],
  )

  return (
    <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
      <Button
        aria-label="Toggle theme"
        className={cn('h-9 w-9 p-0', className)}
        onClick={toggleTheme}
        size="sm"
        variant="ghost"
      >
        {mounted ? (
          theme === 'dark' ? (
            <SunIcon className="h-4 w-4 transition-all" />
          ) : (
            <MoonIcon className="h-4 w-4 transition-all" />
          )
        ) : (
          // Render a neutral icon during SSR to prevent hydration mismatch
          <SunIcon className="h-4 w-4 transition-all" />
        )}
      </Button>
    </div>
  )
}

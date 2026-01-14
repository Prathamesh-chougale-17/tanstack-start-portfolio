// NOTE: Despite the name, 'next-themes' is framework-agnostic and works with any React app.
// It handles dark mode, system preferences, localStorage sync, and FOUC prevention.
// See: https://github.com/pacocoursey/next-themes
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type * as React from 'react'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

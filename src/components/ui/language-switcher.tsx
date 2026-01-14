import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getLocale, setLocale, locales } from '@/paraglide/runtime'

const localeNames = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
} as const

const localeFlags = {
  en: '🇬🇧',
  hi: '🇮🇳',
  mr: '🇮🇳',
} as const

export function LanguageSwitcher() {
  const currentLocale = getLocale()

  const handleLocaleChange = (locale: string) => {
    setLocale(locale as 'en' | 'hi' | 'mr')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Select language"
          className="gap-2"
          size="icon"
          variant="ghost"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            className={`cursor-pointer ${currentLocale === loc ? 'bg-accent' : ''}`}
            key={loc}
            onClick={() => handleLocaleChange(loc)}
          >
            <span className="mr-2">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

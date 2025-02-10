import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import localization from './localization'
import pathNames from './pathNames.json'
import { TypedLocale } from 'payload'

export const routing = defineRouting({
  locales: localization.locales.map((locale) => locale.code),
  defaultLocale: localization.defaultLocale,
  localePrefix: 'as-needed',
  pathnames: {
    '/': {
      pt: '/',
      en: '/',
    },
    '/produtos': {
      pt: '/produtos',
      en: '/products',
    },
    ...pathNames,
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
export type Pathnames = keyof typeof routing.pathnames
export type PathNamesObject = {
  [key: string]: {
    [locale in TypedLocale]?: string
  }
}
export type Locale = (typeof routing.locales)[number]

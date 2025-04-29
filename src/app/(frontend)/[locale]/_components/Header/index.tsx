import { getCachedGlobal } from '@/app/(payload)/utilities/getGlobals'
import type { Header } from '@/payload-types'
import { TypedLocale } from 'payload'
import Logo from '../Logo'
import { HeaderNav } from './Nav'
import LocaleSwitcher from './LocaleSwitcher/index.client'
import { Link } from '@/i18n/routing'

export default async function Header({ locale }: { locale: TypedLocale }) {
  const header: Header = await getCachedGlobal('header', 1, locale)
  return (
    <header className="container relative z-20">
      <div className="flex justify-between py-8">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <div className="flex gap-6">
          <HeaderNav data={header} locale={locale} />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}

import React from 'react'

import { Link, Pathnames } from '@/i18n/routing'
import verifySessionToken from '@/app/(frontend)/[locale]/_utils/verifySessionToken'
import type { Header } from '@/payload-types'
import AccountLinks from './AccountLinks'
import { TypedLocale } from 'payload'

export const HeaderNav: React.FC<{ data: Header; locale: TypedLocale }> = async ({
  data,
  locale,
}) => {
  const isLogged = await verifySessionToken()
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center">
      <div className="flex gap-4">
        {navItems.map(({ link }, i) => (
          <Link key={i} href={(link?.url as Pathnames) || '/'}>
            {link.label}
          </Link>
        ))}
      </div>
      <AccountLinks isLogged={isLogged} locale={locale} />
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}

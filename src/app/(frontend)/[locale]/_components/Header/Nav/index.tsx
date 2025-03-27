import React from 'react'

import { Link, Pathnames } from '@/i18n/routing'
import type { Header } from '@/payload-types'
import { TypedLocale } from 'payload'
import AccountLinks from './AccountLinks'
import verifySessionToken from '../../../_utils/verifySessionToken'

export const HeaderNav: React.FC<{ data: Header; locale: TypedLocale }> = async ({
  data,
  locale,
}) => {
  const { isLogged } = await verifySessionToken()
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-6">
      <div className="flex gap-4">
        {navItems.map(({ link }, i) => (
          <Link key={i} href={(link?.url as Pathnames) || '/'}>
            {link.label}
          </Link>
        ))}
      </div>
      <AccountLinks locale={locale} isLogged={isLogged} />
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}

import React from 'react'

import { CMSLink } from '@/app/(payload)/components/Link'
import type { Header } from '@/payload-types'
import { SearchIcon } from 'lucide-react'
import { Link } from '@/i18n/routing'

export const HeaderNav: React.FC<{ data: Header }> = ({ data }) => {
  const navItems = data?.navItems || []
  return (
    <nav className="flex gap-6 items-center">
      <div className="flex gap-4">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
      </div>
      <Link href="/account">My Account</Link>
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}

'use client'

import { Link, Pathnames } from '@/i18n/routing'
import cn from '@/utils/tailwindMerge'
import { ClipboardList, House, LockKeyholeOpen, MapPinHouse, SquareUserRound } from 'lucide-react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { JSX } from 'react'

const links: {
  name: string
  href: Pathnames
  icon: JSX.Element
}[] = [
  {
    name: 'Dashboard',
    href: '/account',
    icon: <House size={20} />,
  },
  {
    name: 'Personal Data',
    href: '/account/personal-data',
    icon: <SquareUserRound size={20} />,
  },
  {
    name: 'Access Data',
    href: '/account/access-data',
    icon: <LockKeyholeOpen size={20} />,
  },
  {
    name: 'Addresses',
    href: '/account/addresses',
    icon: <MapPinHouse size={20} />,
  },
  {
    name: 'Orders',
    href: '/account/orders',
    icon: <ClipboardList size={20} />,
  },
]

export default function NavLinks() {
  const segment = useSelectedLayoutSegment()
  return links.map((link, index) => {
    // If segment is null and index is 0 put the first link active If not use "includes" method to check if the link href includes the segment
    const isActive = segment === null && index === 0 ? true : link.href.includes(segment!)
    return (
      <Link
        key={link.name}
        href={link.href}
        className={cn(
          'flex h-[48px] grow items-center justify-center gap-3 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
          {
            'bg-sky-100 text-blue-600': isActive,
          },
        )}
      >
        {link.icon}
        <p className="hidden md:block">{link.name}</p>
      </Link>
    )
  })
}

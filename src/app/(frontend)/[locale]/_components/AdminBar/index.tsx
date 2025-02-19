'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from 'payload-admin-bar'

import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'

import { getClientSideURL } from '@/app/(payload)/utilities/getURL'
import { useRouter } from '@/i18n/routing'
import cn from '@/utils/tailwindMerge'
import './index.scss'

const baseClass = 'admin-bar'

const _collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

type ExtendedPayloadMeUser = PayloadMeUser & {
  roles?: string[]
}

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  // const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState<boolean | string | PayloadMeUser>(false)
  // const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user: ExtendedPayloadMeUser) => {
    if (user?.id && user?.roles?.includes('customer')) {
      setShow(false)
      return
    }
    setShow(user?.id)
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          // collection={collection}
          // collectionLabels={{
          //   plural: collectionLabels[collection]?.plural || 'Pages',
          //   singular: collectionLabels[collection]?.singular || 'Page',
          // }}
          onAuthChange={onAuthChange as (user: PayloadMeUser) => void}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}

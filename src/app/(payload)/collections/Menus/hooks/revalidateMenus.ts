import type { CollectionAfterChangeHook } from 'payload'

import { Menu } from '@/payload-types'
import { revalidateTag } from 'next/cache'

export const revalidateMenus: CollectionAfterChangeHook<Menu> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating Tag » menus_main-menu`)
    revalidateTag('menus_main-menu')
  }
  return doc
}

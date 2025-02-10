import type { CollectionConfig } from 'payload'

import { link } from '../../fields/link'
import { revalidateMenus } from './hooks/revalidateMenus'
import { toKebabCase } from '@/utilities/toKebabCase'

export const Menus: CollectionConfig<'menus'> = {
  slug: 'menus',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt', 'createdAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          (data) => {
            if (data.operation === 'create') {
              return toKebabCase(data.siblingData.title)
            }
            if (data.operation === 'update') {
              if (data.previousValue !== toKebabCase(data.siblingData.title)) {
                return toKebabCase(data.siblingData.title)
              }
            }
          },
        ],
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateMenus],
  },
}

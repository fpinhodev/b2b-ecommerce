import type { CollectionConfig } from 'payload'
import { adminOrSelf } from '../access/adminOrSelf'

export const Cart: CollectionConfig = {
  slug: 'cart',
  access: {
    read: adminOrSelf,
    create: adminOrSelf,
    update: adminOrSelf,
    delete: adminOrSelf,
  },
  fields: [
    {
      name: 'userId',
      type: 'number',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      defaultValue: [],
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
          required: true,
        },
      ],
    },
  ],
}

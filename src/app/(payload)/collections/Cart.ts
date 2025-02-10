import type { CollectionConfig } from 'payload'

export const Cart: CollectionConfig = {
  slug: 'cart',
  admin: {
    useAsTitle: 'products',
  },
  fields: [
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'total',
      type: 'number',
    },
  ],
}

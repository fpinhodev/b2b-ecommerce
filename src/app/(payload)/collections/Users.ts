import type { CollectionConfig } from 'payload'
import { admin, adminFieldAccess } from '../access/admin'
import { adminOrSelf } from '../access/adminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: admin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  fields: [
    // Email added by default
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['editor'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
      access: {
        update: adminFieldAccess,
      },
    },
  ],
}

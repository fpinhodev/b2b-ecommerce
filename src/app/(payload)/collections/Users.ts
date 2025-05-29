import ForgotPasswordTemplate from '@/email/ForgotPasswordTemplate'
import customTranslation from '@/i18n/hooks/customTranslation'
import type { CollectionConfig } from 'payload'
import { adminFieldAccess } from '../access/admin'
import { adminOrSelf } from '../access/adminOrSelf'
import { checkRole } from '../access/checkRole'
import { createUser } from '../access/createUser'

const BoUsers: CollectionConfig = {
  slug: 'bo-users',
  labels: {
    singular: 'User',
    plural: 'Users',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'firstName', 'roles', 'createdAt', 'updatedAt'],
  },
  auth: {
    useAPIKey: true,
    tokenExpiration: 3600, // 1 hour
    cookies: {
      secure: process.env.NODE_ENV === 'production',
    },
    forgotPassword: {
      // @ts-ignore: TypeScript does not recognize the generateEmailHTML property in the auth configuration
      generateEmailHTML: ForgotPasswordTemplate,
    },
  },
  access: {
    create: createUser,
    read: adminOrSelf,
    update: adminOrSelf,
    admin: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
  },
  fields: [
    {
      name: 'firstName',
      label: customTranslation('fields:firstName'),
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: customTranslation('fields:lastName'),
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: customTranslation('fields:phoneNumber'),
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      saveToJWT: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Customer',
          value: 'customer',
        },
        {
          label: 'Seller',
          value: 'seller',
        },
      ],
      access: {
        update: adminFieldAccess,
      },
    },
  ],
}

export default BoUsers

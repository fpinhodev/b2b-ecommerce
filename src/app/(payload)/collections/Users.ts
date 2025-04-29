import ForgotPasswordTemplate from '@/email/ForgotPasswordTemplate'
import customTranslation from '@/i18n/hooks/customTranslation'
import type { CollectionConfig } from 'payload'
import { adminFieldAccess } from '../access/admin'
import { adminOrSelf } from '../access/adminOrSelf'
import { checkRole } from '../access/checkRole'
import { createUser } from '../access/createUser'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'firstName', 'roles', 'createdAt', 'updatedAt'],
  },
  auth: {
    tokenExpiration: 3600, // 1 hour
    cookies: {
      secure: process.env.NODE_ENV === 'production',
    },
    forgotPassword: {
      // @ts-ignore: TypeScript does not recognize the generateEmailHTML property in the auth configuration
      generateEmailHTML: ForgotPasswordTemplate,
    },
  },
  // endpoints: [
  //   {
  //     path: '/test',
  //     method: 'get',
  //     handler: async ({ payload }) => {
  //       console.log(30, payload)
  //       return Response.json({
  //         message: 'Hello from the test endpoint',
  //       })
  //     },
  //   },
  // ],
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
    {
      name: 'blockedAccount',
      label: customTranslation('fields:blockedAccount'),
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'customerDiscount',
      label: customTranslation('fields:customerDiscount'),
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'erpId',
      label: 'ERP ID',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'sellerId',
      label: customTranslation('fields:sellerId'),
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'priceListId',
      label: customTranslation('fields:priceListId'),
      type: 'text',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      required: true,
      defaultValue: 'active',
    },
    {
      name: 'addresses',
      label: 'Addresses',
      type: 'relationship',
      relationTo: 'users-addresses',
      hasMany: true,
    },
    /*
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          required: true,
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
              min: 0,
              admin: {
                step: 1,
              },
              required: true,
            },
          ],
        },
      ],
    },
    */
  ],
}

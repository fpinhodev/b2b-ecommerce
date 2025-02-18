import customTranslation from '@/i18n/hooks/customTranslation'
import type { AuthStrategyFunctionArgs, CollectionConfig } from 'payload'
import { admin } from '../access/admin'
import { t } from '@payloadcms/translations'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    // useAsTitle: 'email',
    // defaultColumns: ['email', 'status', 'roles', 'customerDiscount', 'blockedAccount'],
  },
  access: {
    create: admin,
    read: admin,
    update: admin,
    delete: admin,
    admin: () => false,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
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
          label: 'Customer',
          value: 'customer',
        },
        {
          label: 'Seller',
          value: 'seller',
        },
      ],
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
    },
    {
      name: 'sellerId',
      label: customTranslation('fields:sellerId'),
      type: 'number',
      required: true,
    },
    {
      name: 'priceListId',
      label: customTranslation('fields:priceListId'),
      type: 'text',
      required: true,
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
      label: customTranslation('fields:addresses'),
      type: 'array',
      fields: [
        {
          name: 'addressLine1',
          label: customTranslation('fields:addressLine1'),
          type: 'text',
          required: true,
        },
        {
          name: 'addressLine2',
          label: customTranslation('fields:addressLine2'),
          type: 'text',
        },
        {
          name: 'city',
          label: customTranslation('fields:city'),
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          label: customTranslation('fields:state'),
          type: 'text',
          required: true,
        },
        {
          name: 'zipCode',
          label: customTranslation('fields:zipCode'),
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          label: customTranslation('fields:country'),
          type: 'text',
          required: true,
        },
        {
          name: 'isDefault',
          label: customTranslation('fields:isDefault'),
          type: 'checkbox',
          required: true,
        },
      ],
    },
  ],
}

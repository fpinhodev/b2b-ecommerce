import type { CollectionConfig } from 'payload'
import { admin } from '../access/admin'
import { anyone } from '../access/anyone'

export const StoreUsers: CollectionConfig = {
  slug: 'storeUsers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'roles', 'customerDiscount', 'blockedAccount'],
  },
  auth: true,
  access: {
    create: admin,
    read: anyone,
    update: admin,
    delete: admin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
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
      label: 'Blocked Account',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'customerDiscount',
      label: 'Customer Discount',
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
      label: 'Seller ID',
      type: 'number',
      required: true,
    },
    {
      name: 'priceListId',
      label: 'Price List ID',
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
      label: 'Addresses',
      type: 'array',
      fields: [
        {
          name: 'addressLine1',
          label: 'Address Line 1',
          type: 'text',
          required: true,
        },
        {
          name: 'addressLine2',
          label: 'Address Line 2',
          type: 'text',
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          label: 'State',
          type: 'text',
          required: true,
        },
        {
          name: 'zipCode',
          label: 'Zip Code',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          label: 'Country',
          type: 'text',
          required: true,
        },
        {
          name: 'isDefault',
          label: 'Is Default',
          type: 'checkbox',
          required: true,
        },
      ],
    },
  ],
}

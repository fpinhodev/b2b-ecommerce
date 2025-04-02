import customTranslation from '@/i18n/hooks/customTranslation'
import type { CollectionConfig } from 'payload'
import { adminOrSelf } from '../access/adminOrSelf'
import { checkRole } from '../access/checkRole'

export const UsersAddresses: CollectionConfig = {
  slug: 'users-addresses',
  admin: {
    useAsTitle: 'addressLine1',
  },
  access: {
    create: adminOrSelf,
    read: adminOrSelf,
    update: adminOrSelf,
    admin: ({ req: { user } }) => checkRole(['admin', 'editor'], user),
  },
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
}

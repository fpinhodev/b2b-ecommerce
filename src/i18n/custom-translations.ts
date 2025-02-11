import type { Config } from 'payload'
import type { NestedKeysStripped } from '@payloadcms/translations'

export const customTranslations: Config['i18n']['translations'] = {
  pt: {
    general: {},
    fields: {
      firstName: 'Primeiro nome',
      lastName: 'Último nome',
      phoneNumber: 'Telemóvel',
      blockedAccount: 'Conta Bloqueada',
      customerDiscount: 'Desconto cliente',
      sellerId: 'ID Vendedor',
      priceListId: 'ID Lista Preços',
      addresses: 'Endereços',
      addressLine1: 'Morada linha 1',
      addressLine2: 'Morada linha 2',
      city: 'Cidade',
      state: 'Distrito',
      zipCode: 'Código Postal',
      country: 'País',
      isDefault: 'Endereço Principal',
    },
  },
}

export type CustomTranslationsObject = typeof customTranslations.pt
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>

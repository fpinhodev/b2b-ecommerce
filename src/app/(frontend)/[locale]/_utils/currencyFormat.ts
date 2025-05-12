import localization from '@/i18n/localization'
import { cookies } from 'next/headers'
import 'server-only'

const currencyFormat = async (value: number): Promise<string> => {
  const cookie = (await cookies()).get('NEXT_LOCALE')
  if (!cookie) return value.toString()

  const localeDefaults = localization.locales.find((l) => l.code === cookie.value) || {
    code: 'pt',
    regionCode: 'PT',
    currency: 'EUR',
  }

  return value.toLocaleString(`${localeDefaults.code}-${localeDefaults.regionCode}`, {
    style: 'currency',
    currency: localeDefaults.currency,
  })
}

export default currencyFormat

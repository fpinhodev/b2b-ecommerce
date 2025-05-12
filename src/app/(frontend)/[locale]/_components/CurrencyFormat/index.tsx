'use client'

import localization from '@/i18n/localization'

const CurrencyFormat = ({ value }: { value: number }): string => {
  if (typeof window === 'undefined') return value.toString()

  const getCookieValue = (name: string) => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1]
  }

  const locale = getCookieValue('NEXT_LOCALE')
  const localeDefaults = localization.locales.find((l) => l.code === locale) || {
    code: 'pt',
    regionCode: 'PT',
    currency: 'EUR',
  }

  return value.toLocaleString(`${localeDefaults.code}-${localeDefaults.regionCode}`, {
    style: 'currency',
    currency: localeDefaults.currency,
  })
}

export default CurrencyFormat

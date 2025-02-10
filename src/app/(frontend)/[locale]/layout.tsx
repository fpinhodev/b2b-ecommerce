import { getServerSideURL } from '@/app/(payload)/utilities/getURL'
import { mergeOpenGraph } from '@/app/(payload)/utilities/mergeOpenGraph'
import localization from '@/i18n/localization'
import { routing } from '@/i18n/routing'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { TypedLocale } from 'payload'
import React from 'react'
import { AdminBar } from './_components/AdminBar'
import Header from './_components/Header'
import './globals.css'

type Args = {
  children: React.ReactNode
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function RootLayout({ children, params }: Args) {
  const { locale } = await params
  const currentLocale = locale ? locale : localization.defaultLocale

  if (!routing.locales.includes(locale as TypedLocale)) {
    notFound()
  }

  setRequestLocale(currentLocale)

  const messages = await getMessages()

  const { isEnabled } = await draftMode()

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header locale={locale} />
          {children}
          {/* <Footer /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
}

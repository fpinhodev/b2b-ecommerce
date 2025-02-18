import { GetPagesResult } from '@/app/(frontend)/next/path-names/route'
import { promises as fs } from 'node:fs'
import path from 'path'
import { BasePayload, TypedLocale } from 'payload'
import { fileURLToPath } from 'url'
import localization from '../localization'
import { PathNamesObject, routing } from '../routing'

export default async function generatePathNames(payload: BasePayload, allPages: GetPagesResult[]) {
  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)
  const filePath = path.resolve(dirname, '../autoGenPathnames.json')

  const pathnames = allPages.reduce(
    (acc: PathNamesObject, page: GetPagesResult) => ({
      ...acc,
      [`/${page.slug[localization.defaultLocale as TypedLocale]}`]: Object.fromEntries(
        routing.locales.map((locale) =>
          page.slug[locale] ? [locale, `/${page.slug[locale]}`] : [locale, '/'],
        ),
      ),
    }),
    {},
  )

  try {
    fs.writeFile(filePath, JSON.stringify(pathnames))
    payload.logger.info('«ROUTING» pathnames of Pages collection are generated successfully')
  } catch (error) {
    payload.logger.error({ err: error }, '«ROUTING» Error generating pathnames of Pages collection')
  }
}

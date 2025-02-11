// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Cart } from './app/(payload)/collections/Cart'
import { Media } from './app/(payload)/collections/Media'
import { Menus } from './app/(payload)/collections/Menus'
import { Pages } from './app/(payload)/collections/Pages'
import { Products } from './app/(payload)/collections/Products'
import { StoreUsers } from './app/(payload)/collections/StoreUsers'
import { Users } from './app/(payload)/collections/Users'
import { Header } from './app/(payload)/globals/Header'
import { customTranslations } from './i18n/custom-translations'
import localization from './i18n/localization'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, StoreUsers, Media, Products, Cart, Pages, Menus],
  globals: [Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt },
    translations: customTranslations,
  },
  localization,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})

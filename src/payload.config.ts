// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import nodemailer from 'nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Media } from './app/(payload)/collections/Media'
import { Pages } from './app/(payload)/collections/Pages'
import { Products } from './app/(payload)/collections/Products'
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
  collections: [Users, Media, Products, Pages],
  globals: [Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
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
  email: nodemailerAdapter({
    defaultFromAddress: 'dev@payloadcms.com',
    defaultFromName: 'Payload CMS',
    // skipVerify: process.env.NODE_ENV === 'development',
    transport: await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      // port: 587,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
})

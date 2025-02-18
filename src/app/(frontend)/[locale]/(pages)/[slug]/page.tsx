import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload, TypedLocale } from 'payload'

import { RenderBlocks } from '@/app/(payload)/blocks/RenderBlocks'
import { generateMeta } from '@/app/(payload)/utilities/generateMeta'
import pathNames from '@/i18n/autoGenPathnames.json'
import type { Page as PageType } from '@/payload-types'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

type PathNames = {
  [key: string]: {
    [locale in TypedLocale]?: string
  }
}

const typedPathNames: PathNames = pathNames

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => doc.slug !== 'home')
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug: string | undefined
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug: slugParam, locale } = await paramsPromise

  const slug = typedPathNames[`/${slugParam}`]
    ? typedPathNames[`/${slugParam}`][locale]?.substring(1)
    : slugParam
      ? slugParam
      : `home_${locale}`

  const page: PageType | undefined = await queryPageBySlug({
    slug,
    locale,
  })

  if (!page) {
    notFound()
  }

  const { layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: slugParam, locale } = await paramsPromise
  const slug = slugParam ? slugParam : `home_${locale}`
  const page = await queryPageBySlug({
    slug,
    locale,
  })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: string | undefined; locale: TypedLocale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale: locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  },
)

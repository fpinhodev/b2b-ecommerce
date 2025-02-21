import configPromise from '@payload-config'
import { headers as nextHeaders } from 'next/headers'
import { getPayload, TypedLocale } from 'payload'

import type { Product } from '@/payload-types'
import { notFound } from 'next/navigation'
import { cache } from 'react'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = pages.docs
//     ?.filter((doc) => doc.slug !== 'home')
//     .map(({ slug }) => {
//       return { slug }
//     })

//   return params
// }

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise
  const headers = await nextHeaders()
  const payload = await getPayload({ config: configPromise })
  const user = await payload.auth({ headers })

  console.log('«« PRODUCT PAGE »»')
  console.log('«« PRODUCT PAGE USER »»', user)
  const product: Product | null = await queryProductById({
    id: 111,
    locale: locale,
  })
  console.log('PRODUCT', product)

  if (!product) {
    notFound()
  }

  return <article className="pt-16 pb-24"></article>
}

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug: slugParam, locale } = await paramsPromise
//   const slug = slugParam ? slugParam : `home_${locale}`
//   const page = await queryPageBySlug({
//     slug,
//     locale,
//   })
//   return generateMeta({ doc: page })
// }

const queryProductById = cache(async ({ id, locale }: { id: number; locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    limit: 1,
    pagination: false,
    locale: locale,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs?.[0] || null
})

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { cache } from 'react'
import { fetchDocs } from '../../../_utils/fetchDocs'
import { PageArgs } from '../../[slug]/page'

export default async function Page({ params: paramsPromise }: PageArgs) {
  const { locale } = await paramsPromise
  // const products: Product[] | [] = await queryProductBySlug({
  //   locale: locale,
  // })
  const products = await fetchDocs('products')

  console.log('PRODUCT', products)

  return (
    <div className="container py-8 md:overflow-hidden">
      <h1 className="text-xl font-bold">All Products</h1>
      {/* <ProductsGrid
        products={products}
        isLoggedIn={Boolean(user)}
      /> */}
    </div>
  )
}

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

const queryProductBySlug = cache(
  async ({ slug, locale }: { slug: string | undefined; locale: TypedLocale }) => {
    // const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      // draft,
      limit: 1,
      pagination: false,
      // overrideAccess: draft,
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

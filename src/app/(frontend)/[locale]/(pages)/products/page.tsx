import type { Product } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { cache } from 'react'
import ProductsGrid from '../../_components/ProductsGrid'
import verifySessionToken from '../../_utils/verifySessionToken'
import { PageArgs } from '../[slug]/page'

export default async function Page({ params: paramsPromise }: PageArgs) {
  const { locale } = await paramsPromise
  const { user } = await verifySessionToken()
  const products: Product[] | [] = await queryAllProduct({
    locale: locale,
  })
  console.log('PRODUCTS', products)

  return (
    <div className="container py-8 md:overflow-hidden">
      <h1 className="text-xl font-bold">All Products</h1>
      <ProductsGrid
        products={products}
        isLoggedIn={Boolean(user)}
      />
    </div>
  )
}

const queryAllProduct = cache(async ({ locale }: { locale: TypedLocale }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    locale: locale,
    limit: 99,
  })

  return result.docs || []
})

import { verifySession } from '@/lib/session'
import type { BoProduct } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { cache } from 'react'
import ProductsGrid from '../../_components/ProductsGrid'
import { PageArgs } from '../[slug]/page'

export default async function Page({ params: paramsPromise }: PageArgs) {
  const { locale } = await paramsPromise
  const { user } = await verifySession()
  const products: BoProduct[] | [] = await queryAllProduct({
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
  const { docs: products } = await payload.find({
    collection: 'bo-products',
    locale: locale,
    limit: 99,
  })

  return products || []
})

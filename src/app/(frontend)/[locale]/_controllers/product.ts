import { Media, Product } from '@/payload-types'

const priceLocalString = (price: number) =>
  price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

export type ProductControllerType = {
  id: Product['id']
  name: Product['name']
  slug: Product['slug']
  sellingUnitType: 'unit' | 'box'
  images: Media | null
  onSale: Product['onSale']['unit']
  price: {
    raw: Product['price']['unit'] | Product['price']['box']
    formatted: string
  }
  salePrice: {
    raw: Product['salePrice']['unit'] | Product['salePrice']['box']
    formatted: string
  }
  salePercentage: Product['salePercentage']['unit']
}

export const productController = (product: Product): ProductControllerType => {
  const slug = `/products/${product.slug}`
  const sellingUnitType = product.sells.unit ? 'unit' : 'box'
  const images =
    typeof product.images?.[0]?.imagesUpload === 'object' ? product.images?.[0]?.imagesUpload : null

  return {
    id: product.id,
    name: product.name,
    slug: slug,
    sellingUnitType: sellingUnitType,
    images: images,
    onSale: product.onSale[sellingUnitType],
    price: {
      raw: product.price[sellingUnitType],
      formatted: priceLocalString(product.price[sellingUnitType]),
    },
    salePrice: {
      raw: product.salePrice[sellingUnitType],
      formatted: priceLocalString(product.salePrice[sellingUnitType]),
    },
    salePercentage: product.salePercentage[sellingUnitType],
  }
}

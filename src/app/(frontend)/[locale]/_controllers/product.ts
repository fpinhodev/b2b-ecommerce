import { Media, Product } from '@/payload-types'

export type ProductControllerType = {
  id: Product['id']
  name: Product['name']
  slug: Product['slug']
  sellingUnitType: 'unit' | 'box'
  images: Media | null
  onSale: Product['onSale']['unit']
  price: Product['price']['unit'] | Product['price']['box']
  salePrice: Product['salePrice']['unit'] | Product['salePrice']['box']
  pvp: Product['pvp']['unit'] | Product['pvp']['box']
  salePvp: Product['salePvp']['unit'] | Product['salePvp']['box']
  salePercentage: Product['salePercentage']['unit']
  stock: Product['stock']
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
    price: product.price[sellingUnitType],
    salePrice: product.salePrice[sellingUnitType],
    pvp: product.pvp[sellingUnitType],
    salePvp: product.salePvp[sellingUnitType],
    salePercentage: product.salePercentage[sellingUnitType],
    stock: product.stock,
  }
}

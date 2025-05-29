import gql from 'graphql-tag'
import { Media } from './media'

const ProductImages = gql`
  fragment ProductImages on BoProduct_Images {
    imagesUpload {
      ...Media
    }
  }
  ${Media}
`

export const Product = gql`
  fragment Product on BoProduct {
    id
    sku
    ean
    name
    slug
    description
    collection
    category
    subcategory
    sells
    onSale
    price
    salePrice
    salePercentage
    pvp
    salePvp
    stock
    itemsPerBox
    taxes
    images {
      ...ProductImages
    }
    updatedAt
    createdAt
  }
  ${ProductImages}
`

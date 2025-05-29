import { gql } from 'graphql-tag'
import { Product } from '../fragments/product'

export const GET_CART = gql`
  query ($userId: Float!) {
    Carts(where: { userId: { equals: $userId } }) {
      docs {
        id
        userId
        items {
          product {
            ...Product
          }
          quantity
        }
      }
    }
  }
  ${Product}
`

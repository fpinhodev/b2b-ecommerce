'use server'
import { GET_CART } from '@/app/(frontend)/[locale]/_graphql/queries/cart'
import graphqlRequest from '@/app/(frontend)/[locale]/_graphql/request'
import { Cart } from '@/payload-types'

const getCartItems = async (userId: number): Promise<Cart['items']> => {
  const { data } = await graphqlRequest.payload<{ docs: Cart[] }>(GET_CART, {
    userId: userId,
  })
  return data?.docs[0]?.items ?? []
}

export default getCartItems

'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

const getCartItems = cache(async (userId: number) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: cartItems } = await payload.find({
    collection: 'cart',
    where: {
      userId: {
        equals: userId,
      },
    },
  })
  return (
    cartItems[0].items?.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    })) ?? []
  )
})

export default getCartItems

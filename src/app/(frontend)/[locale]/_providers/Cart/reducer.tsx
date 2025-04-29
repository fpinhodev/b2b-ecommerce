import { Product } from '@/payload-types'
import { CartReducerProps } from './types'

export const cartReducer: CartReducerProps = {
  add: (currentCart, newItem) => {
    if (!newItem || !newItem.product) return currentCart

    const productId = (newItem.product as Product)?.id
    const indexInCart =
      currentCart?.findIndex(({ product }) => (product as Product)?.id === productId) || 0

    const withAddedItem = [...(currentCart || [])]

    if (indexInCart === -1) {
      // Add new item if it doesn't exist
      withAddedItem.push(newItem)
    } else {
      // Update quantity if item exists
      withAddedItem[indexInCart] = {
        ...withAddedItem[indexInCart],
        quantity: (withAddedItem[indexInCart].quantity || 0) + (newItem.quantity || 1),
      }
    }

    return withAddedItem
  },
  delete: (currentCart, productIdDelete) => {
    if (!productIdDelete) return currentCart

    return currentCart?.filter(
      ({ product }) =>
        typeof product === 'object' && String(product.id) !== String(productIdDelete),
    )
  },
  update: (currentCart, productId, quantity) => {
    if (!productId) return currentCart

    return currentCart?.map((item) => ({
      ...item,
      quantity: (item.product as Product).id === productId ? quantity : item.quantity,
    }))
  },
  clear: () => {
    return []
  },
}

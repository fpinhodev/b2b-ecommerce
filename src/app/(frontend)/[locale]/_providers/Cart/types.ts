import { Cart } from '@/payload-types'

export type CartItems = Cart['items']
export type CartProduct = NonNullable<Cart['items']>[number]
export type CartReducerProps = {
  add: (currentCart: CartItems, newItem: CartProduct) => CartItems
  delete: (currentCart: CartItems, productIdDelete: number) => CartItems
  update: (currentCart: CartItems, productId: number, quantity: number) => CartItems
  clear: () => []
}
export type CartContext = {
  isLoading: boolean
  optimisticCart: CartItems
  addItemToCart: (newItem: CartProduct, redirectToCart?: boolean) => Promise<void>
  deleteItemFromCart: (productIdDelete: number) => Promise<void>
  updateItemQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  cartSummary: CartSummaryProps
}

export type CartSummaryProps = {
  total: {
    formatted: string
    raw: number
  }
  subtotal: {
    formatted: string
    raw: number
  }
  shipping: {
    formatted: string
    raw: number
  }
  tax: {
    formatted: string
    raw: number
  }
}

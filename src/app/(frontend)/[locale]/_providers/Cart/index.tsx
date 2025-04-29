'use client'

import { Product } from '@/payload-types'
import React, {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useOptimistic,
  useState,
} from 'react'
import getCartItems from '../../(pages)/(checkout)/cart/server/get-cart-items'
import { updateCartItems } from '../../(pages)/(checkout)/cart/server/update-cart-items'
import { useToast } from '../../_hooks/use-toast'
import { SessionToken } from '../../_utils/verifySessionToken'
import { cartReducer } from './reducer'
import { CartContext, CartItems, CartProduct, CartSummaryProps } from './types'

// Flatten cart to store IDs rather than full product objects
const flattenedCart = (cart: CartItems): CartItems =>
  cart?.map((item) => ({
    product: typeof item.product === 'object' ? item.product.id : 0,
    quantity: item.quantity,
  })) as CartItems

// Get cart from localStorage
const getCartFromLocalStorage = async () => {
  if (typeof window !== 'undefined') {
    const localCart = localStorage?.getItem('cart')
    const parsedCart = JSON.parse(localCart || '[]')
    return localCart ? parsedCart : null
  }
}

// Set cart to localStorage
const setCartToLocalStorage = (cart: CartItems) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

const Context = createContext({} as CartContext)
export const useCart = () => useContext(Context)

export const CartProvider = ({
  user,
  children,
}: {
  user: SessionToken
  children: React.ReactNode
}) => {
  const { toast } = useToast()
  const [cart, setCart] = useState<CartItems>([])
  const [hasInitializedUserCart, setHasInitializedUserCart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [optimisticCart, setOptimisticCart] = useOptimistic<CartItems>(cart)
  const [cartSummary, setCartSummary] = useState<CartSummaryProps>({
    total: {
      formatted: '0.00',
      raw: 0,
    },
    subtotal: {
      formatted: '0.00',
      raw: 0,
    },
    shipping: {
      formatted: '0.00',
      raw: 0,
    },
    tax: {
      formatted: '0.00',
      raw: 0,
    },
  })

  // console.log('USER', user)
  // console.log('CART', cart)
  // console.log('OPTIMISTIC CART', optimisticCart)

  /*
  useEffect(() => {
    if (hasInitializedCart) return
    console.log('GET CART FROM LOCAL STORAGE')
    const initializeCart = async () => {
      const localCart = await getCartFromLocalStorage()
      if (!localCart || (!cart.length && !localCart.length)) return
      setCart(localCart)
      setHasInitializedCart(true)
    }
    initializeCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  */

  useEffect(() => {
    if (user && !hasInitializedUserCart) {
      console.log('GET USER CART FROM BD')
      const getUserCart = async () => {
        const cartItems = await getCartItems(user.id)
        // setCartToLocalStorage(cartItems)
        setCart(cartItems)
        setHasInitializedUserCart(true)
        setIsLoading(false)
      }
      getUserCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Update cart summary when cart changes
  useEffect(() => {
    if (!optimisticCart) return

    const newTotal =
      optimisticCart?.reduce((acc, { product, quantity }) => {
        return acc + (product as Product).price.unit * quantity
      }, 0) || 0

    setCartSummary((prevState) => ({
      ...prevState,
      total: {
        formatted: newTotal.toLocaleString('en-US', {
          style: 'currency',
          currency: 'EUR',
        }),
        raw: newTotal,
      },
    }))
  }, [user, optimisticCart])

  // Add item to cart with optimistic update
  const addItemToCart = useCallback(
    async (newItem: CartProduct) => {
      if (!user) return
      console.log('ADD ITEM TO CART', newItem)
      const currentCart = [...(cart || [])]
      const cartUpdated = cartReducer.add(currentCart, newItem)

      startTransition(() => setOptimisticCart(cartUpdated))
      // setCartToLocalStorage(cartUpdated)

      // If user is logged in, sync to server
      const { success, message } = await updateCartItems(user.id, flattenedCart(cartUpdated))

      if (success) {
        setCart(cartUpdated)
        toast({
          description: message,
        })
      } else {
        // Rollback optimistic update if server sync fails
        startTransition(() => setOptimisticCart(currentCart))
        // setCartToLocalStorage(currentCart)
        toast({
          description: message,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, cart],
  )

  // Delete item from cart with optimistic update
  const deleteItemFromCart = useCallback(
    async (productIdDelete: number) => {
      if (!user) return
      console.log('DELETE ITEM TO CART', productIdDelete)

      const currentCart = [...(cart || [])]
      const cartUpdated = cartReducer.delete(currentCart, productIdDelete)

      startTransition(() => setOptimisticCart(cartUpdated))

      // If user is logged in, sync to server
      const { success, message } = await updateCartItems(user.id, flattenedCart(cartUpdated))

      if (success) {
        setCart(cartUpdated)
        toast({
          description: message,
        })
      } else {
        // Rollback optimistic update if server sync fails
        startTransition(() => setOptimisticCart(currentCart))
        // setCartToLocalStorage(currentCart)
        toast({
          description: message,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, cart],
  )

  // Update item quantity with optimistic update
  const updateItemQuantity = useCallback(
    async (productId: number, quantity: number) => {
      if (!user) return

      const currentCart = [...(cart || [])]
      const cartUpdated = cartReducer.update(currentCart, productId, quantity)

      startTransition(() => setOptimisticCart(cartUpdated))

      // If user is logged in, sync to server
      const { success, message } = await updateCartItems(user.id, flattenedCart(cartUpdated))

      if (success) {
        setCart(cartUpdated)
      } else {
        // Rollback optimistic update if server sync fails
        startTransition(() => setOptimisticCart(currentCart))
        // setCartToLocalStorage(currentCart)
        toast({
          description: message,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, cart],
  )

  // Clear cart
  const clearCart = useCallback(
    async () => {
      if (!user) return
      console.log('CLEAR CART')

      const currentCart = [...(cart || [])]
      const cartUpdated = cartReducer.clear()

      startTransition(() => setOptimisticCart(cartUpdated))

      // If user is logged in, sync to server
      const { success, message } = await updateCartItems(user.id, flattenedCart(cartUpdated))

      if (success) {
        setCart(cartUpdated)
        toast({
          description: message,
        })
      } else {
        // Rollback optimistic update if server sync fails
        startTransition(() => setOptimisticCart(currentCart))
        // setCartToLocalStorage(currentCart)
        toast({
          description: message,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, cart],
  )

  return (
    <Context.Provider
      value={{
        isLoading,
        optimisticCart,
        addItemToCart,
        deleteItemFromCart,
        updateItemQuantity,
        clearCart,
        cartSummary,
      }}
    >
      {children}
    </Context.Provider>
  )
}

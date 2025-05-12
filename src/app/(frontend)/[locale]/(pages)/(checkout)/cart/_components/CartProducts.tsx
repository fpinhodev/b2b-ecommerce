'use client'

import { Button } from '@/app/(frontend)/[locale]/_components/ui/button'
import { productController } from '@/app/(frontend)/[locale]/_controllers/product'
import { Link } from '@/i18n/routing'
import { Trash2 } from 'lucide-react'
import { useCart } from '../../../../_providers/Cart'
import { CartItem } from './CartItem'

export const CartProducts = () => {
  const { isLoading, optimisticCart, clearCart } = useCart()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!optimisticCart || !optimisticCart.length) {
    return (
      <>
        <p>Your cart is empty.</p>
        <Button
          type="button"
          className="mt-4"
        >
          <Link href="/products">Continue shopping</Link>
        </Button>
      </>
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {optimisticCart.map(({ product, quantity }, index) =>
          typeof product === 'object' ? (
            <CartItem
              key={index}
              product={productController(product)}
              quantity={quantity}
            />
          ) : null,
        )}
      </div>

      <div className="mt-8 flex items-center justify-end gap-4 border-t pt-8">
        <Button
          type="button"
          onClick={() => clearCart()}
          variant="outline"
          size="sm"
        >
          <Trash2 size={16} /> Clear Cart
        </Button>
      </div>
    </div>
  )
}

'use client'

import { Link } from '@/i18n/routing'
import { ShoppingCart } from 'lucide-react'
import { useMemo } from 'react'
import { useCart } from '../../../_providers/Cart'
import './style.scss'

export const CartBadge = () => {
  const { optimisticCart } = useCart()

  // Calculate total quantity of items in cart
  const itemCount = useMemo(() => {
    if (!optimisticCart || !optimisticCart.length) return 0
    return optimisticCart?.reduce((acc, item) => acc + item.quantity, 0)
  }, [optimisticCart])

  return (
    <Link href="/cart" className="cartLink">
      <div className="cartIcon">
        <ShoppingCart size={24} />
        {itemCount > 0 && <span className="cartBadge">{itemCount > 99 ? '99+' : itemCount}</span>}
      </div>
    </Link>
  )
}

export default CartBadge

'use client'

import { Product } from '@/payload-types'
import cn from '@/utils/tailwindMerge'
import React from 'react'
import { useCart } from '../../_providers/Cart'
import { Button } from '../ui/button'

export const AddCartButton: React.FC<{
  product: Product
  quantity?: number
  className?: string
}> = ({ product, quantity = 1, className }) => {
  const { addItemToCart } = useCart()

  return (
    <Button
      type="button"
      className={cn('w-full', className)}
      onClick={() =>
        addItemToCart({
          product,
          quantity,
        })
      }
      // disabled={isLoading[product.id]}
    >
      Add to cart
      {/* {isLoading[product.id] ? (
        <>
          <Loader2 className="animate-spin" />
          Adding...
        </>
      ) : (
        'Add to cart'
      )} */}
    </Button>
  )
}

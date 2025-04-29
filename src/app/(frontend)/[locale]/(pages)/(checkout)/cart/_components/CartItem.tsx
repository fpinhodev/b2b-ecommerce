'use client'

import Media from '@/app/(frontend)/[locale]/_components/Media'
import Price from '@/app/(frontend)/[locale]/_components/Price'
import Quantity from '@/app/(frontend)/[locale]/_components/Quantity'
import { Button } from '@/app/(frontend)/[locale]/_components/ui/button'
import { ProductControllerType } from '@/app/(frontend)/[locale]/_controllers/product'
import { useCart } from '@/app/(frontend)/[locale]/_providers/Cart'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const CartItem = ({
  product: { id, name, slug, images, price, onSale, salePrice, salePercentage },
  quantity,
}: {
  product: ProductControllerType
  quantity: number
}) => {
  const { updateItemQuantity, deleteItemFromCart } = useCart()
  const [productQuantity, setProductQuantity] = useState(quantity)

  useEffect(() => {
    if (productQuantity !== quantity) {
      updateItemQuantity(id, productQuantity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productQuantity, quantity])

  return (
    <div className="flex items-center justify-between gap-14">
      <Link
        href={slug}
        className="relative h-[160px] w-[160px] rounded"
      >
        <Media
          resource={images}
          fill
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority
        />
      </Link>

      <Link
        href={slug}
        className="font-medium hover:underline"
      >
        <h6>{name}</h6>
      </Link>

      <div className="flex flex-col gap-1">
        <span className="text-xs">Unit price</span>
        <Price
          onSale={onSale}
          price={price}
          salePrice={salePrice}
          salePercentage={salePercentage}
        />
      </div>

      <Quantity
        defaultValue={productQuantity}
        min={1}
        onChange={setProductQuantity}
      />

      <div className="flex flex-col gap-1">
        <span className="text-xs">Total</span>
        <Price
          price={price}
          quantity={productQuantity}
        />
      </div>

      <Button
        type="button"
        variant="link"
        onClick={() => deleteItemFromCart(id)}
        className="text-sm text-destructive"
        // disabled={isLoading}
      >
        Remove
      </Button>
    </div>
  )
}

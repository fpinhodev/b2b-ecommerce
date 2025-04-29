'use client'

import { useCart } from '@/app/(frontend)/[locale]/_providers/Cart'
import { Link } from '@/i18n/routing'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Button } from '../../_components/ui/button'

export const CheckoutSummary = () => {
  const segment = useSelectedLayoutSegment()
  const isCart = segment === 'cart'
  const isShipping = segment === 'shipping'
  const isPayment = segment === 'payment'
  const { cartSummary, optimisticCart } = useCart()

  if (!optimisticCart || !optimisticCart.length) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded border p-5 shadow-sm">
        <h5 className="text-center font-bold">Summary</h5>
        <div className="flex justify-between gap-2">
          <span>Subtotal</span>
          <span>{cartSummary.subtotal.formatted}</span>
        </div>
        <div className="flex justify-between gap-2">
          <span>Shipping</span>
          <span>{cartSummary.shipping.formatted}</span>
        </div>
        <div className="flex justify-between gap-2 text-lg font-bold">
          <span className="">Total</span>
          <span className="">{cartSummary.total.formatted}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {(isShipping || isPayment) && (
          <Button variant={'outline'}>
            <Link href={isShipping ? '/cart' : '/shipping'} className="w-full">
              {isShipping ? 'Back to Cart' : 'Back to Shipping'}
            </Link>
          </Button>
        )}
        {(isCart || isShipping) && (
          <Button>
            <Link href={isCart ? '/shipping' : '/payment'} className="w-full">
              {isCart ? 'Got to Shipping' : 'Got to Payment'}
            </Link>
          </Button>
        )}
        {isPayment && <Button>Proceed to payment</Button>}
      </div>
    </div>
  )
}

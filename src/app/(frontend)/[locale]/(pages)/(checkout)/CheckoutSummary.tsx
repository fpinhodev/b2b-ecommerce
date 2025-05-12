'use client'

import { useCart } from '@/app/(frontend)/[locale]/_providers/Cart'
import { Link } from '@/i18n/routing'
import cn from '@/utils/tailwindMerge'
import { useSelectedLayoutSegment } from 'next/navigation'
import CurrencyFormat from '../../_components/CurrencyFormat'
import { Button } from '../../_components/ui/button'

export const CheckoutSummary = () => {
  const segment = useSelectedLayoutSegment()
  const isCart = segment === 'cart'
  const isShipping = segment === 'shipping'
  const isPayment = segment === 'payment'
  const { cartSummary, optimisticCart } = useCart()

  const cartSummaryObject = [
    {
      title: 'Shipping',
      value: cartSummary.shipping,
    },
    {
      title: 'Discount',
      value: cartSummary.discount,
    },
    {
      title: 'Taxes',
      value: cartSummary.taxes,
    },
    {
      title: 'Subtotal',
      value: cartSummary.subtotal,
    },
    {
      title: 'Total',
      value: cartSummary.total,
    },
  ]

  if (!optimisticCart || !optimisticCart.length) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded border p-5 shadow-sm">
        <h5 className="text-center font-bold">Summary</h5>
        {cartSummaryObject.map(({ title, value }, index, array) => (
          <div
            key={`cartSummary-${index}`}
            className={cn(
              'flex justify-between gap-2',
              index === array.length - 1 && 'text-lg font-bold', // styling total
            )}
          >
            <span>{title}</span>
            <span>{typeof value === 'number' && <CurrencyFormat value={value} />}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {(isShipping || isPayment) && (
          <Button variant={'outline'}>
            <Link
              href={isShipping ? '/cart' : '/shipping'}
              className="w-full"
            >
              {isShipping ? 'Back to Cart' : 'Back to Shipping'}
            </Link>
          </Button>
        )}
        {isCart || isShipping ? (
          <Button>
            <Link
              href={isCart ? '/shipping' : '/payment'}
              className="w-full"
            >
              {isCart ? 'Got to Shipping' : 'Got to Payment'}
            </Link>
          </Button>
        ) : (
          <Button>Proceed to payment</Button>
        )}
      </div>
    </div>
  )
}

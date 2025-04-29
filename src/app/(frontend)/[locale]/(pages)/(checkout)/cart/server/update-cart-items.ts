'use server'

import { CartItems } from '@/app/(frontend)/[locale]/_providers/Cart/types'
import fetcher from '@/app/(frontend)/[locale]/_utils/fetcher'

export async function updateCartItems(
  userId: number,
  flattenedItems: CartItems,
): Promise<{ success: boolean; message?: string }> {
  const { errors }: { message: string; errors: string } = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart?where[userId][equals]=${userId}`,
    'PATCH',
    {},
    JSON.stringify({
      items: flattenedItems,
    }),
  )

  // If there are errors, return them
  if (errors.length) {
    console.error('Failed to update cart items:', errors)
    return {
      message: 'There was an error updating cart items',
      success: false,
    }
  }

  return { message: 'Product updated successfully', success: true }
}

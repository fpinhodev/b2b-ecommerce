'use server'

import { UsersAddress } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import fetcher from '../_utils/fetcher'

interface DeleteAddressResponse {
  message?: string
  doc?: UsersAddress
}

type DeleteAddressPromise = DeleteAddressResponse & {
  success: boolean
}

export async function deleteAddress(id: UsersAddress['id']): Promise<DeleteAddressPromise> {
  // Call the logout endpoint
  const { message }: DeleteAddressResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users-addresses/${id}`,
    'DELETE',
  )

  revalidateTag('user-addresses')

  return { success: true, message }
}

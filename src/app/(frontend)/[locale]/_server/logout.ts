'use server'

import { cookies } from 'next/headers'
import fetcher from '../_utils/fetcher'

export type LogoutResponse = {
  errors?: { message: string }[]
  message?: string
}

export async function logout(): Promise<LogoutResponse> {
  const cookieStore = await cookies()
  const payloadToken = cookieStore.get('payload-token')?.value

  // Call the logout endpoint
  const { errors, message }: LogoutResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
    'POST',
    {
      'Content-Type': 'application/json',
      cookie: `payload-token=${payloadToken};`,
    },
  )

  // If there are errors, return them
  if (errors) {
    return { errors }
  }

  // Remove the token from the cookie store
  cookieStore.delete('payload-token')

  return { message }
}

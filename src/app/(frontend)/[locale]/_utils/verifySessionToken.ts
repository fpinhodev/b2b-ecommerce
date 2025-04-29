import type { User } from '@/payload-types'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'

export type SessionToken = Pick<User, 'id' | 'roles'> | undefined

const verifySessionToken = cache(async (): Promise<{ isLogged: boolean; user?: SessionToken }> => {
  const payloadToken = (await cookies()).get('payload-token')?.value
  let isLogged: boolean = false
  let user: SessionToken = undefined

  if (!payloadToken) return { isLogged }

  // Get the secret key from the environment variables
  const secretKey = process.env.AUTH_SECRET
  // Encode the secret key
  const encodedKey = new TextEncoder().encode(secretKey)

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify<SessionToken>(payloadToken, encodedKey)
    isLogged = Boolean(payload)
    user = {
      id: payload.id,
      roles: payload.roles,
    }
  } catch (error) {
    console.error(error)
  }

  return { isLogged, user }
})

export default verifySessionToken

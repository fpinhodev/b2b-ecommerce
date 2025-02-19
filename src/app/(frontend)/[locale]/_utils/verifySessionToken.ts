import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'

const verifySessionToken = cache(async (): Promise<boolean> => {
  const payloadToken = (await cookies()).get('payload-token')?.value
  let isLogged = false

  if (!payloadToken) return isLogged

  // Get the secret key from the environment variables
  const secretKey = process.env.AUTH_SECRET
  // Encode the secret key
  const encodedKey = new TextEncoder().encode(secretKey)

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(payloadToken, encodedKey)
    isLogged = Boolean(payload)
  } catch (error) {
    console.error(error)
  }

  return isLogged
})

export default verifySessionToken

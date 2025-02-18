import { jwtVerify } from 'jose'

export default async function verifySessionToken(payloadToken: string): Promise<boolean> {
  const secretKey = process.env.AUTH_SECRET
  // Encode the secret key
  const encodedKey = new TextEncoder().encode(secretKey)
  let isLogged = false

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(payloadToken, encodedKey)
    isLogged = Boolean(payload)
  } catch (error) {
    console.error(error)
  }

  return isLogged
}

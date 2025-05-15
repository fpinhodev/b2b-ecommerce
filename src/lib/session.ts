import { LoginResponse } from '@/app/(frontend)/[locale]/_graphql/types'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'

type SessionPayload = Pick<LoginResponse['login'], 'id' | 'role' | 'tokenExpiration'>

export type SessionResponse = {
  isLogged: boolean
  user: Pick<LoginResponse['login'], 'id' | 'role'> | null
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
const SESSION_TOKEN = 'session-token'

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session', error)
  }
}

export async function createSession({ id, role, tokenExpiration }: SessionPayload) {
  const session = await encrypt({ id, role, tokenExpiration })
  const cookieStore = await cookies()

  cookieStore.set(SESSION_TOKEN, session, {
    httpOnly: true,
    secure: true,
    maxAge: tokenExpiration,
    sameSite: 'strict',
    path: '/',
  })
}

export const verifySession = cache(async (): Promise<SessionResponse> => {
  const sessionToken = (await cookies()).get(SESSION_TOKEN)?.value
  if (!sessionToken) return { isLogged: false, user: null }

  const payload = await decrypt(sessionToken)
  if (!payload) return { isLogged: false, user: null }

  const { id, role } = payload as SessionPayload

  return {
    isLogged: true,
    user: {
      id,
      role,
    },
  }
})

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_TOKEN)
}

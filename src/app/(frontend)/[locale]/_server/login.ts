'use server'

import fetcher from '@/app/(frontend)/[locale]/_utils/fetcher'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { Collection, getPayload } from 'payload'
import { LoginSchema } from '../_utils/zodSchemas'
import { User } from '@/payload-types'

type FormState =
  | {
      fieldErrors?: {
        email?: string[]
        password?: string[]
      }
      fetchErrors?: {
        message?: string
      }[]
      message?: string
      user?: User | null
      success: boolean
    }
  | undefined

interface LoginResponse {
  errors?: {
    message?: string
  }[]
  message?: string
  user?: User | null
  token?: string
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = LoginSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { email, password } = validatedFields.data

  // Attempt to log in
  const { errors, message, token, user }: LoginResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
    'POST',
    {},
    JSON.stringify({
      email: email,
      password: password,
    }),
  )

  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  const payload = await getPayload({ config: configPromise })
  const usersCollection: Collection = payload.collections['users']
  const cookieStore = await cookies()
  const colectionCookies = usersCollection.config.auth.cookies

  cookieStore.set(`${payload.config.cookiePrefix}-token`, token!, {
    ...colectionCookies,
    sameSite: colectionCookies?.sameSite as 'strict' | 'lax' | 'none',
    maxAge: usersCollection.config.auth.tokenExpiration,
  })

  return { message, user, success: true }
}

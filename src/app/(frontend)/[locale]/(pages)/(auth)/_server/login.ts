'use server'

import { createSession } from '@/lib/session'
import { cookies } from 'next/headers'
import { LOGIN } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { FormState, Login } from '../../../_types'
import { LoginSchema } from '../../../_utils/zodSchemas'

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
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
  const { data, errors } = await graphqlRequest<Login>(LOGIN, {
    email,
    password,
  })

  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  const { id, role, token, tokenExpiration } = data as Login

  // Convert tokenExpiration from milliseconds to seconds
  const tokenExpirationInSeconds = tokenExpiration / 1000

  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: true,
    maxAge: tokenExpirationInSeconds,
    sameSite: 'strict',
    path: '/',
  })

  createSession({ id, role, tokenExpiration: tokenExpirationInSeconds })

  return { message: 'User successfully logged in', success: true }
}

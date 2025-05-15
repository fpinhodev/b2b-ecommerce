'use server'

import { createSession } from '@/lib/session'
import { User } from '@/payload-types'
import { type GraphQLResponse } from 'graphql-request'
import { cookies } from 'next/headers'
import { LOGIN } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { LoginResponse } from '../../../_graphql/types'
import { LoginSchema } from '../../../_utils/zodSchemas'

type FormState =
  | {
      fieldErrors?: {
        email?: string[]
        password?: string[]
      }
      fetchErrors?: GraphQLResponse['errors']
      message?: string
      user?: User | null
      success: boolean
    }
  | undefined

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
  const { data, errors } = await graphqlRequest<LoginResponse>(LOGIN, {
    email,
    password,
  })

  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  const {
    login: { id, role, token, tokenExpiration },
  } = data as LoginResponse

  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: true,
    maxAge: tokenExpiration,
    sameSite: 'strict',
    path: '/',
  })

  createSession({ id, role, tokenExpiration })

  return { message: 'User successfully logged in', success: true }
}

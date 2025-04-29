'use server'

import { User } from 'payload'
import { ResetPasswordSchema } from '../../../_utils/zodSchemas'
import fetcher from '../../../_utils/fetcher'

type FormState =
  | {
      fieldErrors?: {
        newPassword?: string[]
        token?: string[]
      }
      fetchErrors?: {
        message?: string
      }[]
      message?: string
      user?: User
      success: boolean
    }
  | undefined

interface ResetPasswordResponse {
  errors?: {
    message?: string
  }[]
  message?: string
  user?: User
}

export async function resetPassword(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = ResetPasswordSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { newPassword, token } = validatedFields.data

  // Call the logout endpoint
  const { errors, user, message }: ResetPasswordResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
    'POST',
    {},
    JSON.stringify({
      password: newPassword,
      token: token,
    }),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message, user, success: true }
}

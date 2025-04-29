'use server'

import fetcher from '../../../_utils/fetcher'
import { ForgotPasswordSchema } from '../../../_utils/zodSchemas'

type FormState =
  | {
      fieldErrors?: {
        email?: string[]
      }
      fetchErrors?: {
        message?: string
      }[]
      message?: string
      success: boolean
    }
  | undefined

interface ForgotPasswordResponse {
  errors?: {
    message?: string
  }[]
  message?: string
}

export async function forgotPassword(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = ForgotPasswordSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { email } = validatedFields.data

  // Call the logout endpoint
  const { errors, message }: ForgotPasswordResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
    'POST',
    {},
    JSON.stringify({
      email: email,
    }),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message, success: true }
}

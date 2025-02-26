'use server'

import { z } from 'zod'
import fetcher from '../_utils/fetcher'

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
})

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
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
  })

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
    {
      'Content-Type': 'application/json',
    },
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

'use server'

import { User } from 'payload'
import { z } from 'zod'
import fetcher from '../_utils/fetcher'

const LoginFormSchema = z.object({
  token: z
    .string()
    .length(40, { message: 'Must be exactly 40 characters long' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Contain only letters and numbers.' })
    .trim(),
  newPassword: z
    .string()
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .trim(),
})

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
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    newPassword: formData.get('newPassword'),
    token: formData.get('token'),
  })

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
    {
      'Content-Type': 'application/json',
    },
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

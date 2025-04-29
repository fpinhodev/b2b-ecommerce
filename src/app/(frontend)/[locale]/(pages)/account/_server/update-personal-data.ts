'use server'

import { User } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import { PersonalDataSchema } from '../../../_utils/zodSchemas'
import fetcher from '../../../_utils/fetcher'

type FormState =
  | {
      fieldErrors?: Record<string, string[]>
      fetchErrors?: {
        message?: string
      }[]
      message?: string
      user?: User
      success: boolean
    }
  | undefined

interface CreateAccountResponse {
  errors?: {
    message?: string
  }[]
  message?: string
  user?: User
  success: boolean
}

export async function updatePersonalData(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = PersonalDataSchema.safeParse({
    ...formDataObject,
    id: Number(formData.get('id')),
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // Call the logout endpoint
  const { errors, user, message }: CreateAccountResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${validatedFields.data.id}`,
    'PATCH',
    {},
    JSON.stringify(validatedFields.data),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  revalidateTag('personal-data')

  return { message, user, success: true }
}

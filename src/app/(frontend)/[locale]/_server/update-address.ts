'use server'

import { User } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import fetcher from '../_utils/fetcher'
import { UserAddressSchema } from '../_utils/zodSchemas'

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
  success: boolean
}

export async function updateUserData(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  const updatedFields = {
    id: Number(formData.get('id')),
    isDefault: formData.get('isDefault') === 'on' || formData.get('isDefault') === 'true',
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())

  //  If the form contains a firstName field, validate the personal data fields with the PersonalDataSchema if not validate the address fields with the UpdateAddressSchema
  const validatedFields = UserAddressSchema.safeParse({
    ...formDataObject,
    ...updatedFields,
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // Call the logout endpoint
  const { errors, message }: CreateAccountResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users-addresses/${validatedFields.data.id}`,
    'PATCH',
    {},
    JSON.stringify(validatedFields.data),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  revalidateTag('user-addresses')

  return { message, success: true }
}

'use server'

import { User } from '@/payload-types'
import fetcher from '../_utils/fetcher'
import { CreateAddressSchema } from '../_utils/zodSchemas'

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

export async function createAddress(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  // Get the isDefault value from the form data and convert it to a boolean
  const isDefaultValue = formData.get('isDefault')
  const isDefault = isDefaultValue === 'on' || isDefaultValue === 'true'

  const userAddressesValue = formData.get('userAddresses')
  const userAddressesArray = JSON.parse(userAddressesValue as string)
  const userId = formData.get('userId')

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())

  //  If the form contains a firstName field, validate the personal data fields with the PersonalDataSchema if not validate the address fields with the CreateAddressSchema
  const validatedFields = CreateAddressSchema.safeParse({ ...formDataObject, isDefault })
  delete formDataObject.userAddresses
  delete formDataObject.userId

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // Call the logout endpoint
  const { errors, user, message }: CreateAccountResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`,
    'PATCH',
    {},
    JSON.stringify({ addresses: [...userAddressesArray, validatedFields.data] }),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message, user, success: true }
}

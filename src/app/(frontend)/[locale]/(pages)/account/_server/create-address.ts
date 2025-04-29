'use server'

import { User, UsersAddress } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import fetcher from '../../../_utils/fetcher'
import { CreateAddressSchema } from '../../../_utils/zodSchemas'

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
  doc?: UsersAddress
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

  const userAddressesIds = JSON.parse(formData.get('userAddressesIds') as string)
  const updatedFields = {
    userId: Number(formData.get('userId')),
    isDefault: formData.get('isDefault') === 'on' || formData.get('isDefault') === 'true',
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())

  //  If the form contains a firstName field, validate the personal data fields with the PersonalDataSchema if not validate the address fields with the CreateAddressSchema
  const validatedFields = CreateAddressSchema.safeParse({ ...formDataObject, ...updatedFields })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // Create new address
  const { errors, message, doc }: CreateAccountResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users-addresses`,
    'POST',
    {},
    JSON.stringify({ ...validatedFields.data }),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  // If the address is created successfully, update the user addresses
  await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${validatedFields.data.userId}`,
    'PATCH',
    {},
    JSON.stringify({ addresses: [...userAddressesIds, doc?.id] }),
  )

  revalidateTag('user-addresses')

  return { message, success: true }
}

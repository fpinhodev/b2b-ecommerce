'use server'

import fetcher from '../_utils/fetcher'
import { CreateAccountSchema } from '../_utils/zodSchemas'
import { User } from '@/payload-types'

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

export async function createAccount(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      fetchErrors: [{ message: 'Invalid form data' }],
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = CreateAccountSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const createAccountData: Omit<User, 'id' | 'updatedAt' | 'createdAt'> = {
    ...validatedFields.data,
    roles: ['customer'],
    blockedAccount: false,
    customerDiscount: 0,
    erpId: 0,
    sellerId: 0,
    priceListId: '0',
    status: 'active',
  }

  // return { success: false }

  // Call the logout endpoint
  const { errors, user, message }: CreateAccountResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
    'POST',
    {},
    JSON.stringify(createAccountData),
  )

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message, user, success: true }
}

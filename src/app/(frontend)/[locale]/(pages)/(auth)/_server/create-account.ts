'use server'

import { REGISTER } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { FormState } from '../../../_types'
import { CreateAccountSchema } from '../../../_utils/zodSchemas'

export async function createAccount(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
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

  const { errors } = await graphqlRequest(REGISTER, {
    ...validatedFields.data,
  })

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message: 'User created successfully', success: true }
}

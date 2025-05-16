'use server'

import { UPDATE_ACCESS_DATA } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { FormState } from '../../../_types'
import { UpadateAccessDataSchema } from '../../../_utils/zodSchemas'

export async function updateAccessData(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = UpadateAccessDataSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { errors } = await graphqlRequest<{ success: boolean }>(UPDATE_ACCESS_DATA, {
    ...validatedFields.data,
  })

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message: 'Password updated successfully', success: true }
}

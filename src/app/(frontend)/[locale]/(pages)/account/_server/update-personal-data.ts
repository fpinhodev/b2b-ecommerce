'use server'

import { revalidateTag } from 'next/cache'
import { UPDATE_USER } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { FormState } from '../../../_types'
import { PersonalDataSchema } from '../../../_utils/zodSchemas'

export async function updatePersonalData(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
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

  const { errors } = await graphqlRequest(UPDATE_USER, validatedFields.data)

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  revalidateTag('personal-data')

  return { message: 'User updated successfully', success: true }
}

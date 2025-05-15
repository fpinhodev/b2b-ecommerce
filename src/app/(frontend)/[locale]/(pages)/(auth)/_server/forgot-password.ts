'use server'

import { FORGOT_PASSWORD } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { FormState } from '../../../_types'
import { ForgotPasswordSchema } from '../../../_utils/zodSchemas'

export async function forgotPassword(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = ForgotPasswordSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { email } = validatedFields.data

  await graphqlRequest<{ token: string }>(FORGOT_PASSWORD, {
    email,
  })

  return { success: true }
}

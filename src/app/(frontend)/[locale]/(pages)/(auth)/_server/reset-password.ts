'use server'

import { RESET_PASSWORD } from '../../../_graphql/mutations'
import graphqlRequest from '../../../_graphql/request'
import { FormState } from '../../../_types'
import { ResetPasswordSchema } from '../../../_utils/zodSchemas'

export async function resetPassword(state: FormState, formData: FormData): Promise<FormState> {
  // validate incoming data
  if (!(formData instanceof FormData)) {
    return {
      message: 'Invalid form data',
      success: false,
    }
  }

  // Validate form fields
  const formDataObject = Object.fromEntries(formData.entries())
  const validatedFields = ResetPasswordSchema.safeParse(formDataObject)

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { token, newPassword, newPasswordConfirmation } = validatedFields.data

  const { errors } = await graphqlRequest<{ success: boolean }>(RESET_PASSWORD, {
    token,
    password: newPassword,
    passwordConfirmation: newPasswordConfirmation,
  })

  // If there are errors, return them
  if (errors) {
    return { fetchErrors: errors, success: false }
  }

  return { message: 'Password updated successfully', success: true }
}

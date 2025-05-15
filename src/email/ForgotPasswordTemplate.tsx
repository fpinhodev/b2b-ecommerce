// import type { PayloadRequest, User } from 'payload'

import { Button, render, Text } from '@react-email/components'
import type { PayloadRequest, User } from 'payload'
import BaseTemplate from './BaseTemplate'
import { button } from './styles'

type ForgotPasswordTemplateArgs = {
  req: PayloadRequest
  token: string
  user: User
}

export const ForgotPasswordTemplate = async ({ token }: ForgotPasswordTemplateArgs) => {
  // // Use the token provided to allow your user to reset their password
  const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reset/${token}`
  return await render(
    <BaseTemplate>
      <Text>Click here to reset your password:</Text>
      <Button
        style={button}
        href={resetPasswordURL}
      >
        Reset Password
      </Button>
      <Text>If you did not request a password reset, please ignore this email.</Text>
      <Text>Thank you!</Text>
    </BaseTemplate>,
  )
}

export default ForgotPasswordTemplate

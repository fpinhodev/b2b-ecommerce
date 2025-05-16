import { gql } from 'graphql-request'

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      role
      token
      tokenExpiration
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation ($email: String!) {
    requestPasswordReset(data: { email: $email }) {
      token
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ($token: String!, $password: String!, $passwordConfirmation: String!) {
    resetPassword(
      data: { token: $token, password: $password, passwordConfirmation: $passwordConfirmation }
    ) {
      success
    }
  }
`

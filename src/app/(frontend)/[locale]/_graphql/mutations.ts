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

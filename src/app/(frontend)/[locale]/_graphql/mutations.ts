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

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

export const REGISTER = gql`
  mutation (
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
    $phoneNumber: String!
    $companyName: String!
    $taxNumber: String!
  ) {
    register(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        passwordConfirmation: $passwordConfirmation
        phoneNumber: $phoneNumber
        companyName: $companyName
        taxNumber: $taxNumber
      }
    ) {
      id
      email
    }
  }
`

export const UPDATE_ACCESS_DATA = gql`
  mutation ($oldPassword: String!, $newPassword: String!, $newPasswordConfirmation: String!) {
    updatePassword(
      data: {
        oldPassword: $oldPassword
        newPassword: $newPassword
        newPasswordConfirmation: $newPasswordConfirmation
      }
    ) {
      success
    }
  }
`

export const UPDATE_USER = gql`
  mutation (
    $id: Int!
    $email: String
    $firstName: String
    $lastName: String # $phoneNumber: String
  ) # $companyId: String # $taxNumber: String
  {
    updateUser(
      id: $id
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        # phoneNumber: $phoneNumber
        # companyId: $companyId
        # taxNumber: $taxNumber
      }
    ) {
      id
      email
      firstName
      lastName
      # phoneNumber
      # companyId
      # taxNumber
    }
  }
`

import gql from 'graphql-tag'

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
  mutation ($id: Int!, $email: String, $firstName: String, $lastName: String) {
    updateUser(id: $id, data: { email: $email, firstName: $firstName, lastName: $lastName }) {
      message
      success
    }
  }
`

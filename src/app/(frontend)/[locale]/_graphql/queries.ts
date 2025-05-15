import { gql } from 'graphql-request'

export const GET_USERS = gql`
  query {
    getUsers {
      id
      firstName
      lastName
      email
    }
  }
`

export const GET_USER = gql`
  query ($id: Int!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
    }
  }
`

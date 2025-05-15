import { GraphQLResponse } from 'graphql-request'

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
}

export type FormState =
  | {
      fieldErrors?: Record<string, string[]>
      fetchErrors?: GraphQLResponse['errors']
      message?: string
      success: boolean
    }
  | undefined

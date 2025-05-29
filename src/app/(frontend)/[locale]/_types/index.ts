import { GraphQLFormattedError } from 'graphql'

export type Login = {
  id: number
  role: string
  token: string
  tokenExpiration: number
}

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
  phoneNumber: string
  // companyId: number
  taxNumber: string
  blockedAccount?: boolean
  customerDiscount?: number
  erpId?: number
  sellerId?: number
  priceListId?: string
}

export type FormState =
  | {
      fieldErrors?: Record<string, string[]>
      fetchErrors?: GraphQLFormattedError[]
      message?: string
      success: boolean
    }
  | undefined

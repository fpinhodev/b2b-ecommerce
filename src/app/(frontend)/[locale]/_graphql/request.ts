import BoUsers from '@/app/(payload)/collections/Users'
import { print, type DocumentNode, type GraphQLFormattedError } from 'graphql'
import getAuthToken from '../_utils/getAuthToken'

type RequestResponse<T> = {
  errors?: GraphQLFormattedError[]
  data: T | null
}

const graphqlRequest = {
  default: async <T>(
    query: DocumentNode,
    variables?: Record<string, unknown>,
    cache?: RequestInit['cache'],
    next?: RequestInit['next'],
  ): Promise<RequestResponse<T>> => {
    const authToken = await getAuthToken()
    try {
      const response = await fetch(`${process.env.GRAPHQL_API_URL}/api/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: authToken } : {}),
          // Accept: 'application/graphql-response+json',
        },
        cache: cache ?? 'no-store',
        ...(next ? { next } : {}),
        body: JSON.stringify({
          query: print(query),
          ...(variables ? { variables } : {}),
        }),
      })

      const result: RequestResponse<T> = await response.json()

      if (!response.ok) throw `Network error: ${response.status} ${response.statusText}`

      // if (result?.errors) throw result.errors.map((error) => error.message).join('\n')

      return { ...result, data: result.data ? (Object.values(result.data)[0] as T) : null }
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  payload: async <T>(
    query: DocumentNode,
    variables?: Record<string, unknown>,
    cache?: RequestInit['cache'],
    next?: RequestInit['next'],
  ): Promise<RequestResponse<T>> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${BoUsers.slug} API-Key ${process.env.PAYLOAD_API_KEY}`,
        },
        cache: cache ?? 'no-store',
        ...(next ? { next } : {}),
        body: JSON.stringify({
          query: print(query),
          ...(variables ? { variables } : {}),
        }),
      })

      const result: RequestResponse<T> = await response.json()

      if (!response.ok) throw `Network error: ${response.status} ${response.statusText}`

      if (result?.errors) throw result.errors.map((error) => error.message).join('\n')

      return { ...result, data: result.data ? (Object.values(result.data)[0] as T) : null }
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default graphqlRequest

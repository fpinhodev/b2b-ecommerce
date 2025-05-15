import { type GraphQLResponse, Variables } from 'graphql-request'
import graphQLClient from './client'

const parseRequestError = (error: string) => {
  const jsonString = error.substring(error.indexOf('{')) // Extract the JSON part
  return JSON.parse(jsonString) // Parse the JSON string into an object
}

const graphqlRequest = async <T>(
  query: string,
  variables: Variables,
): Promise<GraphQLResponse<T>> => {
  try {
    const response = await graphQLClient.request<T>(query, variables)
    return {
      status: 200,
      data: response,
    }
  } catch (error) {
    const { response } = parseRequestError(String(error))
    if (response.status !== 200) throw 'An error occurred'
    return response
  }
}

export default graphqlRequest

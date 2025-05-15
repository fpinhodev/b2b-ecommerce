import { type GraphQLResponse, Variables } from 'graphql-request'
import getAuthToken from '../_utils/getAuthToken'
import graphQLClient from './client'

const parseRequestError = (error: string) => {
  const jsonString = error.substring(error.indexOf('{')) // Extract the JSON part
  return JSON.parse(jsonString) // Parse the JSON string into an object
}

const graphqlRequest = async <T>(
  query: string,
  variables: Variables,
  requestHeaders?: HeadersInit,
): Promise<GraphQLResponse<T>> => {
  if (!requestHeaders) {
    const authToken = await getAuthToken()
    if (authToken)
      requestHeaders = {
        authorization: authToken,
      }
  }

  try {
    const response = await graphQLClient.request<T>(query, variables, requestHeaders)
    let responseData: T | undefined = undefined
    // get only the first value of the response object
    // this is because the response is an object with the query name as key
    if (response) responseData = Object.values(response)[0] as T
    return {
      status: 200,
      data: responseData,
    }
  } catch (error) {
    const { response } = parseRequestError(String(error))
    if (response.status !== 200)
      throw 'An error occurred while processing your request from the server'
    return response
  }
}

export default graphqlRequest

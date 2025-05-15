import { GraphQLClient } from 'graphql-request'

const graphQLClient = new GraphQLClient(`${process.env.GRAPHQL_API_ENDPOINT}/api/graphql`)

export default graphQLClient

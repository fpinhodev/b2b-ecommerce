import 'server-only'
import { GET_USER } from '../../../_graphql/queries/user'
import graphqlRequest from '../../../_graphql/request'
import { User } from '../../../_types'

const getCachedPersonalData = async (userId: number): Promise<User | null> => {
  const { data } = await graphqlRequest.default<User>(
    GET_USER,
    {
      id: userId,
    },
    'force-cache',
    {
      tags: ['personal-data'],
    },
  )
  return data ?? null
}

export default getCachedPersonalData

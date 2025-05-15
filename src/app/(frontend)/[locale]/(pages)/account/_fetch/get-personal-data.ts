import { unstable_cache } from 'next/cache'
import 'server-only'
import { GET_USER } from '../../../_graphql/queries'
import graphqlRequest from '../../../_graphql/request'
import { User } from '../../../_types/user'

const getCachedPersonalData = unstable_cache(
  async (userId: number, authToken: string): Promise<User | null> => {
    const { data } = await graphqlRequest<User>(
      GET_USER,
      {
        id: userId,
      },
      {
        authorization: authToken,
      },
    )
    return data ?? null
  },
  ['personal-data'],
  {
    tags: ['personal-data'],
  },
)

export default getCachedPersonalData

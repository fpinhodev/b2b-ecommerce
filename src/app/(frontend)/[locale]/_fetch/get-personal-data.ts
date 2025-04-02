import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import 'server-only'
import { UserData } from '../_types/user'

const getCachedPersonalData = unstable_cache(
  async (userId: number): Promise<UserData> => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'users',
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
      where: {
        id: {
          equals: userId,
        },
      },
    })

    return docs[0]
  },
  ['personal-data'],
  {
    tags: ['personal-data'],
  },
)

export default getCachedPersonalData

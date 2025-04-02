import { UsersAddress } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import 'server-only'

const getCachedUserAddresses = unstable_cache(
  async (userId: number): Promise<UsersAddress[]> => {
    const payload = await getPayload({ config: configPromise })
    const { addresses } = await payload.findByID({
      collection: 'users',
      id: userId,
      select: {
        addresses: true,
      },
    })
    return Array.isArray(addresses) ? (addresses as UsersAddress[]) : []
  },
  ['user-addresses'],
  {
    tags: ['user-addresses'],
  },
)

export default getCachedUserAddresses

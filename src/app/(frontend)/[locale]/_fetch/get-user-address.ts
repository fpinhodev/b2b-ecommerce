import { User } from '@/payload-types'
import configPromise from '@payload-config'
import { equal } from 'assert'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import 'server-only'

const getUserAddress = unstable_cache(
  async (userId: number, addressId: string): Promise<User['addresses']> => {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'users',
      select: {
        addresses: true,
      },
      where: {
        'addresses.id': {
          equals: addressId,
        },
        // and: [
        //   {
        //     id: {
        //       equals: 5,
        //     },
        //   },
        //   {
        //     id: {
        //       equals: userId,
        //     },
        //   },
        // ],
      },
    })
    console.log('userAddresses 2', docs)

    return docs[0]?.addresses ?? []
  },
  ['user-address-'],
  {
    tags: ['user-address-'],
  },
)

export default getUserAddress

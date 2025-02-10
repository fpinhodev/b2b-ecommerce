import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Check if the slug is already in use
const slugAlreadyExists = async (slug: string, limit: number): Promise<boolean> => {
  const payload = await getPayload({ config: configPromise })
  const checkPages = await payload.find({
    collection: 'pages',
    draft: true,
    limit: limit,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return Boolean(checkPages.docs.length)
}

export default slugAlreadyExists

import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return page
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = async (collection: Collection, slug: string, depth: number) =>
  unstable_cache(async () => getDocument(collection, slug, depth), [collection, slug], {
    tags: [`${collection}_${slug}`],
  })()

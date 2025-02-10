import generatePathNames from '@/i18n/scripts/generatePathNames'
import { Page } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload, PaginatedDocs, PayloadRequest, TypedLocale } from 'payload'

export type GetPagesResult = Pick<Page, 'id'> & {
  slug: {
    [key in TypedLocale | string]?: string
  }
}

const getAllPages = async (req: Request): Promise<GetPagesResult[] | Response> => {
  const payload = await getPayload({ config: configPromise })
  let docs: PaginatedDocs | null = null
  let user = null

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // You can add additional checks here to see if the user is allowed to preview this page
  if (!user) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  try {
    docs = await payload.find({
      collection: 'pages',
      limit: 10,
      pagination: false,
      depth: 1,
      locale: 'all',
      select: {
        slug: true,
      },
    })

    if (!docs.docs.length) {
      return new Response('Document not found', { status: 404 })
    }
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  return docs.docs
}

export async function GET(req: Request) {
  const payload = await getPayload({ config: configPromise })
  const allPages = (await getAllPages(req)) as GetPagesResult[] | Response
  if (!(allPages instanceof Response) && allPages.length) {
    generatePathNames(payload, allPages)
  }

  return new Response('Next-intl pathnames generated successfully')
}

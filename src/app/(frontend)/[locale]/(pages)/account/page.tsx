import configPromise from '@payload-config'
import { headers as nextHeaders } from 'next/headers'
import { getPayload, TypedLocale } from 'payload'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = pages.docs
//     ?.filter((doc) => doc.slug !== 'home')
//     .map(({ slug }) => {
//       return { slug }
//     })

//   return params
// }

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function Page({ params: _paramsPromise }: Args) {
  const headers = await nextHeaders()
  const payload = await getPayload({ config: configPromise })
  const user = await payload.auth({ headers })
  // console.log('«« ACCOUNT USER »»', user)

  // if (!product) {
  //   notFound()
  // }

  return <article className="pt-16 pb-24">ACCOUNT</article>
}

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug: slugParam, locale } = await paramsPromise
//   const slug = slugParam ? slugParam : `home_${locale}`
//   const page = await queryPageBySlug({
//     slug,
//     locale,
//   })
//   return generateMeta({ doc: page })
// }

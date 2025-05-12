import { redirect } from '@/i18n/routing'
import { PageArgs } from '../../[slug]/page'
import verifySessionToken from '../../../_utils/verifySessionToken'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySessionToken()
  if (!user) return redirect({ href: '/login', locale })

  return (
    <>
      <h1 className="text-2xl font-bold">Shipping</h1>
      {/* <CartPage user={Boolean(user)} /> */}
    </>
  )
}

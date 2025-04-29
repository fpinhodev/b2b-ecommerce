import { redirect } from '@/i18n/routing'
import verifySessionToken from '../../../_utils/verifySessionToken'
import { PageArgs } from '../../[slug]/page'
import { CartProducts } from './_components/CartProducts'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySessionToken()
  if (!user) return redirect({ href: '/login', locale })

  return (
    <>
      <h1>Shopping Cart</h1>
      <div className="mt-12">
        <CartProducts />
      </div>
    </>
  )
}

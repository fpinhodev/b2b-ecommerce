import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { PageArgs } from '../../[slug]/page'
import { CartProducts } from './_components/CartProducts'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySession()
  if (!user) return redirect({ href: '/login', locale })

  return (
    <>
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <div className="mt-12">
        <CartProducts />
      </div>
    </>
  )
}

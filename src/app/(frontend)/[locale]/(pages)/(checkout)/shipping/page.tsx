import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { PageArgs } from '../../[slug]/page'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySession()
  if (!user) return redirect({ href: '/login', locale })

  return (
    <>
      <h1 className="text-2xl font-bold">Shipping</h1>
      {/* <CartPage user={Boolean(user)} /> */}
    </>
  )
}

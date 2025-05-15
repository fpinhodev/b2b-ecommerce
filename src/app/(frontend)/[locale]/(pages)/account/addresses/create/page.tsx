import getCachedUserAddresses from '@/app/(frontend)/[locale]/(pages)/account/_fetch/get-user-addresses'
import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { PageArgs } from '../../../[slug]/page'
import '../../index.scss'
import CreateAddressForm from './CreateAddressForm'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySession()
  if (!user) return redirect({ href: '/login', locale })

  const userAddresses = await getCachedUserAddresses(user.id)
  if (!userAddresses) return redirect({ href: '/account/addresses', locale: locale })

  return (
    <div className="flex flex-col gap-8">
      <h1>New Address</h1>
      <CreateAddressForm
        userId={user.id}
        userAddressesIds={JSON.stringify(userAddresses.map((address) => address.id))}
        locale={locale}
      />
    </div>
  )
}

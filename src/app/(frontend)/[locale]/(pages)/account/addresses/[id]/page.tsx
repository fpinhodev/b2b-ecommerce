import getCachedUserAddresses from '@/app/(frontend)/[locale]/_fetch/get-user-addresses'
import verifySessionToken from '@/app/(frontend)/[locale]/_utils/verifySessionToken'
import { redirect } from '@/i18n/routing'
import { User } from '@/payload-types'
import { PageArgs } from '../../../[slug]/page'
import '../../index.scss'
import UpdateAddressForm from './UpdateAddressForm'

export type UserData = Pick<User, 'firstName' | 'lastName' | 'phone'> & { id: string }

export default async function Page({ params }: PageArgs & { params: Promise<{ id: string }> }) {
  const { locale, id } = await params
  const { user } = await verifySessionToken()
  if (!user) return redirect({ href: '/login', locale })

  const userAddresses = await getCachedUserAddresses(user.id)
  if (!userAddresses) return redirect({ href: '/account/addresses', locale: locale })

  const addressToUpdate = userAddresses.find((address) => address.id.toString() === id)
  if (!addressToUpdate) return redirect({ href: '/account/addresses', locale: locale })

  return (
    <div className="flex flex-col gap-8">
      <h1>Update Address</h1>
      <UpdateAddressForm updateAddress={addressToUpdate} locale={locale} />
    </div>
  )
}

import { authenticationCheck } from '@/app/(frontend)/[locale]/_utils/authenticationCheck'
import { redirect } from '@/i18n/routing'
import { User } from '@/payload-types'
import { PageArgs } from '../../../[slug]/page'
import '../../index.scss'
import UpdateAddressForm from './UpdateAddressForm'

export type UserData = Pick<User, 'firstName' | 'lastName' | 'phone'> & { id: string }

export default async function Page({ params }: PageArgs & { params: Promise<{ id: string }> }) {
  const { locale, id } = await params
  const { user } = await authenticationCheck({ nullUserRedirect: '/login' })

  if (!user.addresses) return redirect({ href: '/account/addresses', locale: locale })

  const addressToUpdate = user.addresses.find((address) => address.id === id)
  if (!addressToUpdate) return redirect({ href: '/account/addresses', locale: locale })

  return (
    <div className="flex flex-col gap-8">
      <h1>Update Address</h1>
      <UpdateAddressForm
        userId={user.id}
        userAddresses={JSON.stringify(user.addresses)}
        updateAddress={addressToUpdate}
        locale={locale}
      />
    </div>
  )
}

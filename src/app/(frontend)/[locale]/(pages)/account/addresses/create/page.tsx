import { authenticationCheck } from '@/app/(frontend)/[locale]/_utils/authenticationCheck'
import { PageArgs } from '../../../[slug]/page'
import '../../index.scss'
import CreateAddressForm from './CreateAddressForm'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await authenticationCheck({ nullUserRedirect: '/login' })

  return (
    <div className="flex flex-col gap-8">
      <h1>New Address</h1>
      <CreateAddressForm
        userId={user.id}
        userAddresses={JSON.stringify(user.addresses)}
        locale={locale}
      />
    </div>
  )
}

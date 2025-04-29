import { Link, redirect } from '@/i18n/routing'
import { Button } from '../../../_components/ui/button'
import verifySessionToken from '../../../_utils/verifySessionToken'
import { PageArgs } from '../../[slug]/page'
import '../index.scss'
import AddressCard from './AddressCard'
import getCachedUserAddresses from '../_fetch/get-user-addresses'

export default async function Page({ params }: PageArgs) {
  const { locale } = await params
  const { user } = await verifySessionToken()
  if (!user) return redirect({ href: '/login', locale })

  const userAddresses = await getCachedUserAddresses(user.id)

  return (
    <div className="flex flex-col gap-8">
      <h1>Addresses</h1>
      {userAddresses?.length ? (
        <div className="grid grid-cols-2 gap-6">
          {userAddresses
            // Sort addresses by default (default first)
            .sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1))
            .map((address) => (
              <AddressCard key={address.id} {...address} />
            ))}
        </div>
      ) : (
        <p>No addresses found</p>
      )}
      <Button>
        <Link href="/account/addresses/create" className="w-full">
          Add new Address
        </Link>
      </Button>
    </div>
  )
}

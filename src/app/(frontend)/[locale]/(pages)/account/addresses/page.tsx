import { Link } from '@/i18n/routing'
import { Button } from '../../../_components/ui/button'
import '../index.scss'
import AddressCard from './AddressCard'
import { authenticationCheck } from '../../../_utils/authenticationCheck'

export default async function Page() {
  const { user } = await authenticationCheck({ nullUserRedirect: '/login' })

  return (
    <div className="flex flex-col gap-8">
      <h1>Addresses</h1>
      {user.addresses?.length ? (
        <div className="grid grid-cols-2 gap-6">
          {user.addresses
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

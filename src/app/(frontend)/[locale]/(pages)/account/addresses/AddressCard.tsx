import { Link } from '@/i18n/routing'
import { User } from '@/payload-types'
import React from 'react'
import { Button } from '../../../_components/ui/button'

const AddressCard: React.FC<NonNullable<User['addresses']>[number]> = ({
  id,
  isDefault,
  addressLine1,
  addressLine2,
  city,
  state,
  zipCode,
  country,
}) => {
  return (
    <div className="flex flex-col gap-1 bg-gray-100 p-6">
      {isDefault && <h2 className="mb-2 text-lg font-bold">Main Address</h2>}
      <p>
        <strong>Address</strong>
        <br></br>
        {`${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}`}
      </p>
      <p>
        <strong>City</strong>
        <br></br>
        {city}
      </p>
      <p>
        <strong>State</strong>
        <br></br>
        {state}
      </p>
      <p>
        <strong>Postal Code</strong>
        <br></br>
        {zipCode}
      </p>
      <p>
        <strong>Country</strong>
        <br></br>
        {country}
      </p>
      <Button className="mt-4" variant={'outline'}>
        <Link href="/account/addresses" as={`/account/addresses/${id}`} className="w-full">
          Update Address
        </Link>
      </Button>
    </div>
  )
}

export default AddressCard

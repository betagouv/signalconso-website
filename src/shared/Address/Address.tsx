import React from 'react'
import {Address} from '../../model'

interface Props {
  address: Address
}

export const AddressComponent = ({address}: Props) => {
  return (
    <span>
      {address.number}&nbsp;
      {address.street}&nbsp;
      {address.addressSupplement}
      <br />
      {address.postalCode}&nbsp;
      {address.city}
      {address.country && (
        <>
          <br />
          {address.country}
        </>
      )}
    </span>
  )
}

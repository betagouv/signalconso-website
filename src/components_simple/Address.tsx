import {Address} from 'model/Address'
import React from 'react'
import {countryLabel} from '../model/Country'
import {useI18n} from '../i18n/I18n'
import {useGetCountries} from '../clients/apiHooks'

interface Props {
  address: Address
}

export const AddressComponent = ({address}: Props) => {
  const {currentLang} = useI18n()
  const {data: countries} = useGetCountries()

  const country = countries?.find(_ => _.code === address.country)

  return (
    <span>
      {(address.number || address.street || address.addressSupplement) && (
        <>
          {address.number ? <>{address.number}&nbsp;</> : null}
          {address.street}&nbsp;
          {address.addressSupplement}
          <br />
        </>
      )}
      {address.postalCode}&nbsp;
      {address.city}
      {address.country && (
        <>
          <br />
          {country && countryLabel(currentLang, country)}
        </>
      )}
    </span>
  )
}

import {AdresseApiClient, City} from '@/clients/AdresseApiClient'
import {useApiClients} from '@/context/ApiClientsContext'
import {Departement, findDepartements} from '@/data/departments'
import {useStateWithThrottledCopy} from '@/hooks/useStateWithThrottledCopy'
import {useI18n} from '@/i18n/I18n'
import {isPartialPostalcode, isValidPostalcode} from '@/utils/utils'
import {useQuery} from '@tanstack/react-query'
import {ReactNode} from 'react'
import {ScAutoComplete} from './ScAutocomplete'

type GeoArea =
  | {
      kind: 'postcode'
      postalCode: string
      city?: string
    }
  | {
      kind: 'department'
      dpt: Departement
    }

// Autocomplete for either :
// - a departement (typed by number or name)
// - a postcode (typed by number or name of city)
export function ScAutocompleteGeoArea(props: {
  label: string
  onChange: (a: GeoArea) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
}) {
  const {m} = useI18n()
  const [query, setQuery, throttledQuery] = useStateWithThrottledCopy('')
  const adresseApiClient = useApiClients().adresseApiClient

  const _fetchOptions = useQuery<GeoArea[]>({
    queryKey: ['searchGeoArea', throttledQuery],
    queryFn: () => fetchOptions(adresseApiClient, throttledQuery),
  })

  const {onChange, ...otherProps} = props
  return (
    <ScAutoComplete<GeoArea>
      onChange={_ => onChange(_)}
      {...otherProps}
      {...{query, setQuery, optionsAreSame, optionKey, inputDisplayValue, optionRender}}
      desc={m.youCanSearchByCity}
      placeholder={m.yourPostalCodePlaceholder}
      options={_fetchOptions.data ?? []}
      hideNoResult={isPartialPostalcode(query)}
    />
  )
}

async function fetchOptions(adresseApiClient: AdresseApiClient, q: string): Promise<GeoArea[]> {
  const cities = await adresseApiClient.fetchCity(q)
  if (cities.find(_ => _.postcode === q.trim())) {
    return cities.map(cityToOption)
  }
  if (isValidPostalcode(q)) {
    return [{kind: 'postcode', postalCode: q}]
  }
  const departements = findDepartements(q)
  const res: GeoArea[] = [...departements.map(departementToOption), ...cities.map(cityToOption)]
  return res
}
function cityToOption(_: City): GeoArea {
  return {kind: 'postcode', postalCode: _.postcode, city: _.city}
}
function departementToOption(_: Departement): GeoArea {
  return {kind: 'department', dpt: _}
}
function optionsAreSame(a?: GeoArea, b?: GeoArea): boolean {
  if (a?.kind === 'department' && b?.kind === 'department') {
    return a.dpt.code === b.dpt.code
  }
  if (a?.kind === 'postcode' && b?.kind === 'postcode') {
    return a.postalCode === b.postalCode && a.city === b.city
  }
  return false
}
function optionKey(_: GeoArea): string {
  switch (_.kind) {
    case 'department':
      return _.dpt.code
    case 'postcode':
      return `${_.postalCode}_${_.city ?? ''}`
  }
}
function inputDisplayValue(_: GeoArea): string {
  switch (_.kind) {
    case 'department':
      return `${_.dpt.name} (${_.dpt.code})`
    case 'postcode':
      if (_.city) {
        return `${_.postalCode} ${_.city}`
      }
      return _.postalCode
  }
}
function optionRender(_: GeoArea): ReactNode {
  const number = _.kind === 'department' ? _.dpt.code : _.postalCode
  const name = _.kind === 'department' ? _.dpt.name : _.city

  return (
    <>
      <span className="text-black">{number}</span>
      {name && <> {name}</>}
    </>
  )
}

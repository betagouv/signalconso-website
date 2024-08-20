import {City} from '@/clients/AdresseApiClient'
import {useApiClients} from '@/context/ApiClientsContext'
import {Departement, findDepartements} from '@/data/departments'
import {useStateWithThrottledCopy} from '@/hooks/useStateWithThrottledCopy'
import {useI18n} from '@/i18n/I18n'
import {isPartialPostalcode, isValidPostalcode} from '@/utils/utils'
import {useQuery} from '@tanstack/react-query'
import {ReactNode} from 'react'
import {ScAutoComplete} from './ScAutocomplete'

type Option =
  | {
      kind: 'postcode'
      postalCode: string
      city?: string
    }
  | {
      kind: 'department'
      dpt: Departement
    }

function cityToOption(_: City): Option {
  return {kind: 'postcode', postalCode: _.postcode, city: _.city}
}
function departementToOption(_: Departement): Option {
  return {kind: 'department', dpt: _}
}
function optionsAreSame(a?: Option, b?: Option): boolean {
  if (a?.kind === 'department' && b?.kind === 'department') {
    return a.dpt.code === b.dpt.code
  }
  if (a?.kind === 'postcode' && b?.kind === 'postcode') {
    return a.postalCode === b.postalCode && a.city === b.city
  }
  return false
}
function optionKey(_: Option): string {
  switch (_.kind) {
    case 'department':
      return _.dpt.code
    case 'postcode':
      return `${_.postalCode}_${_.city ?? ''}`
  }
}
function inputDisplayValue(_: Option): string {
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
function optionRender(_: Option): ReactNode {
  switch (_.kind) {
    case 'department':
      return (
        <>
          {_.dpt.name} ({_.dpt.code ?? ''})
        </>
      )
    case 'postcode':
      return (
        <>
          <span className="text-gray-600">{_.postalCode}</span> {_.city ?? ''}
        </>
      )
  }
}

// Autocomplete for either :
// - a departement (typed by number or name)
// - a postcode (typed by number or name of city)
export function ScAutocompleteGeoArea(props: {
  label: string
  onChange: (a: Option) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
}) {
  const {m} = useI18n()
  const [query, setQuery, throttledQuery] = useStateWithThrottledCopy('')
  const adresseApiClient = useApiClients().adresseApiClient

  const _fetchOptions = useQuery<Option[]>({
    queryKey: ['searchGeoArea', throttledQuery],
    queryFn: async () => {
      const q = throttledQuery
      const cities = await adresseApiClient.fetchCity(q)
      if (cities.find(_ => _.postcode === q.trim())) {
        return cities.map(cityToOption)
      }
      if (isValidPostalcode(q)) {
        return [{kind: 'postcode', postalCode: q}]
      }
      const departements = findDepartements(q)
      const res: Option[] = [...cities.map(cityToOption), ...departements.map(departementToOption)]
      return res
    },
  })

  const {onChange, ...otherProps} = props
  return (
    <ScAutoComplete<Option>
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

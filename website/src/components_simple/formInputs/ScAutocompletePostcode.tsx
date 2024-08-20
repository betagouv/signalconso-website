import {useApiClients} from '@/context/ApiClientsContext'
import {useStateWithThrottledCopy} from '@/hooks/useStateWithThrottledCopy'
import {useI18n} from '@/i18n/I18n'
import {isPartialPostalcode, isValidPostalcode} from '@/utils/utils'
import {useQuery} from '@tanstack/react-query'
import {ScAutoComplete} from './ScAutocomplete'

type PostcodeOption = {
  postalCode: string
  city?: string
}

function buildDefaultOption(input: string) {
  return isValidPostalcode(input)
    ? [
        {
          city: '',
          postalCode: input,
        },
      ]
    : []
}

export function ScAutocompletePostcode(props: {
  label: string
  onChange: (a: string) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
}) {
  const {m} = useI18n()
  const [query, setQuery, throttledQuery] = useStateWithThrottledCopy('')
  const adresseApiClient = useApiClients().adresseApiClient
  const _fetchCity = useQuery({
    queryKey: ['fetchCity', throttledQuery],
    queryFn: () => adresseApiClient.fetchCity(throttledQuery),
  })

  function computeCityOptions(input: string): PostcodeOption[] {
    if (_fetchCity.data) {
      const cities = _fetchCity.data.map(({city, postcode}) => ({
        city,
        postalCode: postcode,
      }))
      if (cities.find(_ => _.postalCode == input.trim()) || !isValidPostalcode(input)) {
        return cities
      }
    }
    return buildDefaultOption(input)
  }

  const {onChange, ...otherProps} = props
  return (
    <ScAutoComplete<PostcodeOption>
      onChange={a => onChange(a.postalCode)}
      {...otherProps}
      {...{query, setQuery}}
      desc={m.youCanSearchByCity}
      placeholder={m.yourPostalCodePlaceholder}
      optionsAreSame={(a, b) => a?.city === b?.city && a?.postalCode === b?.postalCode}
      optionKey={a => `${a.postalCode}_${a.city}`}
      options={computeCityOptions(query)}
      inputDisplayValue={a => `${a.postalCode} ${a.city ?? ''}`}
      hideNoResult={isPartialPostalcode(query)}
      optionRender={a => (
        <>
          <span className="text-gray-600">{a.postalCode}</span> {a.city ?? ''}
        </>
      )}
    />
  )
}

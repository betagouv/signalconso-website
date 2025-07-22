import {useApiClients} from '@/context/ApiClientsContext'
import {useQuery} from '@tanstack/react-query'
import {ScAutoComplete} from '@/components_simple/formInputs/ScAutocomplete'
import {useStateWithThrottledCopy} from '@/hooks/useStateWithThrottledCopy'

interface Props {
  label: string
  onChange: (a: string | null) => void
  onBlur: () => void
  name: string
  error: boolean
  helperText?: string
  disabled?: boolean
  editable?: {
    onEdit: () => void
    label: string
  }
}

const identity = (_: any) => _

export const ScAutocompleteStation = (props: Props) => {
  const [query, setQuery, throttledQuery] = useStateWithThrottledCopy('')
  const stationApiClient = useApiClients().stationApiClient
  const _fetchStations = useQuery({
    queryKey: ['fetchStations', throttledQuery],
    queryFn: () => stationApiClient.fetchStations(throttledQuery),
  })

  function computeStationOptions(input: string) {
    return _fetchStations.data?.results.map(_ => _.nom) ?? [input]
  }

  return (
    <ScAutoComplete<string>
      {...props}
      {...{query, setQuery}}
      placeholder="EX: Lyon Part Dieu, Austerlitz, etc."
      optionKey={identity}
      optionsAreSame={(a, b) => a === b}
      options={computeStationOptions(query)}
      inputDisplayValue={identity}
      optionRender={identity}
    />
  )
}

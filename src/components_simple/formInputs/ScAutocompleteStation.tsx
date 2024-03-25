import {useEffect, useState} from 'react'
import {useThrottle} from '@/utils/useThrottle'
import {useApiClients} from '@/context/ApiClientsContext'
import {useQuery} from '@tanstack/react-query'
import {ScAutoComplete} from '@/components_simple/formInputs/ScAutocomplete'

function useStateWithThrottledCopy<A>(defaultValue: A): [A, React.Dispatch<React.SetStateAction<A>>, A] {
  const [state, setState] = useState(defaultValue)
  const [throttledCopy, setThrottledCopy] = useThrottle(state, 5)
  useEffect(() => {
    // always copy the first state into the second one
    // But since it's throttled, it will delay changes a bit
    setThrottledCopy(state)
  }, [state])
  // Return a normal version (to be used when displaying)
  // And a throttled copy (doesn't update as often, but it's useful to throttle API calls based on it)
  return [state, setState, throttledCopy]
}

interface Props {
  label: string
  onChange: (a: string) => void
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

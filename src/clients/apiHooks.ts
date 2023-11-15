import {useQuery} from '@tanstack/react-query'
import {useApiClients} from '@/context/ApiClientsContext'
import {useToastError} from '@/hooks/useToastError'
import {useEffect} from 'react'

const _1hourInMs = 3600 * 1000

export function useToastOnQueryError(useQueryResult: {error: unknown}) {
  const toastError = useToastError()
  const error = useQueryResult.error
  useEffect(() => {
    if (error) {
      console.error('Displayed query error in toast', error)
      toastError()
    }
  }, [error])
}

export function useGetCountries() {
  const {signalConsoApiClient} = useApiClients()
  const _countries = useQuery(['getCountries'], () => signalConsoApiClient.getCountries(), {staleTime: _1hourInMs})
  useToastOnQueryError(_countries)
  return _countries
}

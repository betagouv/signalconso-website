import {useApiClients} from 'context/ApiClientsContext'
import {useToast} from 'hooks/useToast'
import {ApiError} from 'next/dist/server/api-utils'
import {useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'

const _1hourInMs = 3600 * 1000

export function useToastOnQueryError(useQueryResult: {error: unknown}) {
  const {toastError} = useToast()
  const error = useQueryResult.error
  useEffect(() => {
    if (error) {
      console.error('Displayed query error in toast', error)
      toastError(error as ApiError)
    }
  }, [error])
}

export function useGetCountries() {
  const {signalConsoApiClient} = useApiClients()
  const _countries = useQuery(['getCountries'], () => signalConsoApiClient.getCountries(), {staleTime: _1hourInMs})
  useToastOnQueryError(_countries)
  return _countries
}

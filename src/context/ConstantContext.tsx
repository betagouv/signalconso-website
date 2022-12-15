import * as React from 'react'
import {ReactNode, useContext, useMemo} from 'react'
import {UseFetcher, useFetcher} from '../hooks/useFetcher'
import {useApiClients} from './ApiClientsContext'
import {SignalConsoApiClient} from '../clients/SignalConsoApiClient'
import {ApiError} from '../clients/BaseApiClient'

export interface ConstantContextProps {
  countries: UseFetcher<SignalConsoApiClient['getCountries'], ApiError>
}

interface Props {
  children: ReactNode
}

const defaultContext: Partial<ConstantContextProps> = {}

const ConstantContext = React.createContext<ConstantContextProps>(defaultContext as ConstantContextProps)

export const ConstantProvider = ({children}: Props) => {
  const {signalConsoApiClient} = useApiClients()
  const _countries = useFetcher(signalConsoApiClient.getCountries)
  return (
    <ConstantContext.Provider
      value={{
        countries: _countries,
      }}
    >
      {children}
    </ConstantContext.Provider>
  )
}

export const useConstantContext = (): ConstantContextProps => {
  return useContext<ConstantContextProps>(ConstantContext)
}

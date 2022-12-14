import * as React from 'react'
import {ReactNode, useContext, useMemo} from 'react'
import {UseFetcher, useFetcher} from '../../alexlibs/react-hooks-lib/UseFetcher'
import {useApiClients} from './ApiClientsContext'
import {SignalConsoApiClient} from '../../client/SignalConsoApiClient'
import {ApiError} from '../../client/BaseApiClient'

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

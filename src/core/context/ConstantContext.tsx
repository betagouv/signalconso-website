import * as React from 'react'
import {ReactNode, useContext, useMemo} from 'react'
import {UseFetcher, useFetcher} from '../../alexlibs/react-hooks-lib/UseFetcher'
import {useApiSdk} from './ApiSdk'
import {SignalConsoPublicSdk} from '../../client/SignalConsoPublicSdk'
import {ApiError} from '../../client/ApiClient'

export interface ConstantContextProps {
  countries: UseFetcher<SignalConsoPublicSdk['constant']['getCountries'], ApiError>
}

interface Props {
  children: ReactNode
}

const defaultContext: Partial<ConstantContextProps> = {}

const ConstantContext = React.createContext<ConstantContextProps>(defaultContext as ConstantContextProps)

export const ConstantProvider = ({children}: Props) => {
  const {apiSdk} = useApiSdk()
  const _countries = useFetcher(apiSdk.constant.getCountries)
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

import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {SignalConsoPublicSdk} from '@signal-conso/signalconso-api-sdk-js'
import {apiSdk} from '../apiSdk'

export interface ApiSdkProps {
  apiSdk: SignalConsoPublicSdk
}

interface Props {
  apiSdk?: SignalConsoPublicSdk
  children: ReactNode
}

const defaultContext: Partial<ApiSdkProps> = {}

const ApiSdk = React.createContext<ApiSdkProps>(defaultContext as ApiSdkProps)

export const ApiSdkProvider = ({apiSdk: _apiSdk, children}: Props) => {
  return (
    <ApiSdk.Provider
      value={{
        apiSdk: _apiSdk ?? apiSdk,
      }}
    >
      {children}
    </ApiSdk.Provider>
  )
}

export const useApiSdk = (): ApiSdkProps => {
  return useContext<ApiSdkProps>(ApiSdk)
}

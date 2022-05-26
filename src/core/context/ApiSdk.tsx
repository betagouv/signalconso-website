import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {ApiClient, SignalConsoPublicSdk} from '@signal-conso/signalconso-api-sdk-js'
import {apiSdk} from '../apiSdk'
import {ApiAdresseClient} from '../client/ApiAdresseClient'
import {useConfig} from './ConfigContext'

export interface ApiSdkProps {
  apiSdk: SignalConsoPublicSdk
  apiAddressSdk: ApiAdresseClient
}

interface Props {
  apiSdk?: SignalConsoPublicSdk
  apiAddressSdk?: ApiAdresseClient
  children: ReactNode
}

const defaultContext: Partial<ApiSdkProps> = {}

const ApiSdk = React.createContext<ApiSdkProps>(defaultContext as ApiSdkProps)

export const ApiSdkProvider = ({
  apiSdk: _apiSdk,
  apiAddressSdk: _apiAddressSdk,
  children
}: Props) => {
  const config = useConfig().config
  return (
    <ApiSdk.Provider
      value={{
        apiSdk: _apiSdk ?? apiSdk,
        apiAddressSdk: _apiAddressSdk ?? new ApiAdresseClient(new ApiClient({baseUrl: config.apiAdresseUrl})),
      }}
    >
      {children}
    </ApiSdk.Provider>
  )
}

export const useApiSdk = (): ApiSdkProps => {
  return useContext<ApiSdkProps>(ApiSdk)
}

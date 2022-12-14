import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {ApiAdresseClient} from '../client/ApiAdresseClient'
import {useConfig} from './ConfigContext'
import {SignalConsoPublicSdk} from '../../client/SignalConsoPublicSdk'
import {ApiClient} from '../../client/ApiClient'
import {CompanyPublicSdk} from '../../client/CompanyPublicSdk'

export interface ApiSdkProps {
  apiSdk: SignalConsoPublicSdk
  companyApiSdk: CompanyPublicSdk
  apiAddressSdk: ApiAdresseClient
}

interface Props {
  overrideForTests?: {
    apiSdk?: SignalConsoPublicSdk
    companyApiSdk?: CompanyPublicSdk
    apiAddressSdk?: ApiAdresseClient
  }
  children: ReactNode
}

const defaultContext: Partial<ApiSdkProps> = {}

const ApiSdk = React.createContext<ApiSdkProps>(defaultContext as ApiSdkProps)

export const ApiSdkProvider = ({overrideForTests, children}: Props) => {
  const config = useConfig().config

  return (
    <ApiSdk.Provider
      value={{
        apiSdk:
          overrideForTests?.apiSdk ??
          new SignalConsoPublicSdk(
            new ApiClient({
              baseUrl: config.apiBaseUrl + '/api',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }),
          ),
        companyApiSdk:
          overrideForTests?.companyApiSdk ??
          new CompanyPublicSdk(
            new ApiClient({
              baseUrl: config.apiCompanyUrl + '/api',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }),
          ),
        apiAddressSdk: overrideForTests?.apiAddressSdk ?? new ApiAdresseClient(new ApiClient({baseUrl: config.apiAdresseUrl})),
      }}
    >
      {children}
    </ApiSdk.Provider>
  )
}

export const useApiSdk = (): ApiSdkProps => {
  return useContext<ApiSdkProps>(ApiSdk)
}

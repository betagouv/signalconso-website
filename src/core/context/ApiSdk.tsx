import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {CompanyPublicClient} from '../../client/CompanyPublicClient'
import {SignalConsoPublicSdk} from '../../client/SignalConsoPublicSdk'
import {ApiAdresseClient} from '../client/ApiAdresseClient'

export interface ApiSdkProps {
  apiSdk: SignalConsoPublicSdk
  companyApiSdk: CompanyPublicClient
  apiAddressSdk: ApiAdresseClient
}

interface Props {
  overrideForTests?: {
    apiSdk?: SignalConsoPublicSdk
    companyApiSdk?: CompanyPublicClient
    apiAddressSdk?: ApiAdresseClient
  }
  children: ReactNode
}

const defaultContext: Partial<ApiSdkProps> = {}

const ApiSdk = React.createContext<ApiSdkProps>(defaultContext as ApiSdkProps)

export const ApiSdkProvider = ({overrideForTests, children}: Props) => {
  return (
    <ApiSdk.Provider
      value={{
        apiSdk: overrideForTests?.apiSdk ?? new SignalConsoPublicSdk(),
        companyApiSdk: overrideForTests?.companyApiSdk ?? new CompanyPublicClient(),
        apiAddressSdk: overrideForTests?.apiAddressSdk ?? new ApiAdresseClient(),
      }}
    >
      {children}
    </ApiSdk.Provider>
  )
}

export const useApiSdk = (): ApiSdkProps => {
  return useContext<ApiSdkProps>(ApiSdk)
}

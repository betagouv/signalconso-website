import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {CompanyPublicClient} from '../clients/CompanyPublicClient'
import {SignalConsoApiClient} from '../clients/SignalConsoApiClient'
import {AdresseApiClient} from '../clients/AdresseApiClient'

interface ApiClients {
  signalConsoApiClient: SignalConsoApiClient
  companyApiClient: CompanyPublicClient
  adresseApiClient: AdresseApiClient
}

const ApiClientsContext = React.createContext({} as ApiClients)

const signalConsoApiClient = new SignalConsoApiClient()
const companyApiClient = new CompanyPublicClient()
const adresseApiClient = new AdresseApiClient()

export const ApiClientsProvider = ({
  overrideForTests,
  children,
}: {
  overrideForTests?: {
    signalConsoApiClient?: SignalConsoApiClient
    companyApiClient?: CompanyPublicClient
    adresseApiClient?: AdresseApiClient
  }
  children: ReactNode
}) => {
  return (
    <ApiClientsContext.Provider
      value={{
        signalConsoApiClient: overrideForTests?.signalConsoApiClient ?? signalConsoApiClient,
        companyApiClient: overrideForTests?.companyApiClient ?? companyApiClient,
        adresseApiClient: overrideForTests?.adresseApiClient ?? adresseApiClient,
      }}
    >
      {children}
    </ApiClientsContext.Provider>
  )
}

export const useApiClients = () => useContext(ApiClientsContext)

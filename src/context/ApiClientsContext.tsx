import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {CompanyPublicClient} from '../clients/CompanyPublicClient'
import {SignalConsoApiClient} from '../clients/SignalConsoApiClient'
import {AdresseApiClient} from '../clients/AdresseApiClient'
import {SiretExtractorClient} from '../clients/SiretExtractorClient'

interface ApiClients {
  signalConsoApiClient: SignalConsoApiClient
  companyApiClient: CompanyPublicClient
  adresseApiClient: AdresseApiClient
  siretExtractorClient: SiretExtractorClient
}

const ApiClientsContext = React.createContext({} as ApiClients)

const signalConsoApiClient = new SignalConsoApiClient()
const companyApiClient = new CompanyPublicClient()
const adresseApiClient = new AdresseApiClient()
const siretExtractorClient = new SiretExtractorClient()

export const ApiClientsProvider = ({
  overrideForTests,
  children,
}: {
  overrideForTests?: {
    signalConsoApiClient?: SignalConsoApiClient
    companyApiClient?: CompanyPublicClient
    adresseApiClient?: AdresseApiClient
    siretExtractorClient?: SiretExtractorClient
  }
  children: ReactNode
}) => {
  return (
    <ApiClientsContext.Provider
      value={{
        signalConsoApiClient: overrideForTests?.signalConsoApiClient ?? signalConsoApiClient,
        companyApiClient: overrideForTests?.companyApiClient ?? companyApiClient,
        adresseApiClient: overrideForTests?.adresseApiClient ?? adresseApiClient,
        siretExtractorClient: overrideForTests?.siretExtractorClient ?? siretExtractorClient,
      }}
    >
      {children}
    </ApiClientsContext.Provider>
  )
}

export const useApiClients = () => useContext(ApiClientsContext)

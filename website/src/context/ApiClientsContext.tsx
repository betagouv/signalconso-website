import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {CompanyPublicClient} from '../clients/CompanyPublicClient'
import {SignalConsoApiClient} from '../clients/SignalConsoApiClient'
import {AdresseApiClient} from '../clients/AdresseApiClient'
import {SiretExtractorClient} from '../clients/SiretExtractorClient'
import {StationApiClient} from '@/clients/StationApiClient'
import {RappelConsoClient} from '@/clients/RappelConsoClient'

interface ApiClients {
  signalConsoApiClient: SignalConsoApiClient
  companyApiClient: CompanyPublicClient
  adresseApiClient: AdresseApiClient
  stationApiClient: StationApiClient
  rappelConsoClient: RappelConsoClient
  siretExtractorClient: SiretExtractorClient
}

const ApiClientsContext = React.createContext({} as ApiClients)

const signalConsoApiClient = new SignalConsoApiClient()
const companyApiClient = new CompanyPublicClient()
const adresseApiClient = new AdresseApiClient()
const stationApiClient = new StationApiClient()
const rappelConsoClient = new RappelConsoClient()
const siretExtractorClient = new SiretExtractorClient()

export const ApiClientsProvider = ({
  overrideForTests,
  children,
}: {
  overrideForTests?: {
    signalConsoApiClient?: SignalConsoApiClient
    companyApiClient?: CompanyPublicClient
    adresseApiClient?: AdresseApiClient
    stationApiClient?: StationApiClient
    rappelConsoClient?: RappelConsoClient
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
        stationApiClient: overrideForTests?.stationApiClient ?? stationApiClient,
        rappelConsoClient: overrideForTests?.rappelConsoClient ?? rappelConsoClient,
        siretExtractorClient: overrideForTests?.siretExtractorClient ?? siretExtractorClient,
      }}
    >
      {children}
    </ApiClientsContext.Provider>
  )
}

export const useApiClients = () => useContext(ApiClientsContext)

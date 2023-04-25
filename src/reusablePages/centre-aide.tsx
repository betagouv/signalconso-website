import {pageDefinitions} from 'core/pageDefinition'
import {CentreAideConso} from 'components_feature/CentreAide/CentreAideConso'
import {CentreAidePro} from 'components_feature/CentreAide/CentreAidePro'
import Head from 'next/head'

import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'

export const CentreAide = () => {
  return (
    <>
      <Head>
        <title>{pageDefinitions.aide.title}</title>
        <meta name="description" content={pageDefinitions.aide.description} />
      </Head>
      <ContentPageContainer>
        <h1>Aide à l'utilisation de SignalConso</h1>
        <Tabs
          tabs={[
            {label: 'Consommateur', iconId: 'fr-icon-user-line', content: <CentreAideConso />},
            {label: 'Professionnel', iconId: 'fr-icon-store-line', content: <CentreAidePro />},
          ]}
        />
      </ContentPageContainer>
    </>
  )
}

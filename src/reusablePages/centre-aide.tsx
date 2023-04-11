import {pageDefinitions} from 'core/pageDefinition'
import {CentreAideConso} from 'components_feature/CentreAide/CentreAideConso'
import {CentreAidePro} from 'components_feature/CentreAide/CentreAidePro'
import Head from 'next/head'

import {Tabs} from '@codegouvfr/react-dsfr/Tabs'

export const CentreAide = () => {
  return (
    <>
      <Head>
        <title>{pageDefinitions.centreAide.title}</title>
        <meta name="description" content={pageDefinitions.centreAide.description} />
      </Head>
      <div className="fr-container fr-pt-6w fr-pb-4w ">
        <div className="fr-grid-row ">
          <div className="fr-col-12  fr-col-lg-10 fr-col-xl-8 ">
            <h1>Centre d'aide</h1>
            <Tabs
              tabs={[
                {label: 'Consommateur', iconId: 'fr-icon-user-line', content: <CentreAideConso />},
                {label: 'Professionnel', iconId: 'fr-icon-store-line', content: <CentreAidePro />},
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

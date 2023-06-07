import {titleAndDescriptions} from 'core/titleAndDescriptions'
import {CentreAideConso} from 'components_feature/CentreAide/CentreAideConso'
import {CentreAidePro} from 'components_feature/CentreAide/CentreAidePro'
import Head from 'next/head'

import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {useI18n} from '../i18n/I18n'

export const CentreAide = () => {
  const {m} = useI18n()

  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.aide.title}</title>
        <meta name="description" content={m.titleAndDescriptions.aide.description} />
      </Head>
      <ContentPageContainer>
        <h1>{m.centreaide.title}</h1>
        <Tabs
          tabs={[
            {label: m.centreaide.tab1, iconId: 'fr-icon-user-line', content: <CentreAideConso />},
            {label: m.centreaide.tab2, iconId: 'fr-icon-briefcase-line', content: <CentreAidePro />},
          ]}
        />
      </ContentPageContainer>
    </>
  )
}

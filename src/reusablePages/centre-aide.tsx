import {CentreAideConso} from 'components_feature/centreAideComponents/CentreAideConso'
import {CentreAidePro} from 'components_feature/centreAideComponents/CentreAidePro'

import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {ContentPageContainer} from 'components_simple/PageContainers'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'

export function getMetadata(lang: AppLang): Metadata {
  const {messages} = getI18n(lang)

  return {
    title: messages.titleAndDescriptions.aide.title,
    description: messages.titleAndDescriptions.aide.description,
  }
}

export const CentreAide = ({params}: any) => {
  const {messages} = getI18n(params.lang)

  return (
    <>
      <ContentPageContainer>
        <h1>{messages.centreaide.title}</h1>

        {params.lang === AppLangs.en ? (
          <CentreAideConso />
        ) : (
          <Tabs
            tabs={[
              {label: messages.centreaide.tab1, iconId: 'fr-icon-user-line', content: <CentreAideConso />},
              {label: messages.centreaide.tab2, iconId: 'fr-icon-briefcase-line', content: <CentreAidePro />},
            ]}
          />
        )}
      </ContentPageContainer>
    </>
  )
}

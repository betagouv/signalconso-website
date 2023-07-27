import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import Link from 'next/link'
import {StatCharts} from './StatCharts'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'
import {AppLangs} from '../i18n/localization/AppLangs'

export function getMetadata(lang: AppLangs): Metadata {
  const {messages: m} = getI18n(lang)

  return {
    title: m.titleAndDescriptions.stats.title,
    description: m.titleAndDescriptions.stats.description,
  }
}

export const Stats = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)

  return (
    <>
      <ContentPageContainer>
        <h1 className="">{m.statsTitle}</h1>
        <p>
          {m.statsText}
          <Link className="" target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
            data.economie.fr
          </Link>
        </p>
        <StatCharts />
      </ContentPageContainer>
    </>
  )
}

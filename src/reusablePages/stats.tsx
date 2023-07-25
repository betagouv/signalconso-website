import {ContentPageContainer} from 'components_simple/PageContainers'
import Link from 'next/link'
import {StatCharts} from './StatCharts'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'

export function getMetadata(): Metadata {
  const {messages: m} = getI18n('fr')

  return {
    title: m.titleAndDescriptions.stats.title,
    description: m.titleAndDescriptions.stats.description,
  }
}

export const Stats = () => {
  const {messages: m} = getI18n('fr')

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

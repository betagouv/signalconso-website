import {Stat} from 'components_feature/Stat/Stat'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import Head from 'next/head'
import Link from 'next/link'

const Stats = () => {
  const apiClient = useApiClients().signalConsoApiClient
  const {m} = useI18n()

  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.stats.title}</title>
        <meta name="description" content={m.titleAndDescriptions.stats.description} />
      </Head>
      <ContentPageContainer>
        <h1 className="">{m.statsTitle}</h1>
        <p>
          {m.statsText}
          <Link className="" target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
            data.economie.fr
          </Link>
        </p>
        <div className="space-y-4">
          <Stat
            title={m.acceptedReportStat}
            name={m.acceptedReportStatName}
            count={() => apiClient.getPublicStatCount('PromesseAction')}
            curve={() => apiClient.getPublicStatCurve('PromesseAction')}
          />
          <Stat
            title={m.reportsCountStat}
            name={m.reportsCountStatName}
            count={() => apiClient.getPublicStatCount('Reports')}
            curve={() => apiClient.getPublicStatCurve('Reports')}
          />
          <Stat
            title={m.transmittedRateStat}
            name={m.transmittedRateStatName}
            description={m.transmittedRateDescription}
            count={() => apiClient.getPublicStatCount('TransmittedPercentage')}
            curve={() => apiClient.getPublicStatCurve('TransmittedPercentage')}
            percentage
          />
          <Stat
            title={m.readRateStat}
            name={m.readRateStatName}
            description={m.readRateDescription}
            count={() => apiClient.getPublicStatCount('ReadPercentage')}
            curve={() => apiClient.getPublicStatCurve('ReadPercentage')}
            percentage
          />
          <Stat
            title={m.respondedRateStat}
            name={m.respondedRateStatName}
            description={m.respondedRateDescription}
            count={() => apiClient.getPublicStatCount('ResponsePercentage')}
            curve={() => apiClient.getPublicStatCurve('ResponsePercentage')}
            percentage
          />
          <Stat
            title={m.websiteReportsRateStat}
            name={m.respondedRateStatName}
            count={() => apiClient.getPublicStatCount('WebsitePercentage')}
            percentage
          />
        </div>
      </ContentPageContainer>
    </>
  )
}

export default Stats

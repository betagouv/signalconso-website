import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'
import {useApiClients} from 'core/context/ApiClientsContext'
import {useI18n} from 'core/i18n'
import {Stat} from 'feature/Stat/Stat'
import {Icon} from '@mui/material'
import {Txt} from '../alexlibs/mui-extension'
import {ReportStatus} from '../client/report/Report'

const Stats = () => {
  const apiClient = useApiClients().signalConsoApiClient
  const {m} = useI18n()

  return (
    <Page className="blog" size="small">
      <Head>
        <title>{pageDefinitions.stats.title}</title>
        <meta name="description" content={pageDefinitions.stats.description} />
      </Head>
      <h1>Statistiques</h1>
      <p>
        Vous souhaitez plus d'informations sur nos statistiques consultez le site
        <br />
        <a target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
          data.economie.fr&nbsp;
          <Icon fontSize="inherit" sx={{verticalAlign: 'middle'}}>
            open_in_new
          </Icon>
        </a>
      </p>

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
      <p>
        <Txt color="hint">Nos statistiques sont mises à jour en temps réel.</Txt>
      </p>
    </Page>
  )
}

export default Stats

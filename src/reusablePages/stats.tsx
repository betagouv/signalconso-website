import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'components_simple/Page/Page'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {Stat} from 'components_feature/Stat/Stat'
import {Icon} from '@mui/material'
import {Txt} from '../alexlibs/mui-extension/Txt/Txt'

const Stats = () => {
  const apiClient = useApiClients().signalConsoApiClient
  const {m} = useI18n()

  return (
    <Page maxWidth="small">
      <Head>
        <title>{pageDefinitions.stats.title}</title>
        <meta name="description" content={pageDefinitions.stats.description} />
      </Head>
      <div className="space-y-4">
        <h1>Statistiques</h1>
        <p>
          Vous souhaitez plus d'informations sur nos statistiques consultez le site
          <br />
          <a
            className="text-sclightblue"
            target="_blank"
            rel="noreferrer"
            href="https://data.economie.gouv.fr/pages/signalconso/"
          >
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
        <p className="text-gray-500">Nos statistiques sont mises à jour en temps réel.</p>
      </div>
    </Page>
  )
}

export default Stats

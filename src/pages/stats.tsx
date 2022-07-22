import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'
import {useApiSdk} from 'core/context/ApiSdk'
import {useI18n} from 'core/i18n'
import {Stat} from 'feature/Stat/Stat'
import {Icon} from '@mui/material'
import {Txt} from '../alexlibs/mui-extension'
import {ReportStatus} from '../client/report/Report'

const Stats = () => {
  const apiSdk = useApiSdk().apiSdk
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
        count={() => apiSdk.stats.getPublicStatCount('PromesseAction')}
        curve={() => apiSdk.stats.getPublicStatCurve('PromesseAction')}
      />
      <Stat
        title={m.reportsCountStat}
        name={m.reportsCountStatName}
        count={() => apiSdk.stats.getPublicStatCount('Reports')}
        curve={() => apiSdk.stats.getPublicStatCurve('Reports')}
      />
      <Stat
        title={m.transmittedRateStat}
        name={m.transmittedRateStatName}
        description={m.transmittedRateDescription}
        count={() => apiSdk.stats.getPublicStatCount('TransmittedPercentage')}
        curve={() => apiSdk.stats.getPublicStatCurve('TransmittedPercentage')}
        percentage
      />
      <Stat
        title={m.readRateStat}
        name={m.readRateStatName}
        description={m.readRateDescription}
        count={() => apiSdk.stats.getPublicStatCount('ReadPercentage')}
        curve={() => apiSdk.stats.getPublicStatCurve('ReadPercentage')}
        percentage
      />
      <Stat
        title={m.respondedRateStat}
        name={m.respondedRateStatName}
        description={m.respondedRateDescription}
        count={() => apiSdk.stats.getPublicStatCount('ResponsePercentage')}
        curve={() => apiSdk.stats.getPublicStatCurve('ResponsePercentage')}
        percentage
      />
      <Stat
        title={m.websiteReportsRateStat}
        name={m.respondedRateStatName}
        count={() => apiSdk.stats.getPublicStatCount('WebsitePercentage')}
        percentage
      />
      <p>
        <Txt color="hint">Nos statistiques sont mises à jour en temps réel.</Txt>
      </p>
    </Page>
  )
}

export default Stats

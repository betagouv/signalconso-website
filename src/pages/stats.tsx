import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'
import {useApiSdk} from 'core/context/ApiSdk'
import {ReportStatus} from '@signal-conso/signalconso-api-sdk-js'
import {useI18n} from 'core/i18n'
import {Stat} from 'feature/Stat/Stat'
import {Icon} from '@mui/material'
import {Txt} from 'mui-extension'

const Stats = () => {
  const apiSdk = useApiSdk().apiSdk
  const {m} = useI18n()

  return (
    <Page className="blog">
      <Head>
        <title>{pageDefinitions.stats.title}</title>
        <meta name="description" content={pageDefinitions.stats.description}/>
      </Head>
      <h1>Statistiques</h1>
      <p>
        Vous souhaitez plus d'informations sur nos statistiques consultez le site<br/>
        <a target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr/pages/signalconso/">
          data.economie.fr&nbsp;
          <Icon fontSize="inherit" sx={{verticalAlign: 'middle'}}>open_in_new</Icon>
        </a>
      </p>

      <Stat
        title={m.acceptedReportStat}
        name={m.acceptedReportStatName}
        count={() => apiSdk.stats.getReportCount({status: [ReportStatus.PromesseAction]})}
        curve={() => apiSdk.stats.getReportCountCurve({status: [ReportStatus.PromesseAction]})}
      />
      <Stat
        title={m.reportsCountStat}
        name={m.reportsCountStatName}
        count={apiSdk.stats.getReportCount}
        curve={apiSdk.stats.getReportCountCurve}
      />
      <Stat
        title={m.transmittedRateStat}
        name={m.transmittedRateStatName}
        description={m.transmittedRateDescription}
        count={apiSdk.stats.percentage.getReportForwardedToPro}
        curve={() => apiSdk.stats.percentageCurve.getReportForwardedPercentage({})}
        percentage
      />
      <Stat
        title={m.readRateStat}
        name={m.readRateStatName}
        description={m.readRateDescription}
        count={apiSdk.stats.percentage.getReportReadByPro}
        curve={() => apiSdk.stats.percentageCurve.getReportReadPercentage({})}
        percentage
      />
      <Stat
        title={m.respondedRateStat}
        name={m.respondedRateStatName}
        description={m.respondedRateDescription}
        count={() => apiSdk.stats.percentage.getReportWithResponse()}
        curve={() => apiSdk.stats.percentageCurve.getReportRespondedPercentage({})}
        percentage
      />
      <Stat
        title={m.websiteReportsRateStat}
        name={m.respondedRateStatName}
        count={apiSdk.stats.percentage.getReportWithWebsite}
        percentage
      />
      <p>
        <Txt color="hint">Nos statistiques sont mises à jour en temps réel.</Txt>
      </p>
    </Page>
  )
}

export default Stats

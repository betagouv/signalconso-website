import {buildLinkLandingPageFromAnomaly, buildLinkStartReport} from '@/core/buildLinks'
import {GenerateMetadataArg, PageComponentProps, PathParams, SearchParams} from '@/core/metadatas'
import {getI18n} from '@/i18n/I18nDictionnary'
import {getSupportedLang} from '@/i18n/localization/AppLangs'
import {STEP_PARAM_NAME, getIndexForStepOrDone, reportSteps} from '@/model/ReportStep'
import {undefinedIfNull} from '@/utils/utils'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {allAnomalies} from '../../../../anomalies/Anomalies'
import * as categoryPathPage from '../../../../reusablePages/faireUnSignalementPage'

type LocalPathParams = PathParams<{
  dynamicPath: string
}>

function getAnomalyData(params: LocalPathParams) {
  const lang = getSupportedLang(params.lang)
  if (lang) {
    return allAnomalies(lang).find(_ => _.path === params.dynamicPath)
  }
  return undefined
}

function readStepParam(searchParams: SearchParams) {
  const value = searchParams[STEP_PARAM_NAME]
  if (typeof value === 'string') {
    try {
      parseInt(value, 10)
      return parseInt(value, 10)
    } catch {}
  }
  return 1
}

export function generateMetadata(arg: GenerateMetadataArg<LocalPathParams>): Metadata {
  const lang = getSupportedLang(arg.params.lang)
  if (lang) {
    const anomaly = getAnomalyData(arg.params)
    if (anomaly) {
      const {messages: m} = getI18n(lang)
      const stepParam = readStepParam(arg.searchParams)
      // Accessibility audit asked for something like this in the title
      const stepSpecificTitle =
        stepParam === getIndexForStepOrDone('Done')
          ? m.acknoledgment.sentReport
          : `${m.faireUnSignalement.etape} ${stepParam} ${m.faireUnSignalement.sur} ${reportSteps.length}`

      const landingCanonical = buildLinkLandingPageFromAnomaly(lang, anomaly)
      const canonical =
        landingCanonical ??
        // some anomalies in EN do not have a corresponding landing page
        buildLinkStartReport(anomaly, lang)
      return {
        title: stepSpecificTitle + ' - ' + anomaly.seoTitle + ' - SignalConso',
        description: undefinedIfNull(anomaly.seoDescription ?? anomaly.description),
        alternates: {
          canonical,
        },
      }
    }
  }
  return {}
}

const Page = (props: PageComponentProps<LocalPathParams>) => {
  const anomaly = getAnomalyData(props.params)
  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={false} /> : notFound()
}

export default Page

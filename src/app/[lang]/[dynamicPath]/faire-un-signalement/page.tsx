import {getI18n} from 'i18n/I18nDictionnary'
import {getSupportedLang} from 'i18n/localization/AppLangs'
import {STEP_PARAM_NAME, getIndexForStepOrDone, reportSteps} from 'model/ReportStep'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {undefinedIfNull} from 'utils/utils'
import {allAnomalies} from '../../../../anomalies/Anomalies'
import {buildLinkLandingPageFromAnomaly, buildLinkStartReport} from '../../../../core/pagesDefinitions'
import * as categoryPathPage from '../../../../reusablePages/faireUnSignalementPage'

export type Params = {
  dynamicPath: string
  lang: string
}

type SearchParams = {[k: string]: any}

function getAnomalyData(params: Params) {
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

export function generateMetadata(props: {params: Params; searchParams: SearchParams}): Metadata {
  const lang = getSupportedLang(props.params.lang)
  if (lang) {
    const anomaly = getAnomalyData(props.params)
    if (anomaly) {
      const {messages: m} = getI18n(lang)
      const stepParam = readStepParam(props.searchParams)
      // Accessibility audit asked for something like this in the title
      const stepSpecificTitle =
        stepParam === getIndexForStepOrDone('Done')
          ? m.acknoledgment.sentReport
          : `${m.titleAndDescriptions.faireUnSignalement.etape} ${stepParam} ${m.titleAndDescriptions.faireUnSignalement.sur} ${reportSteps.length}`

      const landingCanonical = buildLinkLandingPageFromAnomaly(lang, anomaly)
      const canonical =
        landingCanonical ??
        // some anomalies in EN do not have a corresponding landing page
        buildLinkStartReport(anomaly, lang)
      return {
        alternates: {
          canonical,
        },
        title: stepSpecificTitle + ' - ' + anomaly.seoTitle + ' - SignalConso',
        description: undefinedIfNull(anomaly.seoDescription ?? anomaly.description),
      }
    }
  }
  return {}
}

const Page = (props: {params: Params}) => {
  const anomaly = getAnomalyData(props.params)

  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={false} /> : notFound()
}

export default Page

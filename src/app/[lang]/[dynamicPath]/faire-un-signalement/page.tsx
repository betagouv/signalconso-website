import {getI18n} from 'i18n/I18nDictionnary'
import {STEP_PARAM_NAME, getIndexForStepOrDone, reportSteps} from 'model/ReportStep'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {allAnomalies} from '../../../../anomalies/Anomalies'
import {appConfig} from '../../../../core/appConfig'
import {buildLinkLandingPageFromAnomaly} from '../../../../core/pagesDefinitions'
import * as categoryPathPage from '../../../../reusablePages/faireUnSignalementPage'
import {undefinedIfNull} from 'utils/utils'

export type Props = {
  dynamicPath: string
  lang: any
}

type SearchParams = {[k: string]: any}

function getAnomalyData(params: Props) {
  return allAnomalies(params.lang).find(_ => _.path === params.dynamicPath)
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

export function generateMetadata(props: {params: Props; searchParams: SearchParams}): Metadata {
  const anomaly = getAnomalyData(props.params)
  const {messages: m} = getI18n(props.params.lang)
  const stepParam = readStepParam(props.searchParams)
  // Accessibility audit asked for something like this in the title
  const stepSpecificTitle =
    stepParam === getIndexForStepOrDone('Done')
      ? m.acknoledgment.sentReport
      : `${m.titleAndDescriptions.faireUnSignalement.etape} ${stepParam} ${m.titleAndDescriptions.faireUnSignalement.sur} ${reportSteps.length}`

  return anomaly
    ? {
        alternates: {canonical: appConfig.websiteBaseUrl + buildLinkLandingPageFromAnomaly(anomaly)},
        title: stepSpecificTitle + ' - ' + anomaly.seoTitle + ' - SignalConso',
        description: undefinedIfNull(anomaly.seoDescription ?? anomaly.description),
      }
    : {}
}

const Page = (props: {params: Props}) => {
  const anomaly = getAnomalyData(props.params)

  return anomaly ? <categoryPathPage.FaireUnSignalementPage anomaly={anomaly} isWebView={false} /> : notFound()
}

export default Page

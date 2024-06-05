import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import {AppLang} from '@/i18n/localization/AppLangs'

export function getManualLpButtonProps(lang: AppLang, category: String) {
  const anomaly = allVisibleAnomalies(lang).find(_ => _.category === category)
  if (!anomaly) {
    throw new Error(`Can't find anomaly with category = ${category}`)
  }
  return {
    ...bigReportButtonProps,
    linkProps: {href: buildLinkStartReport(anomaly, lang, {isWebView: false})},
  }
}

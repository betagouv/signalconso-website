import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import {AppLang} from '@/i18n/localization/AppLangs'
import {ChildrenProps} from '@/utils/utils'

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

export function LpColoredBand({children, bgClassName = ''}: ChildrenProps & {bgClassName?: string}) {
  return (
    <div className={bgClassName}>
      <div className="fr-container">{children}</div>
    </div>
  )
}

import {ManualLandingData} from '@/landings/manualLandings/manualLandingsUtils'
import {Anomaly} from 'shared/anomalies/Anomaly'
import {NewsArticle} from '../components_feature/actualites/newsArticlesData'
import {AppLang, AppLangs} from '../i18n/localization/AppLangs'
import {AirtableLandingData, allVisibleAirtableLandings} from '../landings/airtableLandings/airtableLandingsUtils'
import {pagesDefs} from './pagesDefinitions'

export const HP_START_REPORT_ANCHOR = 'quel-probleme'

export function buildLinkHomePickCategory() {
  return pagesDefs.index.url + `#${HP_START_REPORT_ANCHOR}`
}

export function buildLinkStartReport(
  anomaly: Pick<Anomaly, 'path'>,
  lang: AppLang,
  {
    isWebView,
  }: {
    isWebView: boolean
  } = {isWebView: false},
) {
  return isWebView ? `/${lang}/webview/${anomaly.path}` : `/${lang}/${anomaly.path}/faire-un-signalement`
}

export function buildLinkAirtableLandingPage(landingData: AirtableLandingData) {
  return `/${landingData.lang}/${landingData.url}`
}
export function buildLinkManualLandingPage(landingData: ManualLandingData) {
  return `/fr/${landingData.url}`
}
// sometimes we need to link a specific landing
// it's hard to reference them in a typesafe way since they're autogenerated

export function buildHardcodedLinkAirtableLandingFr(url: string): string | undefined {
  const landingData = allVisibleAirtableLandings(AppLangs.fr).find(_ => _.url === url)
  return landingData && buildLinkAirtableLandingPage(landingData)
}

export function buildLinkLandingPageFromAnomaly(lang: AppLangs, anomaly: Pick<Anomaly, 'path'>) {
  const landings = allVisibleAirtableLandings(lang)
  const landing = landings.find(_ => _.url === anomaly.path)
  if (landing) {
    return `/${lang}/${landing.url}`
  }
  return undefined
}

export function buildLinkNewsArticle(article: NewsArticle, {withLangPrefix = false}: {withLangPrefix?: boolean} = {}) {
  return `${withLangPrefix ? `/${article.lang}` : ''}/actualites/${article.slug}`
}
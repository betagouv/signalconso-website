import {Anomaly} from 'anomalies/Anomaly'
import {appConfig} from './appConfig'
import {LandingData} from 'landings/landingDataUtils'
import {NewsArticle} from 'actualites/newsArticlesData'

type PageDefExternal = {
  isExternal: true
  url: string
}
type PageDefInternal = {
  isExternal: false
  url: string
  urlRelative: string
  noIndex: boolean
}

function page(url: string, options: {noIndex?: boolean} = {}): PageDefInternal {
  const noIndex = options.noIndex ?? false
  return {
    isExternal: false,
    url,
    // without the leading slash, it becomes a relative link
    // useful for preserving the /webview/ prefix
    urlRelative: url.slice(1),
    noIndex,
  }
}

function pageExternal(url: string): PageDefExternal {
  return {
    isExternal: true,
    url,
  }
}

export const internalPageDefs = {
  index: page('/'),
  arborescence: page(`/arborescence`, {noIndex: true}),
  accessibilite: page(`/accessibilite`),
  planDuSite: page(`/plan-du-site`),
  actualites: page(`/actualites`),

  // all these are available in /webview/
  centreAide: page(`/centre-aide`),
  commentCaMarche: page(`/comment-ca-marche`),
  conditionsGeneralesUtilisation: page(`/conditions-generales-utilisation`, {noIndex: true}),
  contact: page(`/contact`, {noIndex: true}),
  cookies: page(`/cookies`),
  delaiRetractation: page(`/delai-de-retractation`),
  quiSommesNous: page(`/qui-sommes-nous`),
  stats: page(`/stats`),
  suiviEtViePrivee: page(`/suivi-et-vie-privee`),
  litige: page(`/litige`),

  // only on dev/demo
  ...(appConfig.showPlayground ? {playground: page(`/playground`, {noIndex: true})} : null),
}

const externalPageDefs = {
  connexion: pageExternal(appConfig.dashboardBaseUrl + '/connexion'),
  companyActivation: pageExternal(appConfig.dashboardBaseUrl + '/activation'),
  lostPassword: pageExternal(appConfig.dashboardBaseUrl + '/perte-mot-de-passe'),
}

// This lists only the 'static', 'hardcoded' pages
// There is also
// - the /xxx/faire-un-signalement pages
// - the landing pages (/xxx)
// - the /webview/xxx pages
export const pagesDefs = {
  ...internalPageDefs,
  ...externalPageDefs,
}

export function buildLinkStartReport(anomaly: Pick<Anomaly, 'path'>, {isWebView}: {isWebView: boolean} = {isWebView: false}) {
  return isWebView ? `/webview/${anomaly.path}` : `/${anomaly.path}/faire-un-signalement`
}

export function buildLinkHomePickCategory() {
  return pagesDefs.index.url + `#${HP_START_REPORT_ANCHOR}`
}

export function buildLinkLandingPage(landingData: LandingData) {
  return `/${landingData.url}`
}

export function buildLinkLandingPageFromAnomaly(anomaly: Pick<Anomaly, 'path'>) {
  return `/${anomaly.path}`
}

export function buildLinkNewsArticle(article: NewsArticle) {
  return `/actualites/${article.slug}`
}

export const HP_START_REPORT_ANCHOR = 'quel-probleme'

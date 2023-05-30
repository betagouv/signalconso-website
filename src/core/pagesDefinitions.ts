import {Anomaly} from 'anomalies/Anomaly'
import {appConfig} from './appConfig'
import {LandingData} from 'landings/landingDataUtils'

type PageDef = {
  url: string
  noIndex: boolean
  isExternal: boolean
}

function page(url: string, options: {noIndex?: boolean; isExternal?: boolean} = {}): PageDef {
  const noIndex = options.noIndex ?? false
  const isExternal = options.isExternal ?? false
  return {url, noIndex, isExternal}
}

// This lists only the 'static', 'hardcoded' pages
// There is also
// - the /xxx/faire-un-signalement pages
// - the landing pages (/xxx)
// - the /webview/xxx pages
export const pagesDefs = {
  index: page('/'),
  commentCaMarche: page(`/comment-ca-marche`),
  suiviEtViePrivee: page(`/suivi-et-vie-privee`),
  centreAide: page(`/centre-aide`),
  cookies: page(`/cookies`),
  contact: page(`/contact`, {noIndex: true}),
  stats: page(`/stats`),
  arborescence: page(`/arborescence`),
  accessibilite: page(`/accessibilite`),
  planDuSite: page(`/plan-du-site`),
  quiSommesNous: page(`/qui-sommes-nous`),
  litige: page(`/litige`),
  delaiRetractation: page(`/delai-de-retractation`),
  conditionsGeneralesUtilisation: page(`/conditions-generales-utilisation`, {noIndex: true}),
  // only on dev/demo
  ...(appConfig.showPlayground ? {playground: page(`/playground`)} : null),
  // dashboard links
  connexion: page(appConfig.dashboardBaseUrl + '/connexion', {isExternal: true}),
  companyActivation: page(appConfig.dashboardBaseUrl + '/activation', {isExternal: true}),
  lostPassword: page(appConfig.dashboardBaseUrl + '/perte-mot-de-passe', {isExternal: true}),
}

export function buildLinkStartReport(anomaly: Pick<Anomaly, 'path'>, {isWebView}: {isWebView: boolean} = {isWebView: false}) {
  return isWebView ? `/webview/${anomaly.path}` : `/${anomaly.path}/faire-un-signalement`
}

export function buildLinkLandingPage(landingData: LandingData) {
  return `/${landingData.url}`
}

export function buildLinkLandingPageFromAnomaly(anomaly: Pick<Anomaly, 'path'>) {
  return `/${anomaly.path}`
}

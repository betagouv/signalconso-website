import {Anomaly} from 'anomalies/Anomaly'
import {appConfig} from './appConfig'
import {LandingData} from 'landings/landingDataUtils'
import {NewsArticle} from 'components_feature/actualites/newsArticlesData'
import {AppLang} from '../i18n/localization/AppLangs'

type PageDefExternal = {
  isExternal: true
  url: string
}
type PageDefInternal = {
  isExternal: false
  url: string
  urlRelative: string
  noIndex: boolean
  //Has alternate language available for the page
  hasAlternate: boolean
}

function page(url: string, options: {noIndex?: boolean; hasAlternate?: boolean} = {}): PageDefInternal {
  const noIndex = options.noIndex ?? false
  const hasAlternate = options.hasAlternate ?? false
  return {
    isExternal: false,
    url,
    hasAlternate,
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
  index: page('/', {hasAlternate: true}),
  arborescence: page(`/arborescence`, {noIndex: true, hasAlternate: true}),
  accessibilite: page(`/accessibilite`, {hasAlternate: true}),
  planDuSite: page(`/plan-du-site`, {hasAlternate: true}),
  actualites: page(`/actualites`),

  // all these are available in /webview/
  centreAide: page(`/centre-aide`, {hasAlternate: true}),
  commentCaMarche: page(`/comment-ca-marche`, {hasAlternate: true}),
  conditionsGeneralesUtilisation: page(`/conditions-generales-utilisation`, {noIndex: true, hasAlternate: true}),
  contact: page(`/contact`, {noIndex: true, hasAlternate: true}),
  cookies: page(`/cookies`, {hasAlternate: true}),
  delaiRetractation: page(`/delai-de-retractation`, {hasAlternate: true}),
  quiSommesNous: page(`/qui-sommes-nous`, {hasAlternate: true}),
  stats: page(`/stats`, {hasAlternate: true}),
  suiviEtViePrivee: page(`/suivi-et-vie-privee`, {hasAlternate: true}),
  litige: page(`/litige`, {hasAlternate: true}),

  // only on dev/demo
  ...(appConfig.showPlayground ? {playground: page(`/playground`, {noIndex: true, hasAlternate: true})} : null),
}

const externalPageDefs = {
  espaceProWelcome: pageExternal(appConfig.dashboardBaseUrl),
  espaceProConnexion: pageExternal(appConfig.dashboardBaseUrl + '/connexion'),
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

export function buildLinkLandingPage(landingData: LandingData) {
  return `/${landingData.url}`
}

export function buildLinkLandingPageFromAnomaly(anomaly: Pick<Anomaly, 'path'>) {
  return `/${anomaly.path}`
}

export function buildLinkNewsArticle(article: NewsArticle) {
  return `/actualites/${article.slug}`
}

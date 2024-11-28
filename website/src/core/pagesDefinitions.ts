import {appConfig} from './appConfig'

type PageDefExternal = {
  isExternal: true
  url: string
}
export type PageDefInternal = {
  isExternal: false
  url: string
  urlRelative: string
  noIndex: boolean
  // Set false if the page has no english version
  // /!\ note that a "notFound()" still has to be manually coded on this page, when the lang is english
  // this boolean only affects the sitemap / metadatas / etc.
  hasEnglishVersion: boolean
}

function page(url: string, options: {noIndex?: boolean; hasEnglishVersion?: boolean} = {}): PageDefInternal {
  const noIndex = options.noIndex ?? false
  const hasEnglishVersion = options.hasEnglishVersion ?? true
  return {
    isExternal: false,
    url,
    hasEnglishVersion,
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

function pageLp(url: string): PageDefInternal {
  return page(url, {hasEnglishVersion: false})
}

export const internalPageDefs = {
  index: page('/'),
  outils: page(`/outils`, {noIndex: true}),
  arborescence: page(`/arborescence`, {noIndex: true}),
  arboLinksExtract: page(`/arborescence-liens`, {noIndex: true}),
  planDuSite: page(`/plan-du-site`),
  actualites: page(`/actualites`),
  playground: page(`/playground`, {noIndex: true}),
  // all these are available in /webview/
  accessibilite: page(`/accessibilite`, {noIndex: true}),
  commentCaMarche: page(`/comment-ca-marche`),
  conditionsGeneralesUtilisation: page(`/conditions-generales-utilisation`, {noIndex: true}),
  contact: page(`/contact`, {noIndex: true}),
  cookies: page(`/cookies`),
  delaiRetractation: page(`/delai-de-retractation`),
  quiSommesNous: page(`/qui-sommes-nous`),
  stats: page(`/stats`, {hasEnglishVersion: false}),
  suiviEtViePrivee: page(`/suivi-et-vie-privee`),
  litige: page(`/litige`),
  litigeTelecom: page(`/litige/telecom`),
}

const externalPageDefs = {
  centreAide: pageExternal('https://aide.signal.conso.gouv.fr'),
  espaceProWelcome: pageExternal(appConfig.dashboardBaseUrl),
  espaceProConnexion: pageExternal(appConfig.dashboardBaseUrl + '/connexion'),
  companyActivation: pageExternal(appConfig.dashboardBaseUrl + '/activation'),
  lostPassword: pageExternal(appConfig.dashboardBaseUrl + '/perte-mot-de-passe'),
}

// This lists only the simple, unique, hardcoded pages
// There is also
// - the /xxx/faire-un-signalement pages
// - the landing pages (/xxx)
// - the news articles (/actualites/xxx)
// - the review url (/avis/xxx)
// - the /webview/xxx pages
export const pagesDefs = {
  ...internalPageDefs,
  ...externalPageDefs,
}

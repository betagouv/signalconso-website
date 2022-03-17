import {appConfig} from '../conf/appConfig'

export const siteMap = {
  index: `/`,
  commentCaMarche: `/comment-ca-marche`,
  suiviEtViePrivee: `/suivi-et-vie-privee`,
  centreAide: `/centre-aide`,
  playground: `/playground`,
  cookies: `/cookies`,
  contact: `/contact`,
  stats: `/stats`,
  blog: `/blog`,
  arborescence: `/arborescence`,
  accessibilite: `/accessibilite`,
  planDuSite: `/plan-du-site`,
  quiSommesNous: `/qui-sommes-nous`,
  litige: `/litige`,
  conditionsGeneralesUtilisation: `/conditions-generales-utilisation`,
  connexion: appConfig.dashboardBaseUrl + '/connexion',
  companyActivation: appConfig.dashboardBaseUrl + '/activation',
  lostPassword: appConfig.dashboardBaseUrl + '/perte-mot-de-passe',
}

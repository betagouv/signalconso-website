import {appConfig} from '../conf/appConfig'

export const siteMap = {
  index: `/`,
  howItWorks: `/comment-ca-marche`,
  suiviEtViePrivee: `/suivi-et-vie-privee`,
  help: `/centre-aide`,
  playground: `/playground`,
  cookies: `/cookies`,
  contact: `/contact`,
  stats: `/stats`,
  accessibilite: `/accessibilite`,
  quiSommesNous: `/qui-sommes-nous`,
  conditionsGeneralesUtilisation: `/conditions-generales-utilisation`,
  connexion: appConfig.dashboardBaseUrl,
  lostPassword: appConfig.dashboardBaseUrl + '/perte-mot-de-passe',
}

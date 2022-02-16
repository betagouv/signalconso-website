import {appConfig} from '../conf/appConfig'

export const siteMap = {
  index: `/`,
  howItWorks: `/comment-ca-marche`,
  help: `/centre-aide`,
  playground: `/playground`,
  contact: `/contact`,
  connexion: appConfig.dashboardBaseUrl,
  lostPassword: appConfig.dashboardBaseUrl + '/perte-mot-de-passe',
}

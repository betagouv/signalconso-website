import {fr} from './localization/fr'
import {AppLang, AppLangs} from './localization/AppLangs'
import {en} from './localization/en'

export const getI18n = (locale?: AppLang) => {
  switch (locale) {
    case AppLangs.fr:
      return fr
    case AppLangs.en:
      return en
    default:
      return fr
  }
}

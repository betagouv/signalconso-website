import {fr} from './localization/fr'
import {AppLang, AppLangs} from './localization/AppLangs'
import {en} from './localization/en'

export const getI18n = (locale?: AppLang) => {
  const obj = locale === AppLangs.en ? en : fr
  return {
    ...obj,
    m: obj.messages,
  }
}

export type I18nMessages = typeof fr.messages | typeof en.messages

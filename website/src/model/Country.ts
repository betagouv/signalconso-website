import {AppLang, AppLangs} from '../i18n/localization/AppLangs'

export interface Country {
  code: string
  name: string
  englishName: string
  european: boolean
  transfer: boolean
}

export const countryLabel = (lang: AppLang, country: Country) => {
  return lang == AppLangs.fr ? country.name : country.englishName
}

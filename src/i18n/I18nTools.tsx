import {AppLang, AppLangs} from './localization/AppLangs'

export const switchLang = (currentLang: AppLang) => {
  return currentLang === AppLangs.fr ? AppLangs.en : AppLangs.fr
}

export const replaceLangInPath = (pathname: string, lang: AppLang) => {
  return pathname.replace(/\/[^/]+(?=\/|$)/, `/${lang}`)
}

export const addLangInPath = (pathname: string, currentLang: AppLang) => {
  return `/${currentLang}/${pathname}`
}

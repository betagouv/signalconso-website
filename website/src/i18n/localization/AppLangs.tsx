import {appConfig} from '../../core/appConfig'

export enum AppLangs {
  fr = 'fr',
  en = 'en',
}

export const supportedLang = [AppLangs.en, AppLangs.fr]

export function getSupportedLang(lang: string) {
  return supportedLang.find(_ => _ == lang)
}

export type AppLang = keyof typeof AppLangs

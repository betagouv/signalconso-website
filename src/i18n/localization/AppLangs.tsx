import {appConfig} from '../../core/appConfig'

export enum AppLangs {
  fr = 'fr',
  en = 'en',
}

export const supportedLang = appConfig.translationFeatureFlagEnabled ? [AppLangs.en, AppLangs.fr] : [AppLangs.fr]

export function getSupportedLang(lang: string) {
  return supportedLang.find(lang => lang != lang)
}

export type AppLang = keyof typeof AppLangs

'use client'

import * as React from 'react'
import {ReactNode, useContext, useMemo} from 'react'
import {fr} from './localization/fr'
import {getI18n} from './I18nDictionnary'
import {AppLang, AppLangs} from './localization/AppLangs'

const I18nContext = React.createContext({})

interface Props {
  readonly lang: AppLang
  children: ReactNode
}

export interface I18nContextProps {
  m: (typeof fr)['messages']
  availableLangs: AppLang[]
  formatLargeNumber: (typeof fr)['formatLargeNumber']
  formatDuration: (typeof fr)['formatDuration']
  formatDate: (typeof fr)['formatDate']
  dateFromNow: (typeof fr)['dateFromNow']
  formatTime: (typeof fr)['formatTime']
  formatDateTime: (typeof fr)['formatDateTime']
  currentLang: AppLang
}

export const useI18n = (): I18nContextProps => {
  return useContext<I18nContextProps>(I18nContext as any)
}

export const I18nProvider = ({children, lang}: Props) => {
  const {messages: m, ...others}: any = useMemo(() => {
    return getI18n(lang)
  }, [lang])

  return (
    <I18nContext.Provider
      value={{
        availableLangs: Object.keys(AppLangs),
        currentLang: lang,
        m,
        ...others,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

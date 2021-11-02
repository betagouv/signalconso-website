import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {messagesFr} from './messages/messages.fr'
import {formatDate, formatDateTime, formatTime} from './date'
import {formatDistance} from 'date-fns'

const I18nContext = React.createContext({})

export enum AppLangs {
  en = 'en',
  fr = 'fr',
}

export type AppLang = keyof typeof AppLangs

interface Props {
  lang?: AppLang
  children: ReactNode
}

export interface I18nContextProps {
  m: typeof messagesFr
  availableLangs: AppLang[]
  formatLargeNumber: (n?: number) => string
  formatDuration: (ms?: number) => string
  formatDate: (d?: Date) => string
  dateFromNow: (d?: Date) => string
  formatTime: (d?: Date) => string
  formatDateTime: (d?: Date) => string
}

export const useI18n = (): I18nContextProps => {
  return useContext<I18nContextProps>(I18nContext as any)
}

export const withI18n = (Component: any) => (props: any) =>
  <I18nContext.Consumer>{(other: any) => <Component {...props} {...other} />}</I18nContext.Consumer>

export const langToLocal = (lang: string) => `${lang}-${lang.toUpperCase()}`

export const I18nProvider = ({children, lang = AppLangs.fr}: Props) => {
  const getMessages = (): typeof messagesFr => {
    switch (lang) {
      default:
        return messagesFr
    }
  }

  return (
    <I18nContext.Provider
      value={{
        m: getMessages(),
        availableLangs: Object.keys(AppLangs),
        formatLargeNumber: (n?: number) => (n !== undefined && n !== null ? n.toLocaleString(langToLocal(lang)) : '-'),
        dateFromNow: (d?: Date) => (d ? formatDistance(d, new Date(), {addSuffix: true}) : undefined),
        formatDate: formatDate,
        formatTime: formatTime,
        formatDateTime: formatDateTime,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

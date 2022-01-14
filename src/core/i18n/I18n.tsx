import * as React from 'react'
import {ReactNode, useContext, useMemo} from 'react'
import {fr} from './localization/fr'

const I18nContext = React.createContext({})

export enum AppLangs {
  fr = 'fr',
}

export type AppLang = keyof typeof AppLangs

interface Props {
  readonly lang?: AppLang
  children: ReactNode
}

export interface I18nContextProps {
  m: typeof fr['messages']
  availableLangs: AppLang[]
  formatLargeNumber: typeof fr['formatLargeNumber']
  formatDuration: typeof fr['formatDuration']
  formatDate: typeof fr['formatDate']
  dateFromNow: typeof fr['dateFromNow']
  formatTime: typeof fr['formatTime']
  formatDateTime: typeof fr['formatDateTime']
}

export const useI18n = (): I18nContextProps => {
  return useContext<I18nContextProps>(I18nContext as any)
}

export const withI18n = (Component: any) => (props: any) =>
  <I18nContext.Consumer>{(other: any) => <Component {...props} {...other} />}</I18nContext.Consumer>

export const I18nProvider = ({children, lang = AppLangs.fr}: Props) => {
  const {messages: m, ...others}: typeof fr = useMemo(() => {
    switch (lang) {
      case AppLangs.fr:
        return fr
      default:
        return fr
    }
  }, [lang])

  return (
    <I18nContext.Provider
      value={{
        availableLangs: Object.keys(AppLangs),
        m,
        ...others,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

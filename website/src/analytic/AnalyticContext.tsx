import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {Analytic} from './analytic'

export interface AnalyticContextProps {
  trackEvent: Analytic['trackEvent']
  trackSearch: Analytic['trackSearch']
  setTrackedCompanyKind: Analytic['setTrackedCompanyKind']
}

interface Props {
  analytic?: Analytic
  children: ReactNode
}

const defaultContext: Partial<AnalyticContextProps> = {}

const AnalyticContext = React.createContext<AnalyticContextProps>(defaultContext as AnalyticContextProps)

export const AnalyticProvider = ({analytic, children}: Props) => {
  return (
    <AnalyticContext.Provider
      value={{
        // analytics are not available server-side
        trackEvent: analytic?.trackEvent ?? (() => {}),
        trackSearch: analytic?.trackSearch ?? (() => {}),
        setTrackedCompanyKind: analytic?.setTrackedCompanyKind ?? (() => {}),
      }}
    >
      {children}
    </AnalyticContext.Provider>
  )
}

export const useAnalyticContext = (): AnalyticContextProps => {
  return useContext<AnalyticContextProps>(AnalyticContext)
}

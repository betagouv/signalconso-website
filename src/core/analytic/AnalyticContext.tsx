import * as React from 'react'
import {ReactNode, useContext} from 'react'
import {Analytic} from './analytic'

export interface AnalyticContextProps {
  trackEvent: Analytic['trackEvent']
  trackPage: Analytic['trackPage']
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
        trackEvent: analytic?.trackEvent ?? ((...args: any[]) => {}),
        trackPage: analytic?.trackPage ?? ((...args: any[]) => {}),
      }}
    >
      {children}
    </AnalyticContext.Provider>
  )
}

export const useAnalyticContext = (): AnalyticContextProps => {
  return useContext<AnalyticContextProps>(AnalyticContext)
}

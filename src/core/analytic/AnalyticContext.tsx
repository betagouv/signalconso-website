import * as React from 'react'
import {ReactNode, useContext, useMemo} from 'react'
import {Analytic} from './analytic'

export interface AnalyticContextProps {
  trackEvent: Analytic['trackEvent']
}

interface Props {
  children: ReactNode
}

const defaultContext: Partial<AnalyticContextProps> = {}

const AnalyticContext = React.createContext<AnalyticContextProps>(defaultContext as AnalyticContextProps)

export const AnalyticProvider = ({children}: Props) => {
  const analytic = useMemo(() => new Analytic(), [])
  // const [analytic, setAnalytic] = useState()
  // useEffect(() => {
  //   console.log(_paq)
  //   setAnalytic(new Analytic(_paq))
  // }, [])
  return (
    <AnalyticContext.Provider
      value={{
        trackEvent: analytic.trackEvent
      }}
    >
      {children}
    </AnalyticContext.Provider>
  )
}

export const useAnalyticContext = (): AnalyticContextProps => {
  return useContext<AnalyticContextProps>(AnalyticContext)
}

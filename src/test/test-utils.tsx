import React, {ReactNode, useEffect} from 'react'
import {render, RenderResult} from '@testing-library/react'
import {muiTheme} from '../core/theme/theme'
import {ThemeProvider} from '@mui/material'
import {I18nProvider} from '../core/i18n'
import {ReportDraft2, ReportFlowProvider, useReportFlowContext} from '../feature/Report/ReportFlowContext'
import {Provide} from '../shared/Provide/Provide'
import {ApiSdkProvider} from '../core/context/ApiSdk'
import {SignalConsoPublicSdk} from '../../../signalconso-api-sdk-js'
import {fr} from '../core/i18n/localization/fr'
import {StepperContext} from 'shared/Stepper/Stepper'

const AllTheProviders = (apiSdkMock: Partial<SignalConsoPublicSdk> = {}) => ({children}: any) => {
  return (
    <Provide
      providers={[
        _ => <ApiSdkProvider children={_} apiSdk={apiSdkMock as any}/>,
        _ => <ThemeProvider theme={muiTheme()} children={_}/>,
        _ => <I18nProvider children={_}/>,
        _ => <ReportFlowProvider children={_}/>,
      ]}>
      {children}
    </Provide>
  )
}

export const DummyStepperProvider = ({children, currentStep, onGoTo, onNext, onPrev}: {
  children: ReactNode,
  currentStep: number,
  onGoTo?: (i: number) => void,
  onNext?: () => void,
  onPrev?: () => void,
}) => {
  return (
    <StepperContext.Provider value={{
      currentStep,
      goTo: onGoTo ?? (() => void 0),
      next: onNext ?? (() => void 0),
      prev: onPrev ?? (() => void 0),
    }}>
      {children}
    </StepperContext.Provider>
  )
}
export const AccessReportFlow = ({children, onReportChange}: {
  children: ReactNode,
  onReportChange: (_: Partial<ReportDraft2>) => void
}) => {
  const _ = useReportFlowContext()
  useEffect(() => {
    onReportChange(_.reportDraft)
  }, [_.reportDraft])
  return (
    <>{children}</>
  )
}

interface Options {
  apiSdkMock?: Partial<SignalConsoPublicSdk>
}

export interface ScRenderResult extends RenderResult {
  m: typeof fr.messages
}

const customRender = (ui: React.ReactElement, options?: Options) => {
  return {
    ...render(ui, {wrapper: AllTheProviders(options?.apiSdkMock), ...options}),
    m: fr.messages,
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}

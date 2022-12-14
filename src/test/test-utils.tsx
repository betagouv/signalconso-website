import React, {ReactNode, useEffect} from 'react'
import {render, RenderResult} from '@testing-library/react'
import {scTheme} from 'core/theme/theme'
import {ThemeProvider} from '@mui/material'
import {I18nProvider} from 'core/i18n'
import {ReportFlowProvider, useReportFlowContext} from 'feature/Report/ReportFlowContext'
import {Provide} from 'shared/Provide/Provide'
import {ApiSdkProvider} from 'core/context/ApiSdk'
import {fr} from 'core/i18n/localization/fr'
import {ReportFlowStepperContext} from 'shared/ReportFlowStepper/ReportFlowStepper'
import {ReportDraft2} from 'core/model/ReportDraft'
import {DeepPartial} from '../alexlibs/ts-utils'
import {AnalyticProvider} from 'core/analytic/AnalyticContext'
import {SignalConsoPublicSdk} from '../client/SignalConsoPublicSdk'
import {CompanyPublicSdk} from '../client/CompanyPublicSdk'

const AllTheProviders =
  (options?: Options) =>
  ({children}: any) => {
    const apiSdksOverrides = {
      apiSdk: {
        report: {
          create: () => void 0,
        },
        ...(options?.apiSdkMock ?? ({} as any)),
      },
      companyApiSdk: {...(options?.companyApiSdk ?? ({} as any))},
      apiAddressSdk: {
        fetchCity: (q: string) => Promise.resolve([]),
      } as any,
    }
    return (
      <Provide
        providers={[
          _ => <AnalyticProvider children={_} analytic={{trackEvent: () => void 0} as any} />,
          _ => <ApiSdkProvider children={_} overrideForTests={apiSdksOverrides} />,
          _ => <ThemeProvider theme={scTheme} children={_} />,
          _ => <I18nProvider children={_} />,
          _ => <ReportFlowProvider children={_} />,
        ]}
      >
        {children}
      </Provide>
    )
  }

export const DummyStepperProvider = ({
  children,
  currentStep,
  onGoTo,
  onNext,
  onPrev,
}: {
  children: ReactNode
  currentStep: number
  onGoTo?: (i: number) => void
  onNext?: () => void
  onPrev?: () => void
}) => {
  return (
    <ReportFlowStepperContext.Provider
      value={{
        currentStep,
        goTo: onGoTo ?? (() => void 0),
        next: onNext ?? (() => void 0),
        prev: onPrev ?? (() => void 0),
      }}
    >
      {children}
    </ReportFlowStepperContext.Provider>
  )
}
export const AccessReportFlow = ({
  children,
  onReportChange,
}: {
  children: ReactNode
  onReportChange: (_: Partial<ReportDraft2>) => void
}) => {
  const _ = useReportFlowContext()
  useEffect(() => {
    onReportChange(_.reportDraft)
  }, [_.reportDraft])
  return <>{children}</>
}

interface Options {
  apiSdkMock?: DeepPartial<SignalConsoPublicSdk>
  companyApiSdk?: DeepPartial<CompanyPublicSdk>
}

export interface ScRenderResult extends RenderResult {
  m: typeof fr.messages
}

const customRender = (ui: React.ReactElement, options?: Options) => {
  return {
    ...render(ui, {wrapper: AllTheProviders(options), ...options}),
    m: fr.messages,
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}

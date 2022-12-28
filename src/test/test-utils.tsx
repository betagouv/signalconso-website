import React, {ReactNode, useEffect} from 'react'
import {render, RenderResult} from '@testing-library/react'
import {scTheme} from 'core/theme'
import {ThemeProvider} from '@mui/material'
import {I18nProvider} from 'i18n/I18n'
import {ReportFlowProvider, useReportFlowContext} from 'components_feature/Report/ReportFlowContext'
import {Provide} from 'components_simple/Provide/Provide'
import {ApiClientsProvider} from 'context/ApiClientsContext'
import {fr} from 'i18n/localization/fr'
import {ReportFlowStepperContext} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportDraft2} from 'model/ReportDraft2'
import {DeepPartial} from '../utils/utils'
import {AnalyticProvider} from 'analytic/AnalyticContext'
import {SignalConsoApiClient} from '../clients/SignalConsoApiClient'
import {CompanyPublicClient} from '../clients/CompanyPublicClient'
import {ReportStepOrDone} from 'model/ReportStep'

const AllTheProviders =
  (options?: Options) =>
  ({children}: any) => {
    const apiClientsOverrides = {
      signalConsoApiClient: {
        report: {
          create: () => void 0,
        },
        ...(options?.signalConsoApiClient ?? ({} as any)),
      },
      companyApiClient: {...(options?.companyApiClient ?? ({} as any))},
      adresseApiClient: {
        fetchCity: (q: string) => Promise.resolve([]),
      } as any,
    }
    return (
      <Provide
        providers={[
          _ => <AnalyticProvider children={_} analytic={{trackEvent: () => void 0} as any} />,
          _ => <ApiClientsProvider children={_} overrideForTests={apiClientsOverrides} />,
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
  currentStep: ReportStepOrDone
  onGoTo?: (step: ReportStepOrDone) => void
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
  signalConsoApiClient?: DeepPartial<SignalConsoApiClient>
  companyApiClient?: DeepPartial<CompanyPublicClient>
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

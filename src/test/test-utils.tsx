import {AnalyticProvider} from '@/analytic/AnalyticContext'
import {ReportCreateProvider} from '@/components_feature/reportFlow/ReportCreateContext'
import {PartialReport, ReportFlowProvider, useReportFlowContext} from '@/components_feature/reportFlow/ReportFlowContext'
import {ProvidersChain} from '@/components_simple/ProvidersChain'
import {ApiClientsProvider} from '@/context/ApiClientsContext'
import {AutoscrollProvider} from '@/context/AutoscrollContext'
import {I18nProvider} from '@/i18n/I18n'
import {fr} from '@/i18n/localization/fr'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {RenderResult, render} from '@testing-library/react'
import React, {ReactNode, useEffect} from 'react'
import {CompanyPublicClient} from '../clients/CompanyPublicClient'
import {SignalConsoApiClient} from '../clients/SignalConsoApiClient'
import {AppLangs} from '../i18n/localization/AppLangs'
import {DeepPartial} from '../utils/utils'

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
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // turns retries off for tests
          retry: false,
        },
      },
    })
    return (
      <ProvidersChain
        providers={[
          _ => <QueryClientProvider client={queryClient} children={_} />,
          _ => <AnalyticProvider children={_} analytic={{trackEvent: () => void 0} as any} />,
          _ => <ApiClientsProvider children={_} overrideForTests={apiClientsOverrides} />,
          _ => <I18nProvider lang={AppLangs.fr} children={_} />,
          _ => <ReportCreateProvider children={_} />,
          _ => <ReportFlowProvider children={_} initialReportForTests={options?.initialReport} />,
          _ => <AutoscrollProvider children={_} />,
        ]}
      >
        {children}
      </ProvidersChain>
    )
  }

export const AccessReportFlow = ({
  children,
  onReportChange,
}: {
  children: ReactNode
  onReportChange: (_: PartialReport) => void
}) => {
  const _ = useReportFlowContext()
  useEffect(() => {
    onReportChange(_.report)
  }, [_.report])
  return <>{children}</>
}

interface Options {
  signalConsoApiClient?: DeepPartial<SignalConsoApiClient>
  companyApiClient?: DeepPartial<CompanyPublicClient>
  initialReport?: PartialReport
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

import {pagesDefs} from 'core/pagesDefinitions'
import Link from 'next/link'
import {ReactNode} from 'react'
import {ReportFlowStepperWithoutSsr} from '../components_simple/ReportFlowStepper/ReportFlowStepperWithoutSsr'
import {Anomaly} from '../anomalies/Anomaly'
import {appConfig} from 'core/appConfig'

export const FaireUnSignalementPage = ({anomaly, isWebView}: {anomaly: Anomaly; isWebView: boolean}) => {
  return (
    <>
      <Container {...{isWebView}}>
        <h1 className="fr-h2">
          {!isWebView && (
            <Link href={pagesDefs.index.url} className="!bg-none mr-4">
              <span className="ri-arrow-left-line" aria-hidden="true"></span>
            </Link>
          )}
          {anomaly.title}
        </h1>
        <ReportFlowStepperWithoutSsr {...{anomaly, isWebView}} />
      </Container>
    </>
  )
}
// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
// const ReportFlowStepperWithoutSsr = dynamic(() => Promise.resolve(ReportFlowStepper), {ssr: false})

function Container({isWebView, children}: {isWebView: boolean; children: ReactNode}) {
  return isWebView ? (
    <div className="max-w-[624px] px-4 mx-auto pb-4">
      <WebviewEnvMarker />
      {children}
    </div>
  ) : (
    <div className="fr-container fr-pt-6w fr-pb-4w ">
      <div className="fr-grid-row ">
        <div className="fr-col-12  fr-col-lg-10 fr-col-xl-8 ">{children}</div>
      </div>
    </div>
  )
}

function WebviewEnvMarker() {
  const marker = appConfig.envMarker ?? (appConfig.isDev ? 'dév' : null)
  if (marker) {
    return (
      <div className="absolute z-[999] pointer-events-none top-0 left-0 w-full flex items-center justify-center">
        <div className="text-green-900 border-green-900 border border-solid w-fit p-1 text-sm bg-white bg-opacity-80">
          webview {marker}
        </div>
      </div>
    )
  }
  return null
}

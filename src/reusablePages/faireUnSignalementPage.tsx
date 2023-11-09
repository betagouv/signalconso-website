import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'
import {appConfig} from '@/core/appConfig'
import {ReactNode} from 'react'
import {Anomaly} from '../anomalies/Anomaly'
import {ReportFlowStepperWithoutSsr} from '../components_feature/reportFlow/reportFlowStepper/ReportFlowStepperWithoutSsr'

export const FaireUnSignalementPage = ({anomaly, isWebView}: {anomaly: Anomaly; isWebView: boolean}) => {
  return (
    <Container {...{isWebView}}>
      <ReportFlowStepperWithoutSsr {...{anomaly, isWebView}} />
    </Container>
  )
}

function Container({isWebView, children}: {isWebView: boolean; children: ReactNode}) {
  return isWebView ? (
    <div className="max-w-[624px] px-4 mx-auto pb-4">
      <WebviewEnvMarker />
      {children}
    </div>
  ) : (
    <LimitedWidthPageContainer>{children}</LimitedWidthPageContainer>
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

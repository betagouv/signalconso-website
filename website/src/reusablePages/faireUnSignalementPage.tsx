import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'
import {ReactNode} from 'react'
import {Anomaly} from 'shared/anomalies/Anomaly'
import {ReportFlowStepper} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {WebviewEnvMarker} from '@/utils/WebviewEnvMarker'

export const FaireUnSignalementPage = ({anomaly, isWebView}: {anomaly: Anomaly; isWebView: boolean}) => {
  return (
    <Container {...{isWebView}}>
      <ReportFlowStepper {...{anomaly, isWebView}} />
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

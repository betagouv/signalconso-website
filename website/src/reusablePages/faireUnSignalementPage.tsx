import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'
import {ReactNode} from 'react'
import {Anomaly} from 'shared/anomalies/Anomaly'
import {ReportFlowStepper} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {WebviewEnvMarker} from '@/utils/WebviewEnvMarker'
import {Alert} from '@codegouvfr/react-dsfr/Alert'

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
      <Alert
        title="L’application mobile SignalConso va bientôt être retirée des stores."
        severity="warning"
        description="Elle ne sera plus mise à jour.
Pour continuer à utiliser le service, rendez-vous sur le site de SignalConso : signal.conso.gouv.fr"
      />
      <br />
      <WebviewEnvMarker />
      {children}
    </div>
  ) : (
    <LimitedWidthPageContainer>{children}</LimitedWidthPageContainer>
  )
}

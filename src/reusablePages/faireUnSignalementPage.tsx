import {pagesDefs} from 'core/pagesDefinitions'
import Link from 'next/link'
import {ReactNode} from 'react'
import {ReportFlowStepperWithoutSsr} from '../components_simple/ReportFlowStepper/ReportFlowStepperWithoutSsr'
import {Anomaly} from '../anomalies/Anomaly'

export const FaireUnSignalementPage = ({anomaly, isWebView = false}: {anomaly: Anomaly; isWebView?: boolean}) => {
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
    <div className="max-w-[624px] px-4 mx-auto pb-4">{children}</div>
  ) : (
    <div className="fr-container fr-pt-6w fr-pb-4w ">
      <div className="fr-grid-row ">
        <div className="fr-col-12  fr-col-lg-10 fr-col-xl-8 ">{children}</div>
      </div>
    </div>
  )
}

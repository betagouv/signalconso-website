import {ReportFlowStepper} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {appConfig} from 'core/appConfig'
import {buildLinkLandingPage, siteMap} from 'core/siteMap'
import {GetStaticPaths, GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import {undefinedIfNull} from 'utils/utils'
import {allAnomalies} from '../anomalies/Anomalies'
import {ReactNode} from 'react'

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allAnomalies.map(_ => ({
    params: {categoryPath: _.path},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = ({params = {}}) => {
  const categoryPath = params.categoryPath
  if (typeof categoryPath !== 'string') {
    throw new Error(`Unexpected type of reportPath : ${typeof categoryPath}`)
  }
  return {
    props: {categoryPath},
  }
}

export const FaireUnSignalementPage = ({categoryPath, isWebView = false}: {categoryPath: string; isWebView?: boolean}) => {
  const anomaly = allAnomalies.find(_ => _.path === categoryPath)
  if (!anomaly) {
    throw new Error(`Cannot find anomaly for categoryPath : ${categoryPath}`)
  }
  return (
    <>
      <Head>
        <link rel="canonical" href={appConfig.appBaseUrl + buildLinkLandingPage(anomaly)} key="canonical" />
        <title>{anomaly.seoTitle + ' - SignalConso'}</title>
        <meta name="description" content={undefinedIfNull(anomaly.seoDescription ?? anomaly.description)} />
      </Head>

      <Container {...{isWebView}}>
        <h1 className="fr-h2">
          {!isWebView && (
            <Link href={siteMap.index} className="!bg-none mr-4">
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
const ReportFlowStepperWithoutSsr = dynamic(() => Promise.resolve(ReportFlowStepper), {ssr: false})

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

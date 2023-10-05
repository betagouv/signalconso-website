'use client'

import {Button} from '@codegouvfr/react-dsfr/Button'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {allVisibleAnomalies} from 'anomalies/Anomalies'
import {InfoBanner} from 'components_simple/bigBanners/InfoBanner'
import {IllustrationStepper} from 'components_simple/StepIllustrations'
import {useI18n} from 'i18n/I18n'
import dynamic from 'next/dynamic'
import {useEffect, useMemo} from 'react'
import * as smoothscroll from 'smoothscroll-polyfill'
import company from '../../../public/image/illustrations/company.png'
import consumer from '../../../public/image/illustrations/consumer.png'
import dgccrf from '../../../public/image/illustrations/dgccrf.png'
import report from '../../../public/image/illustrations/report.png'
import {useReportFlowContext} from '../../components_feature/reportFlow/ReportFlowContext'
import {BrowserCompatAlert} from '../../components_simple/bigBanners/BrowserAlertCompat'
import SearchAnomalies from '../../components_simple/SearchAnomalies'
import {MobileAppPromoBanner} from 'components_simple/bigBanners/MobileAppPromoBanner'
import {ForeignVisitorsQaPromoBanner} from 'components_simple/bigBanners/ForeignVisitorsQaPromoBanner'
import {AppLangs} from 'i18n/localization/AppLangs'
import {HP_START_REPORT_ANCHOR} from 'core/pagesDefinitions'
import {bigReportButtonProps, getBigReportButtonText} from 'components_simple/buttons/buttonsUtils'

const ReportStartedAlert = dynamic(() => import('components_feature/ReportStartedAlert'), {ssr: false})

const Home = () => {
  const {m, currentLang} = useI18n()
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  const anomalies = allVisibleAnomalies(currentLang)
  const _report = useReportFlowContext()
  const hasStoredReport = useMemo(() => !!_report.reportDraft.anomaly, [_report.reportDraft])
  const dsfrTheme = useColors()
  const isWebView = false
  return (
    <>
      <main role="main" id="main-content">
        <div>
          <div className="fr-container">
            <InfoBanner />
            <BrowserCompatAlert />
            <MobileAppPromoBanner />
          </div>
          <div className="fr-container fr-pt-8w fr-pb-6w ">
            <h1 dangerouslySetInnerHTML={{__html: m.homepage.signalconsoCatchWord}} />
            <IllustrationStepper
              steps={[
                {title: m.homepage.step1, image: consumer, alt: ''},
                {title: m.homepage.step2, image: report, alt: ''},
                {
                  title: m.homepage.step3,
                  image: company,
                  alt: '',
                },
                {title: m.homepage.step4, image: dgccrf, alt: ''},
              ]}
            />
            <div className="flex items-center justify-center fr-pt-4w">
              <Button
                onClick={() => {
                  document
                    .querySelector(`#${HP_START_REPORT_ANCHOR}`)
                    ?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
                }}
                {...bigReportButtonProps}
              >
                {m.buttonReportProblem}
              </Button>
            </div>
            {currentLang === AppLangs.en && <ForeignVisitorsQaPromoBanner />}
          </div>
        </div>
        <div id={HP_START_REPORT_ANCHOR} style={{background: dsfrTheme.decisions.background.actionLow.blueFrance.default}}>
          <div className="fr-container fr-pt-8w fr-pb-8w">
            <SearchAnomalies anomalies={anomalies} />
          </div>
        </div>
      </main>
      {hasStoredReport ? <ReportStartedAlert /> : <></>}
    </>
  )
}

export default Home

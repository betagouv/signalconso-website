'use client'

import {allAnomaliesForHomepage} from '@/anomalies/Anomalies'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {IllustrationStepper} from '@/components_simple/StepIllustrations/StepIllustrations'
import {ForeignVisitorsQaPromoBanner} from '@/components_simple/bigBanners/ForeignVisitorsQaPromoBanner'
import {InfoBanner} from '@/components_simple/bigBanners/InfoBanner'
import {MobileAppPromoBanner} from '@/components_simple/bigBanners/MobileAppPromoBanner'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {HP_START_REPORT_ANCHOR} from '@/core/pagesDefinitions'
import {hasLangAndCategory} from '@/feature/reportDraftUtils'
import {useI18n} from '@/i18n/I18n'
import {AppLangs} from '@/i18n/localization/AppLangs'
import imgCompany from '@/img/illustrations/company.png'
import imgConsumer from '@/img/illustrations/consumer.png'
import imgDgccrf from '@/img/illustrations/dgccrf.png'
import imgReport from '@/img/illustrations/report.png'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import dynamic from 'next/dynamic'
import {useEffect} from 'react'
import * as smoothscroll from 'smoothscroll-polyfill'
import {useReportFlowContext} from '../../components_feature/reportFlow/ReportFlowContext'
import SearchAnomalies from '../../components_simple/SearchAnomalies'
import {BrowserCompatAlert} from '../../components_simple/bigBanners/BrowserAlertCompat'

const ReportStartedAlert = dynamic(() => import('@/components_feature/ReportStartedAlert'), {ssr: false})

export const Homepage = () => {
  const {m, currentLang} = useI18n()
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  const anomalies = allAnomaliesForHomepage(currentLang)
  const {reportDraft} = useReportFlowContext()
  const hasStoredReport = hasLangAndCategory(reportDraft)
  const dsfrTheme = useColors()
  return (
    <>
      <FullWidthPageContainer>
        <div>
          <MobileAppPromoBanner />
          <div className="fr-container">
            <InfoBanner />
            <BrowserCompatAlert />
          </div>
          <div className="fr-container fr-pt-8w fr-pb-6w ">
            <h1 dangerouslySetInnerHTML={{__html: m.homepage.signalconsoCatchWord}} />
            <IllustrationStepper
              steps={[
                {title: m.homepage.step1, image: imgConsumer},
                {title: m.homepage.step2, image: imgReport},
                {
                  title: m.homepage.step3,
                  image: imgCompany,
                },
                {title: m.homepage.step4, image: imgDgccrf},
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
      </FullWidthPageContainer>
      {hasStoredReport ? <ReportStartedAlert /> : <></>}
    </>
  )
}

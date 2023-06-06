import {Button} from '@codegouvfr/react-dsfr/Button'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {allVisibleAnomalies, createFuseIndex} from 'anomalies/Anomalies'
import {InfoBanner} from 'components_feature/InfoBanner/InfoBanner'
import {IllustrationStepper} from 'components_simple/IllustrationStepper/StepIllustrations'
import Fuse from 'fuse.js'
import {useI18n} from 'i18n/I18n'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {useEffect, useMemo} from 'react'
import * as smoothscroll from 'smoothscroll-polyfill'
import company from '../../public/image/illustrations/company.png'
import consumer from '../../public/image/illustrations/consumer.png'
import dgccrf from '../../public/image/illustrations/dgccrf.png'
import report from '../../public/image/illustrations/report.png'
import {useReportFlowContext} from '../components_feature/Report/ReportFlowContext'
import {BrowserCompatAlert} from '../components_simple/BrowserCompatAlert/BrowserAlertCompat'
import SearchAnomalies from '../components_simple/Search/SearchAnomalies'

const ReportStartedAlert = dynamic(() => import('components_feature/ReportStartedAlert/ReportStartedAlert'), {ssr: false})

const Home = () => {
  const {m} = useI18n()
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])
  const anomalies = allVisibleAnomalies()
  const _report = useReportFlowContext()
  const hasStoredReport = useMemo(() => !!_report.reportDraft.anomaly, [_report.reportDraft])
  const dsfrTheme = useColors()
  const fIndex = createFuseIndex(allVisibleAnomalies())

  const fuse = new Fuse(fIndex, {
    keys: ['title', 'desc'],
    threshold: 0.2,
    minMatchCharLength: 3,
    distance: 100,
    ignoreLocation: true,
  })

  return (
    <>
      <Head>
        <title>SignalConso, un service public pour les consommateurs</title>
        <meta
          name="description"
          content="Signalez un problème au commerçant (magasins, commerces de proximité, cafés et restaurants...) et à la répression des fraudes : pratique d'hygiène, nourriture / boissons, matériel / objet, prix / paiement, publicité, services associés à l'achat."
        />
      </Head>
      <main>
        <div>
          <div className="fr-container">
            <InfoBanner />
            <BrowserCompatAlert />
          </div>
          <div className="fr-container fr-pt-8w fr-pb-6w ">
            <h1 dangerouslySetInnerHTML={{__html: m.signalconsoCatchWord}} />
            <IllustrationStepper
              steps={[
                {title: 'Vous avez rencontré un problème avec une entreprise&#160;?', image: consumer, alt: 'consumer'},
                {title: 'Faites un signalement ou posez une question à la répression des fraudes.', image: report, alt: 'report'},
                {
                  title: "Vous pouvez en informer l'entreprise pour qu’elle vous réponde ou se corrige.",
                  image: company,
                  alt: 'company',
                },
                {title: 'La répression des fraudes intervient si nécessaire.', image: dgccrf, alt: 'dgccrf'},
              ]}
            />
            <div className="flex items-center justify-center fr-pt-4w">
              <Button
                iconId="fr-icon-alarm-warning-line"
                onClick={() => {
                  document
                    .querySelector('#index-categories')
                    ?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
                }}
                size="large"
              >
                {m.buttonReportProblem}
              </Button>
            </div>
          </div>
        </div>
        <div id="index-categories" style={{background: dsfrTheme.decisions.background.actionLow.blueFrance.default}}>
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

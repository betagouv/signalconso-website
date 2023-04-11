import {Box, Divider, Grid} from '@mui/material'
import {Theme} from '@mui/material/styles'
import {SxProps} from '@mui/system'
import {allVisibleAnomalies} from 'anomalies/Anomalies'
import {Section} from 'components_simple/Section'
import {useI18n} from 'i18n/I18n'
import {InfoBanner} from 'components_feature/InfoBanner/InfoBanner'
import {useRgpdBanner} from 'components_feature/RgpdBanner/RgpdBanner'
import Head from 'next/head'
import {useEffect, useMemo} from 'react'
import {AnomalyCard} from 'components_simple/AnomalyCard/AnomalyCard'
import {ScButton} from 'components_simple/Button/Button'
import {IllustrationStepper} from 'components_simple/IllustrationStepper/StepIllustrations'
import * as smoothscroll from 'smoothscroll-polyfill'
import company from '../../public/image/illustrations/company.png'
import consumer from '../../public/image/illustrations/consumer.png'
import dgccrf from '../../public/image/illustrations/dgccrf.png'
import report from '../../public/image/illustrations/report.png'
import dynamic from 'next/dynamic'
import {useReportFlowContext} from '../components_feature/Report/ReportFlowContext'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
const sxTitle: SxProps<Theme> = {
  fontSize: 24,
  mb: 3,
  mt: 2,
}

const ReportStartedAlert = dynamic(() => import('components_feature/ReportStartedAlert/ReportStartedAlert'), {ssr: false})

const Home = () => {
  const {m} = useI18n()
  useRgpdBanner()
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])
  const anomalies = allVisibleAnomalies()
  const _report = useReportFlowContext()
  const hasStoredReport = useMemo(() => !!_report.reportDraft.anomaly, [_report.reportDraft])

  const dsfrTheme = useColors()

  return (
    <>
      <Head>
        <title>SignalConso, un service public pour les consommateurs</title>
        <meta
          name="description"
          content="Signalez un problème au commerçant (magasins, commerces de proximité, cafés et restaurants...) et à la répression des fraudes : pratique d'hygiène, nourriture / boissons, matériel / objet, prix / paiement, publicité, services associés à l'achat."
        />
      </Head>
      <InfoBanner />
      <main>
        <section
          className="text-center px-4 py-6 xl:px-10 xl:py-14  text-[22px] xl:text-[32px]"
          dangerouslySetInnerHTML={{__html: m.signalconsoCatchWord}}
          style={{background: dsfrTheme.decisions.background.default.grey.active}}
        />

        <Section>
          <h2 className="font-normal text-2xl mt-4">Comment ça marche ?</h2>
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

          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 4, pb: 3}}>
            <ScButton
              onClick={() => {
                document
                  .querySelector('#index-categories')
                  ?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
              }}
              size="large"
              variant="contained"
              color="error"
              sx={{
                textTransform: 'unset',
                fontWeight: t => t.typography.fontWeightBold,
                background: '#be3d4d',
              }}
              iconAfter="feedback"
            >
              {m.buttonReportProblem}
            </ScButton>
          </Box>
        </Section>
        <Section
          id="index-categories"
          component="section"
          style={{background: dsfrTheme.decisions.background.default.grey.active}}
        >
          <Box component="h2" sx={{...sxTitle}}>
            Quel problème avez-vous rencontré ?
          </Box>
          <Grid container spacing={3}>
            {anomalies.map(a => (
              <Grid key={a.path} item xs={12} sm={6} md={4}>
                <AnomalyCard anomaly={a} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </main>
      {hasStoredReport ? <ReportStartedAlert /> : <></>}
    </>
  )
}

export default Home

import {Box, Divider, Grid} from '@mui/material'
import {Theme} from '@mui/material/styles'
import {SxProps} from '@mui/system'
import {allVisibleAnomalies} from 'anomaly/Anomalies'
import {Section} from 'core/component/Section'
import {useI18n} from 'core/i18n'
import {sortBy} from 'core/lodashNamedExport'
import {useWindowWidth} from 'core/useWindowWidth'
import {InfoBanner} from 'feature/InfoBanner/InfoBanner'
import {ReportStartedAlert} from 'feature/ReportStartedAlert/ReportStartedAlert'
import {useRgpdBanner} from 'feature/RgpdBanner/RgpdBanner'
import Head from 'next/head'
import {useEffect} from 'react'
import {AnomalyCard} from 'shared/AnomalyCard/AnomalyCard'
import {ScButton} from 'shared/Button/Button'
import {IllustrationStepper} from 'shared/IllustrationStepper/StepIllustrations'
import * as smoothscroll from 'smoothscroll-polyfill'
import company from '../../public/image/illustrations/company.png'
import consumer from '../../public/image/illustrations/consumer.png'
import dgccrf from '../../public/image/illustrations/dgccrf.png'
import report from '../../public/image/illustrations/report.png'

const sxTitle: SxProps<Theme> = {
  fontSize: 24,
  mb: 3,
  mt: 2,
}

const Home = () => {
  const {m} = useI18n()
  const {isMobileWidthMax} = useWindowWidth()
  useRgpdBanner()
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])
  const anomalies = sortBy(allVisibleAnomalies(), _ => parseInt(_.id))
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
        <Section
          sx={{
            background: t => t.palette.primary.main,
            color: t => t.palette.primary.contrastText,
            textAlign: 'center',
            padding: isMobileWidthMax ? 1 : 5,
            fontSize: isMobileWidthMax ? 22 : 32,
          }}
          dangerouslySetInnerHTML={{__html: m.signalconsoCatchWord}}
        />

        <Section>
          <Box component="h2" sx={sxTitle}>
            Comment ça marche ?
          </Box>
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
              // {title: 'Vous avez rencontré un problème<br/>avec une entreprise&#160;?', image: consumer, alt: 'consumer'},
              // {title: 'Faites un signalement<br/>avec SignalConso.', image: report, alt: 'report'},
              // {title: 'L\'entreprise est prévenue<br/>et peut intervenir.', image: company, alt: 'company'},
              // {title: 'La répression des fraudes intervient si nécessaire.', image: dgccrf, alt: 'dgccrf'},
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
        <Divider />
        <Section
          id="index-categories"
          component="section"
          sx={{
            background: `linear-gradient(180deg,#407ca8,#2a8194 99.99%,#5a4b5f)`,
          }}
        >
          <Box component="h2" sx={{...sxTitle, color: t => t.palette.getContrastText(t.palette.primary.main)}}>
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
      <ReportStartedAlert />
    </>
  )
}

export default Home

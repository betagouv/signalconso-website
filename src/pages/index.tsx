import type {GetStaticProps} from 'next'
import {Theme} from '@mui/material/styles'
import {IllustrationStepper} from 'shared/IllustrationStepper/StepIllustrations'
import {Box, Divider, Grid} from '@mui/material'
import {apiSdk} from 'core/apiSdk'
import {AnomalyCard} from 'shared/AnomalyCard/AnomalyCard'
import {serializeJsonForStupidNextJs} from 'core/helper/utils'
import {SxProps} from '@mui/system'
import {ScButton} from 'shared/Button/Button'
import {useI18n} from 'core/i18n'
import {Section} from 'core/component/Section'
import {ReportStartedAlert} from 'feature/ReportStartedAlert/ReportStartedAlert'
import {sortBy} from 'core/lodashNamedExport'
import consumer from '../../public/image/illustrations/consumer.png'
import report from '../../public/image/illustrations/report.png'
import company from '../../public/image/illustrations/company.png'
import dgccrf from '../../public/image/illustrations/dgccrf.png'
import {useWindowWidth} from 'core/useWindowWidth'
import {useRgpdBanner} from 'feature/RgpdBanner/RgpdBanner'
import {InfoBanner} from 'feature/InfoBanner/InfoBanner'
import * as smoothscroll from 'smoothscroll-polyfill'
import * as React from 'react'
import {useEffect} from 'react'
import Head from 'next/head'
import {Anomaly} from '../anomaly/Anomaly'

const sxTitle: SxProps<Theme> = {
  fontSize: 24,
  mb: 3,
  mt: 2,
}

export const getStaticProps: GetStaticProps = async context => {
  const anomalies = await apiSdk.anomaly
    .getAnomalies()
    .then(res => res.filter(_ => !_.hidden))
    .then(res => sortBy(res, _ => parseInt(_.id)))
  return {
    props: serializeJsonForStupidNextJs({
      anomalies,
    }),
  }
}

// = InferGetStaticPropsType<typeof getStaticProps>
interface HomeProps {
  anomalies: Anomaly[]
}

const Home = ({anomalies}: HomeProps) => {
  const {m} = useI18n()
  const {isMobileWidthMax} = useWindowWidth()
  useRgpdBanner()
  useEffect(() => {
    smoothscroll.polyfill()
  }, [])
  return (
    <>
      <Head>
        <title>SignalConso, un service public pour les consommateurs</title>
        <meta
          name="description"
          content="Signalez un probl??me au commer??ant (magasins, commerces de proximit??, caf??s et restaurants...) et ?? la r??pression des fraudes : pratique d'hygi??ne, nourriture / boissons, mat??riel / objet, prix / paiement, publicit??, services associ??s ?? l'achat."
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
            Comment ??a marche ?
          </Box>
          <IllustrationStepper
            steps={[
              {title: 'Vous avez rencontr?? un probl??me avec une entreprise&#160;?', image: consumer, alt: 'consumer'},
              {title: 'Faites un signalement ou posez une question ?? la r??pression des fraudes.', image: report, alt: 'report'},
              {
                title: "Vous pouvez en informer l'entreprise pour qu???elle vous r??ponde ou se corrige.",
                image: company,
                alt: 'company',
              },
              {title: 'La r??pression des fraudes intervient si n??cessaire.', image: dgccrf, alt: 'dgccrf'},
              // {title: 'Vous avez rencontr?? un probl??me<br/>avec une entreprise&#160;?', image: consumer, alt: 'consumer'},
              // {title: 'Faites un signalement<br/>avec SignalConso.', image: report, alt: 'report'},
              // {title: 'L\'entreprise est pr??venue<br/>et peut intervenir.', image: company, alt: 'company'},
              // {title: 'La r??pression des fraudes intervient si n??cessaire.', image: dgccrf, alt: 'dgccrf'},
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
            Quel probl??me avez-vous rencontr?? ?
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

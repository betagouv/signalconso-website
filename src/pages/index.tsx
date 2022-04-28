import type {GetStaticProps} from 'next'
import {Theme} from '@mui/material/styles'
import {IllustrationStepper} from 'shared/IllustrationStepper/StepIllustrations'
import {Box, Divider, Grid} from '@mui/material'
import {apiSdk} from 'core/apiSdk'
import {Anomaly} from '@signal-conso/signalconso-api-sdk-js'
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
import {useEffect} from 'react'

const sxTitle: SxProps<Theme> = {
  fontSize: 24,
  mb: 3,
  mt: 2,
}

export const getStaticProps: GetStaticProps = async (context) => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
    .then(res => res.filter(_ => !_.hidden))
    .then(res => sortBy(res, _ => parseInt(_.id)))
  return {
    props: serializeJsonForStupidNextJs({
      anomalies
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
      <InfoBanner/>
      <main>
        <Section sx={{
          background: t => t.palette.primary.main,
          color: t => t.palette.primary.contrastText,
          textAlign: 'center',
          padding: isMobileWidthMax ? 1 : 5,
          fontSize: isMobileWidthMax ? 22 : 32,
          // fontSize: 32,
          // fontWeight: 'lighter'
        }} dangerouslySetInnerHTML={{__html: m.signalconsoCatchWord}}/>

        <Section>
          <Box component="h2" sx={sxTitle}>Comment ça marche ?</Box>
          <IllustrationStepper steps={[
            {title: 'Vous avez rencontré un problème avec une entreprise&#160;?', image: consumer, alt: 'consumer'},
            {title: 'Faites un signalement avec SignalConso.', image: report, alt: 'report'},
            {title: 'L\'entreprise est prévenue et peut intervenir.', image: company, alt: 'company'},
            {title: 'La répression des fraudes intervient si nécessaire.', image: dgccrf, alt: 'dgccrf'},
            // {title: 'Vous avez rencontré un problème<br/>avec une entreprise&#160;?', image: consumer, alt: 'consumer'},
            // {title: 'Faites un signalement<br/>avec SignalConso.', image: report, alt: 'report'},
            // {title: 'L\'entreprise est prévenue<br/>et peut intervenir.', image: company, alt: 'company'},
            // {title: 'La répression des fraudes intervient si nécessaire.', image: dgccrf, alt: 'dgccrf'},
          ]}/>

          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 4, pb: 3}}>
            <ScButton
              onClick={() => {
                document.querySelector('#index-categories')?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
              }}
              size="large"
              variant="contained"
              color="error"
              sx={{
                textTransform: 'unset',
                fontWeight: t => t.typography.fontWeightBold,
                background: '#be3d4d'
              }}
              iconAfter="feedback"
            >
              {m.buttonReportProblem}
            </ScButton>
          </Box>
        </Section>
        <Divider/>
        <Section id="index-categories" component="section" sx={{
          background: `linear-gradient(180deg,#407ca8,#2a8194 99.99%,#5a4b5f)`,
        }}>
          <Box component="h2" sx={{...sxTitle, color: t => t.palette.getContrastText(t.palette.primary.main)}}>
            Quel problème avez-vous rencontré ?
          </Box>
          <Grid container spacing={3}>
            {anomalies.map(a => (
              <Grid key={a.path} item xs={12} sm={6} md={4}>
                <AnomalyCard anomaly={a}/>
              </Grid>
            ))}
          </Grid>
        </Section>
      </main>
      <ReportStartedAlert/>
    </>
  )
}

export default Home

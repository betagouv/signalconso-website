import {buildLinkAirtableLandingPage, buildLinkManualLandingPage} from '@/core/buildLinks'
import {GenerateMetadataArg, PageComponentProps, PathParams} from '@/core/metadatas'
import {ManualLandingsPageSwitch} from '@/landings/manualLandings/ManualLandingsPageSwitch'
import {getManualLandings} from '@/landings/manualLandings/manualLandingsUtils'
import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import LandingPage from '../../../components_feature/LandingPage'
import {getSupportedLang} from '../../../i18n/localization/AppLangs'
import {allVisibleAirtableLandings} from '../../../landings/airtableLandings/airtableLandingsUtils'

type LocalPathParams = PathParams<{
  dynamicPath: string
}>

function getAirtableLandingData(props: {params: LocalPathParams}) {
  const langStr = props.params.lang
  const lang = getSupportedLang(langStr)
  if (lang) {
    return allVisibleAirtableLandings(lang).find(_ => _.url === props.params.dynamicPath)
  }
  return undefined
}

function getManualLandingData(props: {params: LocalPathParams}) {
  const langStr = props.params.lang
  const lang = getSupportedLang(langStr)
  if (lang) {
    return getManualLandings(lang).find(_ => _.url === props.params.dynamicPath)
  }
  return undefined
}

export function generateMetadata(params: GenerateMetadataArg<LocalPathParams>): Metadata {
  const manualLandingData = getManualLandingData(params)
  if (manualLandingData) {
    return {
      title: manualLandingData.seoTitle,
      description: manualLandingData.seoDesc,
      alternates: {
        canonical: buildLinkManualLandingPage(manualLandingData),
      },
    }
  }
  const airtableLandingData = getAirtableLandingData(params)
  if (airtableLandingData) {
    return {
      title: airtableLandingData.seoTitle,
      description: airtableLandingData.seoDescription,
      alternates: {
        // Saw some weird stuff in Google Search Console about landings.
        // Setting the canonical might help
        canonical: buildLinkAirtableLandingPage(airtableLandingData),
      },
    }
  }
  return {}
}

export default function Page(props: PageComponentProps<LocalPathParams>) {
  const lang = props.params.lang
  const manualLandingData = getManualLandingData(props)
  if (manualLandingData) {
    return <ManualLandingsPageSwitch landingData={manualLandingData} />
  }
  const airtableLandingdata = getAirtableLandingData(props)
  if (airtableLandingdata) {
    return <LandingPage {...{landingData: airtableLandingdata, lang}} />
  }
  return notFound()
}

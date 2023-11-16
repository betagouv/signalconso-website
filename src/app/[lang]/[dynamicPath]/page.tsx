import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import LandingPage from '../../../components_feature/LandingPage'
import {getSupportedLang} from '../../../i18n/localization/AppLangs'
import {allVisibleLandings} from '../../../landings/landingDataUtils'
import {buildLinkLandingPage} from '@/core/pagesDefinitions'
import {GenerateMetadataArg, PageComponentProps, PathParams} from '@/core/metadatas'

type LocalPathParams = PathParams<{
  dynamicPath: string
}>

function getLandingData(props: {params: LocalPathParams}) {
  const langStr = props.params.lang
  const lang = getSupportedLang(langStr)
  if (lang) {
    return allVisibleLandings(lang).find(_ => _.url === props?.params?.dynamicPath)
  }
  return undefined
}

export function generateMetadata(params: GenerateMetadataArg<LocalPathParams>): Metadata {
  const landingData = getLandingData(params)
  return landingData
    ? {
        title: landingData.seoTitle,
        description: landingData.seoDescription,
        alternates: {
          // Saw some weird stuff in Google Search Console about landings
          // setting the canonical might help
          canonical: buildLinkLandingPage(landingData),
        },
      }
    : {}
}

export default function Page(props: PageComponentProps<LocalPathParams>) {
  const landingData = getLandingData(props)
  const lang = props.params.lang
  return landingData ? <LandingPage {...{landingData, lang}} /> : notFound()
}

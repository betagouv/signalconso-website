import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import LandingPage from '../../../components_feature/LandingPage'
import {getSupportedLang} from '../../../i18n/localization/AppLangs'
import {allVisibleLandings} from '../../../landings/landingDataUtils'
import {buildLinkLandingPage} from 'core/pagesDefinitions'

type PageProps = {
  dynamicPath: string
  lang: string
}

function getLandingData(props: {params: PageProps}) {
  const langStr = props.params.lang
  const lang = getSupportedLang(langStr)
  if (lang) {
    return allVisibleLandings(lang).find(_ => _.url === props?.params?.dynamicPath)
  }
  return undefined
}

export function generateMetadata(params: {params: PageProps}): Metadata {
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

const Page = (params: {params: PageProps}) => {
  const landingData = getLandingData(params)
  return landingData ? <LandingPage landingData={landingData} /> : notFound()
}
export default Page

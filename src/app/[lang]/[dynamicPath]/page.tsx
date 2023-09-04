import LandingPage from '../../../components_feature/LandingPage'
import {allVisibleLandings} from '../../../landings/landingDataUtils'
import {notFound} from 'next/navigation'
import {Metadata} from 'next'
import {AppLangs} from '../../../i18n/localization/AppLangs'

export type PageProps = {
  dynamicPath: string
  lang: any
}

function getLandingData(props: {params: PageProps}) {
  return props?.params?.lang ? allVisibleLandings(props?.params?.lang).find(_ => _.url === props?.params?.dynamicPath) : undefined
}

export function generateMetadata(params: {params: PageProps}): Metadata {
  const landingData = getLandingData(params)

  return landingData
    ? {
        title: landingData.seoTitle,
        description: landingData.seoDescription,
      }
    : {}
}

const Page = (params: {params: PageProps}) => {
  const landingData = getLandingData(params)
  return landingData ? <LandingPage landingData={landingData} /> : notFound()
}
export default Page

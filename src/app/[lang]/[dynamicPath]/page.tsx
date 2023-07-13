import LandingPage from '../../../reusablePages/LandingPage'
import {allVisibleLandings} from '../../../landings/landingDataUtils'
import {notFound} from 'next/navigation'
import {Metadata} from 'next'

export type PageProps = {
  dynamicPath: string
}

function getLandingData(props: {params: PageProps}) {
  const landingData = allVisibleLandings().find(_ => _.url === props?.params?.dynamicPath)
  return landingData
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

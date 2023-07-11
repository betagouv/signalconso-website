import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useI18n} from '../i18n/I18n'

const AppMobile = () => {
  const {m} = useI18n()

  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.appMobile.title}</title>
        <meta name="description" content={m.titleAndDescriptions.appMobile.description} />
      </Head>
      <ContentPageContainer>
        <h1>{m.appMobile.pageTitle}</h1>

        <div className="float-left mr-4">
          <Image width={177} height={193} src={`/image/mobile_app_screenshots.png`} alt={m.appMobile.screenshotsAlt} />
        </div>
        <p>
          {m.appMobile.introText1}
          <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093" target="_blank">
            {m.introApple}
          </Link>{' '}
          {m.introBetween}
          <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso" target="_blank">
            {m.introGoogle}
          </Link>{' '}
          {m.appMobile.introText2}
        </p>

        <p>{m.appMobile.featureText}</p>

        <p>{m.appMobile.statisticsText}</p>

        <p>{m.appMobile.accessibilityText}</p>

        <p>
          <strong>{m.appMobile.conclusionText}</strong>
        </p>
      </ContentPageContainer>
    </>
  )
}

export default AppMobile

import Image from 'next/image'
import Link from 'next/link'
import {useI18n} from '../i18n/I18n'

export function ArticleAppMobile() {
  const {m} = useI18n()

  return (
    <div>
      <div className="float-left mr-4">
        <Image width={177} height={193} src={`/image/actualites/mobile_app_screenshots.png`} alt={m.articleAppMobile.capturesEcran} />
      </div>
      <p>
        {m.articleAppMobile.intro1}
        <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093" target="_blank">
          {m.introApple}
        </Link>{' '}
        {m.introBetween}
        <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso" target="_blank">
          {m.introGoogle}
        </Link>{' '}
        {m.articleAppMobile.intro2}
      </p>
      <p>{m.articleAppMobile.fonctionnalites}</p>
      <p>{m.articleAppMobile.statistiques}</p>
      <p>{m.articleAppMobile.accessibilite}</p>
      <p>
        <strong>{m.articleAppMobile.cta}</strong>
      </p>
      {/* this banner is too large for mobile viewports, and unreadable if scaled down  */}
      <div className="hidden lg:block">
        <Image width={784} height={416} src={`/image/actualites/signalconso_promo_banner.jpg`} alt={m.articleAppMobile.banner} />
      </div>
    </div>
  )
}

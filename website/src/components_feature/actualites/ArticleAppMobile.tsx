'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useI18n} from '../../i18n/I18n'
import {AppLangs} from '../../i18n/localization/AppLangs'
import imgAppScreenshots from '@/img/actualites/mobile_app_screenshots.png'
import imgPromoBanner from '@/img/actualites/signalconso_promo_banner.jpg'

export function ArticleAppMobile() {
  const {m, currentLang} = useI18n()

  return (
    <div>
      <div className="float-left mr-4">
        <Image width={177} height={193} src={imgAppScreenshots} alt="" />
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
      {currentLang === AppLangs.fr && (
        // this banner is too large for mobile viewports, and unreadable if scaled down
        <div className="hidden lg:block">
          <Image src={imgPromoBanner} alt={m.articleAppMobile.banner} />
        </div>
      )}
    </div>
  )
}

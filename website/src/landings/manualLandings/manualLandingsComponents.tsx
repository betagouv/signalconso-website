import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {buildLinkHomePickCategory, buildLinkStartReport} from '@/core/buildLinks'
import {getI18n} from '@/i18n/I18nDictionnary'
import {AppLang, AppLangs} from '@/i18n/localization/AppLangs'
import elf_f_purple from '@/img/landings/blackfriday/elf_f_purple.svg'
import elf_m_greenblack from '@/img/landings/blackfriday/elf_m_greenblack.svg'
import hero_f_green from '@/img/landings/blackfriday/hero_f_green.svg'
import hero_f_orange from '@/img/landings/blackfriday/hero_f_orange.svg'
import hero_m_blue from '@/img/landings/blackfriday/hero_m_blue.svg'
import hero_m_orange from '@/img/landings/blackfriday/hero_m_orange.svg'
import {ChildrenProps} from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import {ReactNode} from 'react'

export function getManualLpButtonProps(lang: AppLang, category: string | 'home') {
  const href = category === 'home' ? buildLinkHomePickCategory() : buildLinkForCategory(lang, category)
  return {
    ...bigReportButtonProps,
    linkProps: {href},
  }
}

function buildLinkForCategory(lang: AppLang, category: string) {
  const anomaly = allVisibleAnomalies(lang).find(_ => _.category === category)
  if (!anomaly) {
    throw new Error(`Can't find anomaly with category = ${category}`)
  }
  return buildLinkStartReport(anomaly, lang, {isWebView: false})
}

export function LpColoredBand({children, className = ''}: ChildrenProps & {className?: string}) {
  return (
    <div className={className}>
      <div className="fr-container">{children}</div>
    </div>
  )
}

export function BlueBandWhySignalConso({lang, title}: {lang: AppLang | AppLangs; title: string}) {
  const {m} = getI18n(lang)

  return (
    <LpColoredBand className="bg-scblueinfo">
      <div className="py-8">
        <h2 className="text-2xl text-center !text-white mb-12">{title}</h2>
        <div className="flex justify-between items-stretch gap-16 flex-col md:flex-row mb-8">
          <HeroCard title={m.landing.heroCardTitle1} subtext={m.landing.heroCardText1} />
          <HeroCard title={m.landing.heroCardTitle2} subtext={m.landing.heroCardText2} />
          <HeroCard title={m.landing.heroCardTitle3} subtext={m.landing.heroCardText3} />
        </div>
      </div>
    </LpColoredBand>
  )
}

export function HighlightBlue({children}: ChildrenProps) {
  return <span className="bg-scblueinfo text-white px-1">{children}</span>
}
export function HighlightPurple({children}: ChildrenProps) {
  return <span className="bg-scpurplepop text-white px-1">{children}</span>
}

export function NarrowAndCentered({children, narrower = false}: ChildrenProps & {narrower?: boolean}) {
  return (
    <div className="flex justify-center">
      <div className={`flex flex-col ${narrower ? 'max-w-2xl' : 'max-w-4xl'}`}>{children}</div>
    </div>
  )
}

export function LinkToFichePratique({url, url2, text, text2}: {url: string; url2?: string; text?: string; text2?: string}) {
  return (
    <p className="mt-8 mb-0">
      Pour en savoir plus sur vos droits, rendez-vous sur{' '}
      <Link target="_blank" href={url}>
        {text ?? url}
      </Link>
      {url2 ? (
        <>
          {' '}
          et{' '}
          <Link target="_blank" href={url2}>
            {text2 ?? url2}
          </Link>
        </>
      ) : null}
    </p>
  )
}

// This component :
// - adds the illustration on the left on desktop
// - provides the illustration for mobile through a render prop, to be inserted somewhere in the children
export function WithSuperheroIllustration({
  illu,
  children,
}: {
  illu: 'elf_m_greenblack' | 'elf_f_purple' | 'hero_f_orange' | 'hero_m_blue' | 'hero_m_orange' | 'hero_f_green'
  children: (mobileIllustration: ReactNode) => ReactNode
}) {
  const alt = ''
  const img = (() => {
    switch (illu) {
      case 'elf_m_greenblack':
        return elf_m_greenblack
      case 'elf_f_purple':
        return elf_f_purple
      case 'hero_f_orange':
        return hero_f_orange
      case 'hero_m_blue':
        return hero_m_blue
      case 'hero_m_orange':
        return hero_m_orange
      case 'hero_f_green':
        return hero_f_green
    }
  })()
  return (
    <div className="flex gap items-center gap-4 flex-row">
      <Image src={img} alt={alt} width={150} className={'hidden md:block'} />
      <div>
        {children(
          <div className="flex justify-center mb-2">
            <Image src={img} alt={alt} width={100} className={'md:hidden'} />
          </div>,
        )}
      </div>
    </div>
  )
}

export function AlternatingPurpleBands({children}: {children: ReactNode[]}) {
  // Define the colors to alternate between
  const bgColors = ['bg-sclightpurple', 'bg-sclightpurpledarker']
  return (
    <>
      {children.map((child, index) => (
        <LpColoredBand key={index} className={`${bgColors[index % bgColors.length]} py-8`}>
          {child}
        </LpColoredBand>
      ))}
    </>
  )
}

function HeroCard({title, subtext}: {title: string; subtext: string}) {
  return (
    <div className="md:w-1/3 text-white  gap-y-2 flex flex-col items-center justify-start">
      <p className="text-lg text-white font-bold mb-0">{title}</p>
      <p className="text-lg text-center mb-0">{subtext}</p>
    </div>
  )
}

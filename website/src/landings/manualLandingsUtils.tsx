import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import {getI18n} from '@/i18n/I18nDictionnary'
import {AppLang, AppLangs} from '@/i18n/localization/AppLangs'
import {ChildrenProps} from '@/utils/utils'
import {ReactNode} from 'react'

export function getManualLpButtonProps(lang: AppLang, category: String) {
  const anomaly = allVisibleAnomalies(lang).find(_ => _.category === category)
  if (!anomaly) {
    throw new Error(`Can't find anomaly with category = ${category}`)
  }
  return {
    ...bigReportButtonProps,
    linkProps: {href: buildLinkStartReport(anomaly, lang, {isWebView: false})},
  }
}

export function LpColoredBand({children, className = ''}: ChildrenProps & {className?: string}) {
  return (
    <div className={className}>
      <div className="fr-container">{children}</div>
    </div>
  )
}

export function BlueBandWhySignalConso({lang, title}: {lang: AppLangs; title: string}) {
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

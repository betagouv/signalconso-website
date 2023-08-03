'use client'

import {Button} from '@codegouvfr/react-dsfr/Button'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {findAnomaly} from 'anomalies/Anomalies'
import {Anomaly} from 'anomalies/Anomaly'
import {LandingData} from 'landings/landingDataUtils'

import Image from 'next/image'
import Link from 'next/link'
import {ReactNode, useRef} from 'react'

import {AnomalyTile} from '../components_simple/AnomalyTile/AnomalyTile'
import {buildLinkStartReport, pagesDefs} from '../core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'
import {AppLangs} from '../i18n/localization/AppLangs'

type Props = {
  landingData: LandingData
}

export default function LandingPage(props: Props) {
  const {m} = useI18n()
  const dsfrTheme = useColors()
  const chooseCategoriesDivRef = useRef<HTMLDivElement>(null)

  const landingData = props.landingData
  const container = `fr-container`

  const buttonTarget =
    landingData.targetedCategory.length > 1
      ? () => {
          if (chooseCategoriesDivRef.current) {
            chooseCategoriesDivRef.current.scrollIntoView({behavior: 'smooth'})
          }
        }
      : landingData.targetedCategory.length === 1
      ? findAnomaly(landingData.targetedCategory[0], 'fr')
      : 'home'

  const anomalies = landingData.targetedCategory.map(_ => findAnomaly(_, 'fr'))

  return (
    <>
      <div>
        <div
          className=" text-center px-8 py-14"
          style={{background: dsfrTheme.decisions.background.actionLow.blueFrance.default}}
        >
          <h1 className="">{landingData.title}</h1>
          <span className="block mt-4  text-2xl">{landingData.catchPhrase}</span>
          <BigReportButton target={buttonTarget} className="mt-8" />
        </div>

        <div className={`${container} mb-16`}>
          <h2 className="text-2xl mb-8 mt-10">{landingData.secondaryTitle1}</h2>
          <div className="flex justify-between items-center gap-y-4 flex-col lg:flex-row mb-8">
            <HeroCard
              title={m.landing.heroCardTitle1}
              subtext={m.landing.heroCardText1}
              picto={<Image alt="Pictogramme crayons" src="/image/picto_crayons.png" width={80} height={80} />}
            />
            <HeroCard
              title={m.landing.heroCardTitle2}
              subtext={m.landing.heroCardText2}
              picto={<Image alt="Pictogramme succès" src="/image/picto_checkbox.png" width={80} height={75} />}
            />
            <HeroCard
              title={m.landing.heroCardTitle3}
              subtext={m.landing.heroCardText3}
              picto={<Image alt="Pictogramme masques joyeux" src="/image/picto_masks.png" width={80} height={72} />}
            />
          </div>

          {landingData.secondaryTitle2 && <h2 className="text-2xl mb-6 font-bold">{landingData.secondaryTitle2}</h2>}
          <p className="text-lg">
            {m.landing.signalConsoWillHandle1}
            <br />
            {m.landing.signalConsoWillHandle2}
            <br />
            {m.landing.signalConsoWillHandle3}
          </p>
          {anomalies.length > 1 ? (
            <div ref={chooseCategoriesDivRef}>
              <h3 className="text-2xl">{m.landing.moreThanOneCat}</h3>
              <div className="fr-grid-row fr-grid-row--gutters">
                {anomalies.map(a => {
                  return (
                    <div className="fr-col-12 fr-col-sm-6 fr-col-md-4" key={a.category}>
                      <AnomalyTile anomaly={a} />
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <BigReportButton target={buttonTarget} className="mt-10" />
            </div>
          )}
        </div>
        <div className={container}>
          <CallOut
            buttonProps={{
              children: m.landing.discoverButton,
              linkProps: {
                href: pagesDefs.commentCaMarche.url,
              },
            }}
            title="Qu'est-ce que Signal Conso ?"
          >
            {m.landing.whatIsText1}
            <Link href={pagesDefs.index.url} className="text-sclightblue underline">
              signal.conso.gouv.fr
            </Link>
            {m.landing.whatIsText2}
            <br /> <br />
            {m.landing.whatIsText3}
            <br /> <br />
            {m.landing.whatIsText4}
            <br /> <br />
            {m.landing.whatIsText5}
          </CallOut>
        </div>
        {landingData.sampleReports.length && (
          <div className={`${container} my-12 space-y-8`}>
            <h2 className="text-2xl font-bold">{m.landing.samples}</h2>
            {landingData.sampleReports.map((report, idx) => (
              <UserQuote key={idx} {...{report}} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function BigReportButton({className = '', target}: {className?: string; target: Anomaly | 'home' | (() => void)}) {
  const {m} = useI18n()
  const props = {
    iconId: 'fr-icon-alarm-warning-line',
    className,
    size: 'large',
  } as const
  if (typeof target === 'function') {
    return (
      <Button {...props} onClick={target}>
        {m.landing.bigReportButton}
      </Button>
    )
  }
  return (
    <Button
      {...props}
      linkProps={{
        href: target === 'home' ? pagesDefs.index.url : buildLinkStartReport(target, 'fr'),
      }}
      size="large"
    >
      {m.landing.bigReportButton}
    </Button>
  )
}

function HeroCard({title, subtext, picto}: {title: string; subtext: string; picto: ReactNode}) {
  return (
    <div className="border border-solid border-gray-300 border-b-4 border-b-sclightblue w-[344px] h-[220px] gap-y-2 flex flex-col items-center justify-center p-4">
      {picto}
      <span className="mt-4 text-md font-bold">{title}</span>
      <span className="text-sm text-center">{subtext}</span>
    </div>
  )
}

function UserQuote({report}: {report: LandingData['sampleReports'][number]}) {
  // https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/citation
  // mais on override un peu le style du texte
  return (
    <figure className="fr-quote">
      <blockquote>
        <p className="!font-normal !text-base italic">« {report.text} »</p>
      </blockquote>
      <figcaption>
        <p className="fr-quote__author">{report.author}</p>
      </figcaption>
    </figure>
  )
}

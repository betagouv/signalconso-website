import {findAnomaly} from '@/anomalies/Anomalies'
import {Anomaly} from '@/anomalies/Anomaly'
import {LandingData} from '@/landings/landingDataUtils'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'

import Image from 'next/image'
import Link from 'next/link'
import {ReactNode, useId} from 'react'

import {bigReportButtonProps, getBigReportButtonText} from '@/components_simple/buttons/buttonsUtils'
import {AnomalyTile} from '../components_simple/AnomalyTile'
import {buildLinkHomePickCategory, buildLinkStartReport, pagesDefs} from '../core/pagesDefinitions'

import {getI18n} from '@/i18n/I18nDictionnary'
import {AppLangs} from '@/i18n/localization/AppLangs'
import imgPictoCheckbox from '@/img/landings/picto_checkbox.png'
import imgPictoCrayons from '@/img/landings/picto_crayons.png'
import imgPictoMasks from '@/img/landings/picto_masks.png'

type Props = {
  landingData: LandingData
  lang: AppLangs
}

export default function LandingPage({landingData, lang}: Props) {
  const {m} = getI18n(lang)

  const chooseCategoriesDivId = 'choose_' + useId()

  const container = `fr-container`

  const buttonTarget =
    landingData.targetedCategory.length > 1
      ? () => {
          document.querySelector(`#${chooseCategoriesDivId}`)?.scrollIntoView({behavior: 'smooth'})
        }
      : landingData.targetedCategory.length === 1
        ? findAnomaly(landingData.targetedCategory[0], lang)
        : 'home'

  const anomalies = landingData.targetedCategory.map(_ => findAnomaly(_, lang))

  return (
    <>
      <main role="main" id="main-content">
        <div className=" text-center px-8 py-14 bg-sclightpurple">
          <h1 className="">{landingData.title}</h1>
          <span className="block mt-4  text-2xl">{landingData.catchPhrase}</span>
          <BigButton target={buttonTarget} className="mt-8" {...{lang}} />
        </div>

        <div className={`${container} mb-16`}>
          <h2 className="text-2xl mb-8 mt-10">{landingData.secondaryTitle1}</h2>
          <div className="flex justify-between items-center gap-y-4 flex-col lg:flex-row mb-8">
            <HeroCard
              title={m.landing.heroCardTitle1}
              subtext={m.landing.heroCardText1}
              picto={<Image alt="" src={imgPictoCrayons} width={80} height={80} />}
            />
            <HeroCard
              title={m.landing.heroCardTitle2}
              subtext={m.landing.heroCardText2}
              picto={<Image alt="" src={imgPictoCheckbox} width={80} height={75} />}
            />
            <HeroCard
              title={m.landing.heroCardTitle3}
              subtext={m.landing.heroCardText3}
              picto={<Image alt="" src={imgPictoMasks} width={80} height={72} />}
            />
          </div>
          <br />
          <br />
          {landingData.otherTitle1 && landingData.otherText1 && (
            <h2 className="text-2xl mb-6 font-bold">{landingData.otherTitle1}</h2>
          )}
          {landingData.otherTitle1 && landingData.otherText1 && <p className="text-lg">{landingData.otherText1}</p>}

          {landingData.otherTitle2 && landingData.otherText2 && (
            <h2 className="text-2xl mb-6 font-bold">{landingData.otherTitle2}</h2>
          )}
          {landingData.otherTitle2 && landingData.otherText2 && <p className="text-lg">{landingData.otherText2}</p>}

          {landingData.otherTitle3 && landingData.otherText3 && (
            <h2 className="text-2xl mb-6 font-bold">{landingData.otherTitle3}</h2>
          )}
          {landingData.otherTitle3 && landingData.otherText3 && <p className="text-lg">{landingData.otherText3}</p>}

          {landingData.otherTitle4 && landingData.otherText4 && (
            <h2 className="text-2xl mb-6 font-bold">{landingData.otherTitle4}</h2>
          )}
          {landingData.otherTitle4 && landingData.otherText4 && <p className="text-lg">{landingData.otherText4}</p>}

          {landingData.otherTitle5 && landingData.otherText5 && (
            <h2 className="text-2xl mb-6 font-bold">{landingData.otherTitle5}</h2>
          )}
          {landingData.otherTitle5 && landingData.otherText5 && <p className="text-lg">{landingData.otherText5}</p>}

          {landingData.secondaryTitle2 && <h2 className="text-2xl mb-6 font-bold">{landingData.secondaryTitle2}</h2>}

          <p className="text-lg">
            {m.landing.signalConsoWillHandle1}
            <br />
            {m.landing.signalConsoWillHandle2}
            <br />
            {m.landing.signalConsoWillHandle3}
          </p>
          {anomalies.length > 1 ? (
            <div id={chooseCategoriesDivId}>
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
              <BigButton target={buttonTarget} className="mt-10" {...{lang}} />
            </div>
          )}
        </div>
        <div className={container}>
          <CallOut
            buttonProps={{
              children: m.landing.discoverButton,
              linkProps: {
                href: `/${lang}/${pagesDefs.commentCaMarche.url}`,
              },
            }}
            title={m.landing.whatsSignalConso}
          >
            {m.landing.whatIsText1}
            <Link href={`/${lang}`} className="text-sclightblue underline">
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
      </main>
    </>
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

function BigButton({
  className = '',
  target = 'home',
  lang,
}: {
  className?: string
  target?: Anomaly | 'home' | (() => void)
  lang: AppLangs
}) {
  const {m} = getI18n(lang)
  const targetProps =
    typeof target === 'function'
      ? {onClick: target}
      : {
          linkProps: {
            href: target === 'home' ? buildLinkHomePickCategory() : buildLinkStartReport(target, lang, {isWebView: false}),
          },
        }
  return (
    <Button {...bigReportButtonProps} {...{className}} {...targetProps}>
      {getBigReportButtonText(m)}
    </Button>
  )
}

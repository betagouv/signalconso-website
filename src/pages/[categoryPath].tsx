import {Button} from '@codegouvfr/react-dsfr/Button'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import {allVisibleAnomalies, findAnomalyByPath} from 'anomalies/Anomalies'
import {Anomaly} from 'anomalies/Anomaly'
import {landingsData} from 'landings/landingsData'
import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {ReactNode} from 'react'
import {buildLinkStartReport, siteMap} from '../core/siteMap'
import {useColors} from '@codegouvfr/react-dsfr/useColors'

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allVisibleAnomalies().map(_ => ({
    params: {categoryPath: _.path},
  }))
  return {
    paths,
    fallback: false,
  }
}

type Props = {
  categoryPath: string
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const categoryPath = context.params?.categoryPath
  if (typeof categoryPath !== 'string') {
    throw new Error(`Missing categoryPath in context`)
  }
  return {
    props: {
      categoryPath,
    },
  }
}

export default function CategoryLandingPage({categoryPath}: {categoryPath: string}) {
  const dsfrTheme = useColors()
  const anomaly = findAnomalyByPath(categoryPath)

  const container = `fr-container`

  const landingData = landingsData.find(_ => _.category === anomaly.category)
  if (!landingData) {
    throw new Error(`Missing landings data for ${categoryPath}`)
  }

  return (
    <>
      <Head>
        <title>{anomaly.seoTitle}</title>
        <meta name="description" content={anomaly.seoDescription} />
      </Head>
      <div>
        <div
          className=" text-center px-8 py-14"
          style={{background: dsfrTheme.decisions.background.actionLow.blueFrance.default}}
        >
          <h1 className="">{anomaly.title}</h1>
          <span className="block mt-4  text-2xl">{landingData.catchPhrase}</span>
          <BigReportButton {...{anomaly}} className="mt-8" />
        </div>

        <div className={`${container} mb-16`}>
          <h2 className="text-2xl mb-8 mt-10">{landingData.secondaryTitle1}</h2>
          <div className="flex justify-between items-center gap-y-4 flex-col lg:flex-row mb-8">
            <HeroCard
              title="Parce que c’est simple !"
              subtext="Des questions vous guident tout au long du parcours pour vous aider à formuler votre problème."
              picto={<Image alt="Pictogramme crayons" src="/image/picto_crayons.png" width={80} height={80} />}
            />
            <HeroCard
              title="Parce que c’est rapide !"
              subtext="5 minutes à peine et votre signalement est envoyé."
              picto={<Image alt="Pictogramme succès" src="/image/picto_checkbox.png" width={80} height={75} />}
            />
            <HeroCard
              title="Parce que c’est efficace"
              subtext="65 % des entreprises répondent au signalement."
              picto={<Image alt="Pictogramme masques joyeux" src="/image/picto_masks.png" width={80} height={72} />}
            />
          </div>
          <h2 className="text-2xl mb-6 font-bold">{landingData.secondaryTitle2}</h2>
          <p className="text-lg">
            SignalConso s’occupe du reste. Votre signalement est envoyé à l’entreprise et il est instantanément visible par les
            agents de la DGCCRF. Si vous avez posé une question sur vos droits, un agent vous recontactera rapidement pour vous
            répondre et vous orienter dans vos démarches.
            <br />
            Si c’est nécessaire, vous pouvez décider de rester anonyme. Dans le cas contraire, nous transmettrons vos coordonnées
            à l’entreprise pour qu’elle puisse vous répondre directement.
            <br />
            Votre signalement sera également enregistré dans la base de données de la DGCCRF. Cet outil leur permet de mieux
            cibler leurs contrôles et préparer les enquêtes.
          </p>
          <div className="flex justify-center items-center">
            <BigReportButton {...{anomaly}} className="mt-10" />
          </div>
        </div>
        <div className={container}>
          <CallOut
            buttonProps={{
              children: 'Découvrir',
              linkProps: {
                href: siteMap.commentCaMarche,
              },
            }}
            title="Qu'est-ce que Signal Conso ?"
          >
            Plus de 60 millions de consommateurs fréquentent quotidiennement près de 10 millions d’établissements et font des
            achats sur internet. Et pour contrôler le droit des consommateurs ? Moins de 3 000 agents de la DGCCRF : c’est
            pourquoi le site{' '}
            <Link href={siteMap.index} className="text-sclightblue underline">
              signal.conso.gouv.fr
            </Link>{' '}
            a été lancé.
            <br /> <br />
            Malgré l’action des enquêteurs, toutes les anomalies ne peuvent pas être détectées, en particulier les plus mineures
            et récurrentes : vous êtes, en tant que consommateur, l’acteur le mieux placé pour les repérer et faire valoir vos
            droits. <br /> <br />
            Le site vous accompagne avant, pendant et après vos achats, et vous permet de signaler en quelques clics les problèmes
            que vous rencontrez dans votre vie de tous les jours avec un professionnel. SignalConso est également là pour vous
            répondre, vous informer sur vos droits et vous accompagner dans vos démarches en vous orientant, si nécessaire, vers
            l’interlocuteur adapté à votre situation. <br /> <br />
            Les professionnels concernés pourront prendre connaissance des signalements et corriger les anomalies spontanément. Si
            les signalements sont trop nombreux ou fréquents pour un établissement, les enquêteurs de la DGCCRF pourront décider
            d’intervenir.
          </CallOut>
        </div>
        <div className={`${container} my-12 space-y-8`}>
          <h2 className="text-2xl font-bold">Quelques problèmes qui nous ont été signalés</h2>
          {landingData.sampleReports.map((report, idx) => (
            <UserQuote key={idx} {...{report}} />
          ))}
        </div>
      </div>
    </>
  )
}

function BigReportButton({className = '', anomaly}: {className?: string; anomaly: Anomaly}) {
  return (
    <Button
      iconId="fr-icon-alarm-warning-line"
      linkProps={{
        href: buildLinkStartReport(anomaly),
      }}
      className={` ${className}`}
      size="large"
    >
      Je signale un problème
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

function UserQuote({report}: {report: typeof landingsData[number]['sampleReports'][number]}) {
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

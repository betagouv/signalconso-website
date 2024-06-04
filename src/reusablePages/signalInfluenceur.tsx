import {allVisibleAnomalies} from '@/anomalies/Anomalies'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {PageComponentProps} from '@/core/metadatas'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import {AppLangs} from '@/i18n/localization/AppLangs'
import {ChildrenProps} from '@/utils/utils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'
import {getI18n} from '../i18n/I18nDictionnary'

export function signalInfluenceur(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  const anomaly = allVisibleAnomalies(lang).find(_ => _.category === 'Internet')
  if (!anomaly) {
    throw new Error(`Can't build influenceurs landing page, didnt find the corresponding category`)
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black ">
        <div className="fr-container py-12 flex justify-center">
          <div className=" flex flex-col max-w-4xl">
            <h1 className="flex flex-col">
              <span className="mb-2 text-white">Vous avez repéré une publication frauduleuse d'un influenceur ?</span>
            </h1>
            <p className="text-2xl ">Faites un signalement sur la plateforme SignalConso !</p>
            <p className="text-xl font-bold">
              Votre signalement sera envoyé à l'entreprise qui l'héberge (Instagram, Snapchat, TikTok, Youtube, Facebook, etc.)
              ainsi qu'aux agents de la répression des fraudes.
            </p>
            <div className="flex justify-center w-full">
              <Button
                className=" border-blue-300 border border-solid"
                {...bigReportButtonProps}
                linkProps={{href: buildLinkStartReport(anomaly, lang, {isWebView: false})}}
              >
                Je signale un influenceur
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple pt-6 pb-8">
        <div className="fr-container ">
          <div className="pt-4">
            <h2 className="text-3xl">Dans quels cas puis-je faire un signalement ?</h2>
            <div className="space-y-8">
              <Case>
                Si l'influenceur{' '}
                <strong>n'affiche pas la mention « publicité », « sponsorisé » ou « collaboration commerciale »</strong> alors
                qu'il est rémunéré pour sa publication.
              </Case>
              <Case>
                Si l'influenceur fait de la <strong>publicité trompeuse ou mensongère</strong> : le produit n'est pas vraiment ce
                qu'il prétend, n'est pas conforme à la description ou ne fonctionne pas.
              </Case>
              <Case>
                Si l'influenceur fait de la publicité sur l'un des produits suivants :{' '}
                <strong>
                  investissements financiers risqués, cryptomonnaies, tabac, alcool, jeux d'argent, chirurgie ou médecine
                  esthétique
                </strong>
                .
              </Case>
              <Case>
                S'il fait la promotion d'un <strong>produit dangereux</strong>.
              </Case>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurpledarker py-6">
        <div className="fr-container flex justify-center">
          <div className="max-w-4xl ">
            <h2 className="text-2xl">Et après ?</h2>
            <p className="text-lg ">
              <strong>Le réseau social</strong> peut décider de retirer le contenu, d'y rendre l'accès impossible ou de suspendre
              le compte.
            </p>
            <p className="text-lg mb-0">
              <strong>La répression des fraudes</strong> reçoit également votre signalement. En fonction du nombre de signalements
              reçus et de la gravité de la pratique, elle peut décider de mener une enquête auprès de l'influenceur et le
              sanctionner. Pour les pratiques les plus graves, l'affaire peut aller jusque devant un tribunal. L'influenceur
              risque alors jusqu'à 2 ans de prison, voire 7 en cas de circonstances aggravantes, et 300 000€ d'amende.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-scblueinfo">
        <div className="fr-container py-14">
          <h2 className="text-2xl text-center !text-white mb-12">Pourquoi faire un signalement sur SignalConso ?</h2>
          <HeroCards lang={props.params.lang} />
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

function Case({children}: ChildrenProps) {
  return (
    <p className="text-lg ">
      <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
      {children}
    </p>
  )
}

function HeroCards({lang}: {lang: AppLangs}) {
  const {m} = getI18n(lang)

  return (
    <div className="flex justify-between items-stretch gap-16 flex-col md:flex-row mb-8">
      <HeroCard
        title="Parce que c'est simple !"
        subtext="Des questions vous guident tout au long du parcours pour vous aider à formuler votre problème."
      />
      <HeroCard title="Parce que c'est rapide !" subtext="5 minutes à peine et votre signalement est envoyé." />
      <HeroCard title="Pour le geste citoyen" subtext="Pour améliorer les réseaux sociaux pour tout le monde." />
    </div>
  )
}

function HeroCard({title, subtext}: {title: string; subtext: string}) {
  return (
    <div className="md:w-1/3 text-white  gap-y-2 flex flex-col items-center justify-start">
      <h3 className="text-lg text-white font-bold mb-0">{title}</h3>
      <p className="text-lg text-center mb-0">{subtext}</p>
    </div>
  )
}

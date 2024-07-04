import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {BlueBandWhySignalConso, getManualLpButtonProps} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

export function signalInfluenceur(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  const arrow = <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black ">
        <div className="fr-container py-12 flex justify-center">
          <div className=" flex flex-col max-w-4xl">
            <h1 className="fr-h3 !text-white">
              Vous avez repéré une publication frauduleuse d'un influenceur sur Instagram, Snapchat, Tiktok, Youtube, Facebook,
              etc. ?
            </h1>
            <p className="text-xl ">Faites un signalement sur la plateforme SignalConso !</p>
            <p className="text-xl font-bold">
              Votre signalement sera envoyé au réseau social ainsi qu'aux agents de la répression des fraudes.
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'Internet')}>
                Je signale un influenceur
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple pt-6 pb-8">
        <div className="fr-container ">
          <div className="pt-4 max-w-4xl mx-auto">
            <p className="text-lg text-left">Dans quels cas puis-je faire un signalement ?</p>
            <div className="">
              <h2 className="fr-h6 !mb-2">
                {arrow}
                L'influenceur n'affiche pas la mention « publicité », « sponsorisé » ou « collaboration commerciale »
              </h2>
              <p className="ml-10">
                Si l'influenceur ne mentionne pas « publicité », « sponsorisé » ou « collaboration commerciale » alors qu'il est
                payé pour sa publication, c'est de la publicité cachée. Cela peut induire en erreur ses abonnés sur la nature
                commerciale du contenu.
              </p>

              <h2 className="fr-h6 !mb-2">
                {arrow}
                L'influenceur fait de la publicité trompeuse ou mensongère
              </h2>
              <p className="ml-10">
                Le produit n'est pas vraiment ce qu'il prétend, n'est pas conforme à la description ou ne fonctionne pas.
              </p>
              <h2 className="fr-h6 !mb-2 ">
                {arrow}
                L'influenceur fait de la publicité pour des investissements financiers risqués, des cryptomonnaies, du tabac, de
                l'alcool, des jeux d'argent, ou de la chirurgie ou médecine esthétique
              </h2>
              <p className="ml-10">
                Par exemple, s'il fait de la publicité pour un service de trading, de paris sportifs, d'injections pour faire
                grossir les lèvres, etc. La publicité pour tous ces produits est strictement régulée.
              </p>
              <h2 className="fr-h6 !mb-2 ">
                {arrow}
                S'il fait la promotion d'un <strong>produit dangereux</strong>.
              </h2>
              <p className="ml-10">
                Cela inclut par exemple certains produits ou méthodes pour se blanchir les dents ou la peau, des ballons de gaz
                hilarants, etc.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurpledarker py-6">
        <div className="fr-container flex justify-center">
          <div className="max-w-4xl ">
            <p className="fr-h3">Et après ?</p>
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
      <BlueBandWhySignalConso {...{lang}} title="Pourquoi faire un signalement d'un youtubeur ou influenceur sur SignalConso ?" />
    </FullWidthPageContainer>
  )
}

import {UserQuote} from '@/components_feature/LandingPage'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {AppLangs} from '@/i18n/localization/AppLangs'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getI18n} from '../../i18n/I18nDictionnary'

const bloctel = 'https://www.bloctel.gouv.fr/'

export function DemarchageTelephoniquePage(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black ">
        <div className="fr-container py-12 flex items-center justify-center">
          <div className="max-w-4xl flex flex-col items-start">
            <h1 className="text-white">Démarchage téléphonique abusif</h1>
            <p className="text-xl text-center mb-0">Vous avez reçu des appels commerciaux abusifs :</p>
            <ul className="text-xl ml-4  mb-6">
              <li className="font-bold">hors des heures et jours autorisés ?</li>
              <li>
                ou <strong>trop fréquents</strong> ?
              </li>
              <li>
                ou <strong>malgré votre inscription à Bloctel</strong> ?
              </li>
            </ul>
            <p className="text-lg ">
              Faites un signalement sur la plateforme SignalConso. Votre signalement sera envoyé aux agents de la répression des
              fraudes, ainsi qu'à l'entreprise si vous pouvez l'identifier.
            </p>
            <Button className="border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'DemarchageAbusif')}>
              Je signale un démarchage téléphonique abusif
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker ">
        <div className="fr-container ">
          <div className="py-6">
            <h2 className="text-3xl text-normal">Qu'est-ce qui est interdit exactement ?</h2>
            <div className="space-y-4 mb-6">
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Le démarchage téléphonique des consommateurs est autorisé{' '}
                <strong>uniquement de 10 heures à 13 heures et de 14 heures à 20 heures</strong>. Il est interdit le samedi, le
                dimanche et les jours fériés.
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit à un même professionnel de démarcher un même consommateur{' '}
                <strong>plus de quatre fois sur une période de trente jours.</strong>
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit à tout professionnel de démarcher téléphoniquement des{' '}
                <strong>consommateurs inscrits sur Bloctel</strong>.
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit s'il concerne <strong>la rénovation énergétique</strong> ou le{' '}
                <strong>Compte personnel de formation (CPF)</strong>.
              </p>
            </div>
            <p className="text-lg mb-6">Dans chacun de ces cas, vous pouvez faire un signalement.</p>

            <div className="max-w-5xl mx-auto bg-sclightpurple p-4">
              <div className="max-w-4xl mx-auto">
                <p className="text-lg">
                  Vous souhaitez éviter d'être démarchés téléphoniquement ? Vous pouvez inscrire votre numéro auprès de{' '}
                  <Link href={bloctel} target="_blank">
                    Bloctel
                  </Link>
                  , un service d'opposition au démarchage téléphonique.
                </p>
                <p className="text-lg">L'inscription est gratuite et dure 3 ans.</p>
                <div className="flex items-center justify-center">
                  <Button linkProps={{href: bloctel, target: '_blank'}} priority="secondary" size="medium">
                    Je m'inscris sur la liste Bloctel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="fr-container py-4">
          <h2>Quelques problèmes qui nous ont été signalés</h2>

          <div className="space-y-8">
            <UserQuote
              report={{
                text: `XXX veut me vendre la fibre depuis plusieurs mois alors que je leur ai gentiment expliqué que mon habitation ne pouvait pas être raccordée. Un technicien envoyé par XXX en 2021 a confirmé l’impossibilité de raccordement. Systématiquement, j'explique au conseiller XXX qui appelle pendant les heures de repas que techniquement, on ne peut pas... Réponse à chaque fois : "oui monsieur, c'est bien noté. Vous ne serez plus dérangé !" En fait rien n'est fait et environ toutes les trois semaines ils m’appellent. J'en ai marre de répéter la même chose. Pour information, je suis inscrit sur Bloctel et ai refusé sur le site XXX d'être contacté pour tout démarchage. Merci d’en tenir compte.`,
                author: 'Ali H.',
              }}
            />
            <UserQuote
              report={{
                text: `Je souhaite porter à votre attention un cas de démarchage téléphonique abusif dont j'ai été victime récemment. Le 23/01/2023, j'ai reçu un appel de la part d'un de vos représentants commerciaux qui m'a proposé une offre promotionnelle pour vos services. Malgré mon refus poli et répété, l'interlocuteur a continué à me harceler avec insistance pour que j'accepte l'offre. J'ai finalement dû raccrocher pour mettre fin à cette conversation agressive et malveillante. Je suis très mécontent de cette expérience et je trouve inacceptable que votre entreprise utilise ce type de méthodes de vente. Je tiens à souligner que je suis inscrit sur la liste Bloctel pour éviter ce type d'appels. Je vous demande donc de prendre les mesures nécessaires pour que cela ne se reproduise pas à l'avenir et de me tenir informé des actions que vous allez entreprendre.`,
                author: 'Emma C.',
              }}
            />
            <UserQuote
              report={{
                text: `A plusieurs reprises au mois d'octobre, sur mon lieu de travail, j'ai été contacté par téléphone (harcèlement) par votre commerciale XXX, pour me vendre une parution sur les pages jaunes pour l'entreprise de mon mari. Non seulement, cet appel était non sollicité, mais il était également très intrusif et insistant. L'interlocuteur m'a proposé une offre commerciale que j'ai refusée à plusieurs reprises, mais il a continué à insister de manière agressive et désagréable. Je trouve ce comportement inacceptable et contraire à la législation en vigueur en matière de démarchage téléphonique.`,
                author: 'Louis J.',
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-scblueinfo">
        <div className="fr-container py-14">
          <h2 className="text-2xl text-center !text-white mb-12">
            Pourquoi faire un signalement sur SignalConso lors d'un démarchage téléphonique abusif ?
          </h2>
          <HeroCards lang={props.params.lang} />
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

function HeroCards({lang}: {lang: AppLangs}) {
  const {m} = getI18n(lang)

  return (
    <div className="flex justify-between items-stretch gap-16 flex-col md:flex-row mb-8">
      <HeroCard title={m.landing.heroCardTitle1} subtext={m.landing.heroCardText1} />
      <HeroCard title={m.landing.heroCardTitle2} subtext={m.landing.heroCardText2} />
      <HeroCard title={m.landing.heroCardTitle3} subtext={m.landing.heroCardText3} />
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

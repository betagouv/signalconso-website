import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {AppLangs} from '@/i18n/localization/AppLangs'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {getI18n} from '../../i18n/I18nDictionnary'

const arcepInfoPage = 'https://www.arcep.fr/demarches-et-services/utilisateurs/que-va-changer-la-fermeture-du-reseau-cuivre.html'
const pageVerifPostalCode = 'https://www.economie.gouv.fr/treshautdebit/la-fermeture-du-reseau-cuivre-dans-votre-commune'

export function ObligationFibre(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black ">
        <div className="fr-container py-12 flex items-center justify-center">
          <div className="max-w-4xl flex flex-col items-start">
            <h1 className="flex flex-col">
              <span className="mb-2 text-white">
                Votre fournisseur d'accès Internet prétend pouvoir vous obliger à passer la fibre...
              </span>
            </h1>
            <p className="text-xl text-center">
              ...alors que vous n'êtes pas dans une{' '}
              <Link href={pageVerifPostalCode}>commune concernée par la fermeture du réseau ADSL</Link> ?
            </p>
            <p className="text-xl font-bold">
              Faites un signalement sur la plateforme SignalConso. Votre signalement sera envoyé aux agents de la répression des
              fraudes, ainsi qu'à votre opérateur.
            </p>
            <Button className="mb-6 border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'TelephonieFaiMedias')}>
              Je signale une tentative de migration forcée vers la fibre
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container ">
          <div className="pt-4 pb-6 flex flex-col md:flex-row items-start gap-0 md:gap-8">
            <h2 className="text-3xl !text-slate-900 text-normal md:w-1/3 mt-2">
              Est-ce que mon fournisseur d'accès peut me forcer à passer à la fibre ?
            </h2>
            <div className="md:w-2/3 ">
              <p className="font-bold text-lg">
                En général, si vous êtes titulaire d'un abonnement Internet ADSL, votre fournisseur d'accès ne peut pas vous
                obliger à passer à la fibre.
              </p>
              <p className="text-lg ">
                Sauf si votre commune fait partie des quelques communes dans lesquelles le réseau ADSL est en cours de fermeture.
              </p>
              <Button linkProps={{href: pageVerifPostalCode}} iconId="ri-map-pin-2-line" priority="secondary" size="medium">
                Je cherche si ma commune est concernée par la fermeture du réseau ADSL
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurpledarker py-8">
        <div className="fr-container">
          <p className="text-lg text-center mb-0">
            Pour en savoir plus sur la fermeture du réseau ADSL, le passage à la fibre, consultez{' '}
            <Link href={arcepInfoPage} className="font-bold">
              la page d'information de l'ARCEP
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-scblueinfo">
        <div className="fr-container py-14">
          <h2 className="text-2xl text-center !text-white mb-12">
            Pourquoi faire un signalement sur SignalConso lors d'une migration imposée par mon opérateur ?
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

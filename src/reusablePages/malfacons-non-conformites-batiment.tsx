import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

const dgccrfMalfaconInfoPage = 'https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Malfacon'

export function MalfaconEtNonConformite(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }

  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex items-center justify-center">
          <div className="max-w-4xl flex flex-col items-start">
            <h1 className="mb-2 text-xxl text-white">Malfaçons et non-conformités dans le domaine du bâtiment</h1>
            <p className="text-xl">
              Vous avez investi dans un bien immobilier ou entrepris des travaux de construction ou de rénovation et vous avez
              constaté des malfaçons ?
            </p>
            <p className="text-xl font-bold">
              Faites un signalement sur la plateforme SignalConso. Il sera envoyé aux agents de la répression des fraudes ainsi
              qu'au constructeur.
            </p>
            <Button className="mb-6 border-blue-300 border border-solid" linkProps={{href: 'https://signal.conso.gouv.fr/'}}>
              Signaler une malfaçon ou non-conformité
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container pt-4 pb-6 flex flex-col md:flex-row items-start gap-0 md:gap-8">
          <h2 className="text-3xl !text-slate-900 text-normal md:w-1/3 mt-2">Quelle entreprise dois-je signaler ?</h2>
          <div className="md:w-2/3 ">
            <p className="font-bold text-lg">
              Les constructeurs sont tenus de garantir les travaux qu'ils ont réalisés. Cette obligation concerne les architectes,
              entrepreneurs, promoteurs immobiliers, ainsi que toutes les personnes liées au maître de l'ouvrage par contrat.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurpledarker py-8">
        <div className="fr-container">
          <p className="text-lg text-center mb-0">
            J’ai déjà réceptionné les travaux, de quelles garanties puis-je encore bénéficier ?
          </p>
          <ul className="list-disc list-inside">
            <li>
              La garantie de parfait achèvement pour les malfaçons constatées dans l'année suivant la réception des travaux.
            </li>
            <li>La garantie biennale couvrant les équipements dissociables de l'ouvrage.</li>
            <li>
              La garantie décennale pour les désordres compromettant la solidité de l'ouvrage ou rendant le bien impropre à sa
              destination.
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-scblueinfo">
        <div className="fr-container py-14">
          <h2 className="text-2xl text-center !text-white mb-12">
            Pourquoi faire un signalement sur SignalConso en cas de malfaçon ou non conformité?
          </h2>
          <p className="text-lg text-center !text-white mb-12">
            Faire un signalement permet d'engager des actions en justice via des procédures de référé ou des actions au fond
            devant les juridictions compétentes, garantissant ainsi vos droits.
          </p>
          <div className="flex justify-center">
            <Button linkProps={{href: dgccrfMalfaconInfoPage}} className="mt-4">
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

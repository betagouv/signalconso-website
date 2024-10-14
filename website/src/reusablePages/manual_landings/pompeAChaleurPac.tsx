import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'
import Link from 'next/link'

export function pompeAChaleurPac(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">Des problèmes avec l’achat, l’installation ou l’entretien de votre pompe à chaleur ?</h1>
            <h2 className="!text-white fr-h4">Protégez vos droits en tant que consommateur avec SignalConso</h2>
            <p className="text-xl">
              Les pompes à chaleur sont des solutions écologiques et économiques pour chauffer votre maison, mais l’installation
              et l’entretien de ces systèmes doivent être réalisés dans les règles de l’art. Si vous avez rencontré des problèmes
              avec un professionnel (installation défectueuse, promesses non tenues, pratiques commerciales douteuses), sachez que
              vous avez des droits en tant que consommateur. Grâce à SignalConso, vous pouvez signaler les abus et litiges pour
              protéger vos intérêts. Découvrez comment faire un signalement en quelques étapes simples.
            </p>
            <p className="text-xl">
              Vous avez rencontré un problème pendant les travaux d’installation ou d’entretien de votre pompe à chaleur ? Vous
              souhaitez découvrir vos droits ? Faites un signalement sur SignalConso.
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'TravauxRenovations')}>
                Je signale un problème de pompe à chaleur
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">
            Quels sont vos droits lors de l’achat, de l’installation ou de l’entretien d’une pompe à chaleur ?
          </h2>
          <p className="text-lg">
            Lorsque vous achetez, faites installer ou entretenir une pompe à chaleur, plusieurs garanties et protections légales
            existent pour vous assurer un service conforme :
          </p>
          <ul className="mb-8 md:list-none md:pl-0 md:flex md:flex-row md:flex-wrap md:gap-y-4">
            <li className="text-lg px-4 basis-1/2">
              <strong>Garantie de performance :</strong> Le professionnel doit garantir que la pompe à chaleur correspond bien aux
              besoins en chauffage de votre logement.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Respect des normes d’installation :</strong> L’installation doit être réalisée par un professionnel qualifié
              (RGE - Reconnu Garant de l’Environnement) et respecter les normes techniques.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Devis et facturation transparents :</strong> Vous avez droit à un <strong>devis clair et détaillé</strong>,
              ainsi qu'à une facturation conforme au contrat signé.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Garantie de bon fonctionnement :</strong> En plus de la garantie légale, vous pouvez bénéficier{' '}
              <strong>d’une garantie constructeur</strong> sur le bon fonctionnement de la pompe à chaleur.
            </li>
          </ul>
          <p className="text-lg">En cas de non-respect de ces droits, faites un signalement pour faire valoir vos intérêts.</p>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Les problèmes fréquents avec les pompes à chaleur (pac)</h2>
          <p className="text-lg">
            Les pompes à chaleur sont de plus en plus populaires, mais plusieurs types de litiges sont souvent signalés par les
            consommateurs :
          </p>
          <ul className="mb-8 md:list-none md:pl-0 md:flex md:flex-row md:flex-wrap md:gap-y-4">
            <li className="text-lg px-4 basis-1/2">
              <strong>Installation défectueuse :</strong> Mauvais dimensionnement du système, erreurs de pose, nuisances sonores
              importantes.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Non-respect des performances annoncées :</strong> La pompe à chaleur ne chauffe pas comme prévu ou entraîne
              une surconsommation d’électricité.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Problèmes de maintenance :</strong> Difficultés à obtenir un entretien régulier ou des réparations
              adéquates.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Pratiques commerciales trompeuses :</strong> Devis gonflés, promesses non tenues sur les économies
              d’énergie, fraudes à la prime énergie.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <p className="text-lg mt-4">
            Ces problèmes peuvent entraîner des désagréments importants, tant financiers que pratiques. Faites un signalement dès
            maintenant sur <Link href="https://signal.conso.gouv.fr/fr/travaux-renovation/faire-un-signalement">SignalConso</Link>{' '}
            pour obtenir réparation ou simplement protéger d’autres consommateurs.
          </p>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

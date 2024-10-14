import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'
import Link from 'next/link'

export function travauxRenovation(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">Des problèmes avec vos travaux de rénovations ?</h1>
            <h2 className="!text-white fr-h4">Protégez vos droits en tant que consommateur avec SignalConso</h2>
            <p className="text-xl">
              Que ce soit pour rénover votre maison, refaire votre cuisine ou engager des travaux d’agrandissement, vous avez des
              droits en tant que consommateur. Malheureusement, il arrive parfois que des prestataires ne respectent pas leurs
              engagements, vous laissant avec des travaux mal exécutés, des retards non justifiés ou des devis trompeurs.
            </p>
            <p className="text-xl">
              Vous avez rencontré un problème pendant vos travaux ? Vous souhaitez découvrir vos droits en tant que consommateur ?
              Faites un signalement sur SignalConso.
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'TravauxRenovations')}>
                Je signale un problème
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Quels sont vos droits lors de travaux et rénovations ?</h2>
          <p className="text-lg">
            Lorsque vous engagez un professionnel pour des travaux de rénovation ou d’aménagement, plusieurs garanties légales
            existent pour vous protéger :
          </p>
          <ul className="mb-8 md:list-none md:pl-0 md:flex md:flex-row md:flex-wrap md:gap-y-4">
            <li className="text-lg px-4 basis-1/2">
              <strong>Le respect du devis signé :</strong> Une fois que vous avez validé un devis, l’artisan ou l’entreprise est
              tenue de respecter les conditions mentionnées (prix, délais, nature des travaux).
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>La garantie décennale :</strong> Tous les travaux de construction ou de rénovation sont couverts par une
              garantie décennale, qui protège contre les vices ou défauts affectant la solidité de l'ouvrage.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>La conformité des matériaux :</strong> Les matériaux utilisés doivent correspondre à ceux mentionnés dans le
              contrat, tant en termes de qualité que de spécificité technique.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Le droit de rétractation :</strong> Pour les travaux conclus à domicile, vous disposez d’un délai de
              rétractation de 14 jours après la signature du contrat.
            </li>
          </ul>
          <p className="text-lg">
            Si ces droits ne sont pas respectés, il est important d’agir rapidement. En tant que consommateur, vous pouvez faire
            valoir vos droits et signaler les pratiques abusives.
          </p>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Quels sont les litiges les plus fréquents dans les travaux et rénovations ?</h2>
          <p className="text-lg">
            Plusieurs types de litiges sont couramment signalés par les consommateurs dans le domaine des travaux et rénovations.
            Ne tombez pas dans ces pièges !{' '}
          </p>
          <ul className="mb-8 md:list-none md:pl-0 md:flex md:flex-row md:flex-wrap md:gap-y-4">
            <li className="text-lg px-4 basis-1/2">
              <strong>Retards excessifs dans l’avancement des travaux</strong>
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Défauts de conformité :</strong> Travaux mal réalisés, matériaux non conformes aux spécifications.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Coûts additionnels non prévus :</strong> Devis gonflé en cours de chantier sans justification.
            </li>
            <li className="text-lg px-4 basis-1/2">
              <strong>Problèmes de communication avec les prestataires :</strong> Difficulté à obtenir des réponses ou des
              solutions.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <p className="text-lg mt-4">
            Vous rencontrez un problème avec vos travaux ou une entreprise de rénovation ? Ne laissez pas la situation empirer.
            Faites un signalement dès maintenant sur{' '}
            <Link href="https://signal.conso.gouv.fr/fr/travaux-renovation/faire-un-signalement">SignalConso</Link> pour obtenir
            réparation ou simplement alerter d’autres consommateurs.
          </p>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

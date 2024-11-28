import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function dysfonctionnementsCommandesNourriture() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'CafeRestaurant')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <div>
          <h1>
            Vous avez rencontré un problème avec une <HighlightBlue>commande</HighlightBlue> de{' '}
            <HighlightPurple>nourriture</HighlightPurple> en ligne ?
          </h1>
          <p className="fr-h3 !mb-4 !text-scbluefrance">
            Vous n’êtes pas seul, et surtout, vous avez des droits ! Protégez-les avec SignalConso.
          </p>

          <p className="text-lg">
            Que ce soit une <strong>livraison en retard</strong>, un <strong>repas manquant</strong>, ou une mauvaise qualité de
            service, il est important de comprendre ce que la loi dit à ce sujet et comment vous pouvez agir.
          </p>
          <p className="text-lg">
            Découvrez vos droits en tant que consommateur face à ces problèmes de commande de nourriture en ligne et en cas de
            litige, faites un signalement sur SignalConso.
          </p>
          {button}
        </div>

        <div>
          <h2 className="fr-h4">
            Commandes de nourriture en ligne ou via une application, livraison de plats à domicile : Quels sont les problèmes les
            plus souvent rencontrés par les consommateurs ?
          </h2>
          <p>
            Les commandes en ligne de nourriture sont de plus en plus populaires, mais elles ne sont pas exemptes de problèmes.
            Voici quelques problèmes et dysfonctionnements courants que vous pourriez rencontrer :
          </p>
          <ul>
            <li>
              <strong>Retard de livraison :</strong> Votre commande arrive bien après l'heure prévue.
            </li>
            <li>
              <strong>Commande incomplète :</strong> Des articles manquent dans votre commande (boissons, plats, accompagnements).
            </li>
            <li>
              <strong>Erreur dans la commande :</strong> Vous avez reçu un plat que vous n'avez pas commandé.
            </li>
            <li>
              <strong>Qualité insatisfaisante :</strong> Nourriture froide, produits détériorés, plats ne correspondant pas à la
              description.
            </li>
            <li>
              <strong>Refus de remboursement :</strong> En cas de problème, le restaurant ou la plateforme refuse de vous
              rembourser.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="fr-h4">
            Quels sont vos droits en tant que consommateur en cas de problème avec une livraison ou une commande de plat à
            domicile ?
          </h2>
          <p>
            Le <strong>Code de la consommation</strong> protège les consommateurs lorsqu’ils commandent en ligne de la nourriture.
            Voici ce que vous devez savoir :
          </p>
          <ul>
            <li className="mb-4">
              <strong>Droit de recevoir un produit conforme :</strong> Lorsque vous passez une commande de nourriture en ligne,
              vous avez droit à recevoir exactement ce qui a été commandé et payé, dans les conditions promises (heure de
              livraison, température, qualité). Si ce n'est pas le cas, le vendeur (restaurant ou plateforme de livraison) est{' '}
              <strong>responsable</strong> et vous pouvez exiger un remboursement ou un remplacement du produit.
            </li>
            <li className="mb-4">
              <strong>Droit au remboursement en cas de retard :</strong> Si la livraison subit un{' '}
              <strong>retard significatif</strong> ou que le <strong>service ne correspond pas aux attentes</strong> (par exemple,
              repas froid ou abîmé), vous pouvez demander un <strong>remboursement partiel ou total.</strong>
            </li>
            <li>
              <strong>Droit de réclamation en ligne :</strong> Les plateformes de commande en ligne sont <strong>obligées</strong>{' '}
              de vous fournir des moyens faciles de contacter leur service client en cas de problème. Vous pouvez signaler toute
              anomalie directement via leur site ou application, mais vous pouvez aussi{' '}
              <strong>faire valoir vos droits autrement.</strong>
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <h2 className="fr-h4 !text-white">
          Comment réagir en cas de problème ou de dysfonctionnement avec votre commande ou votre livraison de repas ?
        </h2>
        <p className="text-lg">
          Contactez immédiatement le service client, demandez un remboursement ou un dédommagement et si vous n'obtenez pas
          satisfaction auprès de la plateforme ou du restaurant, <strong>vous pouvez signaler le problème à Signal Conso.</strong>
        </p>
        {button}
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

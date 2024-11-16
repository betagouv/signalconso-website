import {
  AlternatingPurpleBands,
  HighlightBlue,
  HighlightPurple,
  LinkToFichePratique,
  LpColoredBand,
  NarrowAndCentered,
  WithSuperheroIllustration,
  getManualLpButtonProps,
} from '@/landings/manualLandings/manualLandingsComponents'

import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'

export function blackFridayColis() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'AchatInternet')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <WithSuperheroIllustration illu="hero_f_green">
          {illustrationMobile => {
            return (
              <>
                <h1 className="mb-6">
                  <HighlightBlue>Retard, perte ou colis endommagé</HighlightBlue> pendant le{' '}
                  <HighlightPurple>Black Friday</HighlightPurple> ?
                </h1>
                <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
                <p className="text-lg">
                  Le Black Friday est une période de forte activité pour les services de livraison. Il vous est peut-être déjà
                  arrivé que vos commandes soient retardées, que des colis se perdent ou arrivent endommagés. Découvrez vos droits
                  en tant que consommateur face à ces situations et en cas de litige, faites un signalement sur SignalConso.
                </p>
                {illustrationMobile}
                {button}
              </>
            )
          }}
        </WithSuperheroIllustration>

        <div>
          <h2 className="fr-h4 ">
            Votre livraison est retardée ou votre colis s'est perdu pendant le Black Friday : Quels sont vos droits en tant que
            consommateur ?
          </h2>
          <p>
            Selon le Code de la consommation le vendeur est tenu de livrer le bien{' '}
            <strong>à la date ou dans le délai annoncé</strong> au moment de la commande. Si aucune date précise n'est mentionnée,
            la loi prévoit que la livraison doit être effectuée dans un <strong>délai de 30 jours maximum</strong>.
          </p>
          <p className="mb-0">
            <strong>En cas de retard de livraison ou de perte de votre colis</strong>, le consommateur a le droit de demander
            l'annulation de la commande et un <strong>remboursement intégral</strong> si le vendeur ne respecte pas ses
            engagements. Le Black Friday ne modifie en rien ces obligations légales.
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Votre colis arrive endommagé : Quels sont vos droits en tant que consommateur ?</h2>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              Si le colis que vous recevez est endommagé, vous devez immédiatement signaler le problème au transporteur en
              émettant des <strong>réserves</strong> sur le bon de livraison. Vous disposez ensuite de <strong>3 jours</strong>{' '}
              pour confirmer ces réserves par <strong>lettre recommandée</strong> au transporteur.
            </li>
            <li>
              En parallèle, <strong>informez le vendeur</strong> de la situation et demandez un remplacement ou un remboursement.
            </li>
            <li className="mb-0">
              Dans tous les cas, le premier réflexe est de <strong>contacter le service client</strong> du site où vous avez
              commandé. Conservez toutes les preuves d'achat et les échanges écrits.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">
            Quelles sont les bonnes pratiques pour éviter les problèmes de livraison pendant le Black Friday ?
          </h2>
          <ul className="grid md:grid-colXs-2 lg:grid-cols-4 gap-4">
            <li>
              <strong>Privilégiez les vendeurs fiables</strong> : Consultez les avis en ligne sur les délais et la qualité de
              livraison avant d'effectuer votre achat.
            </li>
            <li>
              <strong>Vérifiez les délais de livraison estimés</strong> : Assurez-vous de bien connaître les délais avant de
              commander, surtout pendant le Black Friday où les volumes de commande explosent.
            </li>
            <li>
              <strong>Suivez votre colis</strong> : Utilisez les numéros de suivi fournis par le vendeur pour suivre en temps réel
              l'acheminement de votre commande.
            </li>
            <li>
              <strong>Prenez des photos du colis à la réception</strong> : En cas de colis endommagé, photographiez immédiatement
              le produit et l'emballage pour prouver la situation au vendeur ou transporteur.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez constaté rencontrez un problème de livraison ou vous avez reçu votre colis endommagé ? Signalez-le sur
            SignalConso pour protéger vos droits et aider d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
        <LinkToFichePratique
          url="https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/livraison-quelles-sont-les-obligations-du-professionnel-et-les-recours"
          text="la fiche pratique Droits et obligations du professionnel en matière de livraison"
        />
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

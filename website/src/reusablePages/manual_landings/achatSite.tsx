import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  LpColoredBand,
} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function achatSite() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'AchatInternet')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <div>
          <h1>
            Vous avez rencontré un problème lors d'un <HighlightBlue>achat sur internet</HighlightBlue> ?
          </h1>
          <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>

          <p className="text-lg">
            L’achat sur internet est pratique, mais il peut aussi entraîner des désagréments. Que ce soit un{' '}
            <strong>produit non conforme</strong>, un <strong>retard de livraison</strong>, ou une{' '}
            <strong>arnaque en ligne</strong>, il est important de faire respecter vos droits.
          </p>
          <p className="text-lg">
            Découvrez vos droits en tant que consommateur face à ces problèmes d’achat sur internet et en cas de litige, faites un
            signalement sur SignalConso.
          </p>
          {button}
        </div>

        <div>
          <h2 className="fr-h4">Problèmes fréquemment rencontrés lors d’achats en ligne</h2>
          <p className="mb-4">
            <strong>Produit non conforme ou défectueux :</strong> Le produit est de mauvaise qualité, comporte un défaut, est
            différent de celui commandé (couleur, taille, fonctionnalité) ou est abîmé ou inutilisable à la réception.
          </p>
          <p className="mb-12">
            Selon la loi, les produits vendus en ligne doivent <strong>correspondre à la description</strong> faite sur le site.
            Si le produit n’est pas conforme ou est défectueux, vous êtes en droit de demander un remplacement ou un
            remboursement.
          </p>
          <p className="mb-4">
            <strong>Problème de livraison :</strong> Les problèmes de livraison représentent l’un des principaux motifs de
            réclamation dans le e-commerce. Vous pouvez signaler un <strong>retard</strong> ou un <strong>défaut</strong> de
            livraison ou des frais de livraison abusifs ou non prévus lors de l'achat.
          </p>
          <p className="mb-12">
            Le vendeur est tenu de respecter les délais de livraison annoncés lors de la commande. Si la livraison n’a pas lieu
            dans le délai prévu, vous pouvez <strong>exiger le remboursement ou l'annulation</strong> de la commande.
          </p>
          <p className="mb-4">
            <strong>Refus de remboursement ou problème de rétractation :</strong> En ligne, il arrive que le vendeur refuse de
            vous rembourser un produit retourné dans les délais ou vous empêche d’exercer votre droit de rétractation dans les 14
            jours.
          </p>
          <p className="mb-12">
            En France, le consommateur dispose d'un <strong>droit de rétractation de 14 jours</strong> pour annuler un achat en
            ligne. Le remboursement doit intervenir dans les 14 jours suivant le retour du produit.
          </p>
          <p>
            <strong>Arnaques sur internet :</strong> Les <strong>arnaques en ligne</strong> sont courantes. Il peut s’agir d’un{' '}
            <strong>faux site de vente</strong> sur lequel vous avez payé sans jamais recevoir votre commande, de{' '}
            <strong>produits contrefaits</strong> ou <strong>faussement représentés</strong> ou de tentative de phishing ou de vol
            de vos informations personnelles ou bancaires.
          </p>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <h2 className="fr-h4 !text-white">Que faire si vous rencontrez l’un de ces problèmes lors d’un achat sur internet ?</h2>
        <p>
          Si vous avez été victime d’une de ces pratiques sur internet, vous pouvez agir et défendre vos droits en la signalant
          sur SignalConso. Cela permet de faire remonter les pratiques frauduleuses et de protéger d'autres consommateurs.
        </p>
        {button}
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

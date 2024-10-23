import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
  WithSuperheroIllustration,
} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

export function blackFridaySitesFrauduleux(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'AchatInternet')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <WithSuperheroIllustration>
          {illustrationMobile => {
            return (
              <>
                <h1 className="mb-6">
                  <HighlightBlue>Sites frauduleux</HighlightBlue> : protégez vos droits aussi pendant le{' '}
                  <HighlightPurple>Black Friday</HighlightPurple> avec SignalConso
                </h1>
                <p className="text-lg">
                  Le Black Friday attire des millions de consommateurs en ligne, mais il est aussi une période propice à
                  l'apparition de sites frauduleux. Ces plateformes imitent des sites officiels ou des boutiques de confiance pour
                  tromper les internautes et voler leurs informations personnelles ou financières. Il est essentiel de savoir
                  reconnaître ces escroqueries et de protéger vos droits en tant que consommateur.
                </p>
                {illustrationMobile}
                <p className="text-lg">
                  Découvrez vos droits en tant que consommateur face à ces sites frauduleux et en cas de litige, faites un
                  signalement sur SignalConso.
                </p>
                {button}
              </>
            )
          }}
        </WithSuperheroIllustration>

        <div>
          <h2 className="fr-h4 ">Quels sont les dangers des sites frauduleux pendant le black Friday ?</h2>
          <p>Les sites frauduleux peuvent se manifester de différentes manières :</p>
          <ul className="grid md:grid-cols-4 gap-8">
            <li>
              <strong>Produits jamais livrés</strong> : Vous payez, mais ne recevez jamais votre commande.
            </li>
            <li>
              <strong>Produits contrefaits</strong> : Le produit reçu ne correspond pas à ce qui est annoncé, ou est de mauvaise
              qualité.
            </li>
            <li>
              <strong>Vol de données personnelles</strong> : Vos informations personnelles ou bancaires peuvent être dérobées et
              utilisées à des fins malveillantes.
            </li>
            <li>
              <strong>Escroqueries aux frais cachés</strong> : Des frais inattendus ou des abonnements non désirés peuvent être
              ajoutés après votre achat.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">Comment reconnaître un site frauduleux ?</h2>
          <p>Voici quelques indices qui doivent vous alerter :</p>
          <ul className="grid md:grid-cols-4 gap-8">
            <li>
              <strong>URL suspecte</strong> : Vérifiez que l'adresse du site commence bien par "https" et soyez attentif aux
              fautes de frappe ou aux noms de domaine étranges.
            </li>
            <li>
              <strong>Absence d'informations légales</strong> : Les sites légitimes fournissent toujours des informations telles
              que leur adresse, numéro de téléphone et mentions légales.
            </li>
            <li>
              <strong>Prix trop attractifs</strong> : Des réductions incroyablement basses sont souvent un signe d'arnaque.
            </li>
            <li>
              <strong>Moyens de paiement non sécurisés</strong> : Si le site ne propose pas de paiement sécurisé, méfiez-vous.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">Site frauduleux : Quels sont vos droits en tant que consommateur ?</h2>
          <p>
            En France, la loi protège les consommateurs contre les pratiques commerciales trompeuses, y compris les escroqueries
            en ligne. Vous avez notamment le droit de :
          </p>
          <ul className="grid md:grid-cols-2 gap-8">
            <li>
              <strong>Rétractation</strong> : Vous disposez de 14 jours pour annuler un achat effectué en ligne.
            </li>
            <li>
              <strong>Remboursement en cas de fraude</strong> : Si vous avez payé par carte bancaire, vous pouvez contester la
              transaction auprès de votre banque.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez repéré un site frauduleux ? Signalez-le sur SignalConso pour protéger vos droits et aider d'autres
            consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

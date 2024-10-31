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
import Link from 'next/link'
import {notFound} from 'next/navigation'

export function blackFridayRetractation(props: PageComponentProps) {
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
        <>
          <WithSuperheroIllustration>
            {illustrationMobile => {
              return (
                <>
                  <h1 className="mb-6">
                    Besoin d'exercer votre <HighlightBlue>droit de rétractation</HighlightBlue> pendant le{' '}
                    <HighlightPurple>Black Friday</HighlightPurple> ?
                  </h1>
                  <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
                  <p className="text-lg">
                    Pendant le Black Friday, les offres fusent et les achats impulsifs aussi ! Mais que faire si le produit reçu
                    ne correspond finalement pas à vos attentes ? Bonne nouvelle : le droit de rétractation vous permet de changer
                    d'avis.
                  </p>
                  {illustrationMobile}
                  <p className="text-lg">
                    Découvrez tout ce que vous devez savoir en tant consommateur pour exercer ce droit en toute tranquillité et en
                    cas de litige, faites un signalement sur SignalConso.
                  </p>
                </>
              )
            }}
          </WithSuperheroIllustration>
          {button}
        </>
        <div>
          <h2 className="fr-h4 ">Qu'est-ce que le droit de rétractation ?</h2>
          <p>
            Le <b>droit de rétractation</b> est une protection légale qui vous permet de renvoyer un produit acheté à distance
            (internet, téléphone, catalogue) ou hors établissement (foire, porte-à-porte), et de demander le remboursement sans
            avoir à fournir de justification.
          </p>
          <p className="mb-0">
            Ce droit s'exerce <b>pendant 14 jours</b> calendaires à compter de la <b>réception du produit</b> ou de la{' '}
            <b>souscription du contrat</b> pour les services.
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Attention aux exceptions au droit de rétractation !</h2>
          <p>
            Certains produits ou services ne sont pas couverts par le droit de rétractation. C'est le cas par exemple des produits{' '}
            <b>périssables</b>, des biens <b>personnalisés</b> ou fabriqués sur mesure ou des{' '}
            <b>enregistrements audio, vidéo ou logiciels descellés</b> après réception.
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Comment exercer votre droit de rétractation pendant le Black Friday ?</h2>
          <p>Pour exercer votre droit de rétractation :</p>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              Envoyez une <b>déclaration claire</b> (lettre, mail, formulaire de rétractation) au vendeur. La plupart des sites
              mettent un formulaire de rétractation à disposition.
            </li>
            <li>
              <b>Renvoyez le produit dans les 14 jours</b> suivant l'exercice de votre droit de rétractation.
            </li>
            <li>
              <b>Conservez les preuves d'envoi</b> pour prouver que le produit a bien été retourné dans les délais.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">Quand serai-je remboursé après rétractation ?</h2>
          <p>Une fois que vous avez informé le vendeur de votre décision de vous rétracter et renvoyé le produit :</p>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              Le professionnel est <b>obligé de vous rembourser sous 14 jours</b> suivant la réception du produit retourné.
            </li>
            <li>
              Le remboursement <b>inclut les frais de livraison initiaux</b>, mais les frais de retour restent à votre charge sauf
              indication contraire du vendeur. Avant d'acheter, consultez bien les conditions de rétractation du vendeur !
            </li>
            <li>
              <b>Conservez les preuves d'envoi</b> pour prouver que le produit a bien été retourné dans les délais.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Malgré votre prise de contact avec le service client, le professionnel ne vous a toujours pas remboursé ? Signalez-le
            sur SignalConso pour protéger vos droits et aider d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
        <p className="mt-8 mb-0">
          Pour en savoir plus sur vos droits, rendez-vous sur{' '}
          <Link
            target="_blank"
            href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Delais-de-reflexion-ou-de-retractation"
          >
            https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/Delais-de-reflexion-ou-de-retractation
          </Link>
        </p>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

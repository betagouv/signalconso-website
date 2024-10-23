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

export function blackFridayAboFraisCaches(props: PageComponentProps) {
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
                  <HighlightBlue>Abonnements ou frais cachés</HighlightBlue> pendant le{' '}
                  <HighlightPurple>Black Friday</HighlightPurple>?
                </h1>
                <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
                <p className="text-lg">
                  Le Black Friday est souvent synonyme de promotions attractives, mais certains consommateurs peuvent se retrouver
                  piégés par des abonnements ou des frais cachés non annoncés au moment de l'achat. Ces pratiques trompeuses sont
                  pourtant illégales.
                </p>
                {illustrationMobile}
                <p className="text-lg">
                  Il vous est peut-être déjà arrivé d'acheter un produit et de vous retrouver avec des prélèvements inexpliqués
                  sur votre compte en banque. Découvrez vos droits en tant que consommateur face à ces frais ou abonnement cachés
                  et en cas de litige, faites un signalement sur SignalConso.
                </p>
                {button}
              </>
            )
          }}
        </WithSuperheroIllustration>
        <div>
          <h2 className="fr-h4 ">Les frais cachés et abonnements forcés : Quels sont vos droits en tant que consommateur ?</h2>
          <p>
            Le Code de la consommation est très strict concernant l'information fournie aux consommateurs avant tout achat. En
            effet, les vendeurs doivent informer clairement sur l'ensemble des frais associés à un achat ou un abonnement, y
            compris les frais de livraison, d'emballage ou de gestion. Toute omission volontaire constitue une{' '}
            <strong>pratique commerciale trompeuse</strong>.
          </p>
          <p>
            De plus, <strong>tout abonnement ou frais supplémentaire</strong> ajouté sans le{' '}
            <strong>consentement explicite</strong> du consommateur est <strong>illégal</strong>. Le vendeur doit obtenir un
            consentement <strong>clair et éclairé</strong> avant de vous inscrire à un abonnement ou de vous facturer des frais
            supplémentaires.
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Comment repérer les frais cachés ou abonnements forcés ?</h2>
          <p>Les frais cachés ou abonnements non désirés peuvent prendre plusieurs formes :</p>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              <strong>Frais supplémentaires à la dernière étape</strong> : Des frais sont ajoutés juste avant la validation du
              paiement, sans avoir été annoncés auparavant (ex : frais de traitement ou de livraison excessifs).
            </li>
            <li>
              <strong>Abonnement caché</strong> : Après avoir profité d'une offre Black Friday, vous vous retrouvez inscrit à un
              abonnement payant, souvent à cause d'une case pré-cochée ou d'une mention en petits caractères.
            </li>
            <li className="mb-0">
              <strong>Services annexes non souhaités</strong> : Certains sites ajoutent automatiquement des services additionnels
              payants (assurance, extension de garantie) à votre panier sans votre approbation.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">Quelles sont les bonnes pratiques si vous découvrez un abonnement ou des frais cachés ?</h2>
          <ul className="grid md:grid-cols-2 gap-8">
            <li>
              <strong>Annulez immédiatement l'abonnement</strong> : contactez immédiatement le service client pour demander la
              résiliation de l'abonnement et le remboursement des frais engagés.
            </li>
            <li>
              <strong>Demandez un remboursement des frais cachés</strong> : contactez le vendeur pour exiger un remboursement.
              Mentionnez l'absence de transparence et rappelez que cette pratique est illégale.
            </li>
          </ul>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez constaté un abonnement ou des frais cachés ? Signalez-le sur SignalConso pour protéger vos droits et aider
            d'autres consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

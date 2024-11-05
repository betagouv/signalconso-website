import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  NarrowAndCentered,
} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

export function blackFridayGaranties(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'home')}>Je fais un signalement</Button>
    </div>
  )
  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <>
          <NarrowAndCentered>
            <h1 className="mb-6">
              Tout savoir sur <HighlightBlue>les garanties</HighlightBlue> pendant le{' '}
              <HighlightPurple>Black Friday</HighlightPurple>
            </h1>
            <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
            <p className="text-lg">
              Acheter à prix réduit, c'est bien. Mais que faire si le produit tombe en panne ou s'il présente un défaut ? Avec le
              Black Friday, les achats en ligne se multiplient, mais pas d'inquiétude : vous bénéficiez de garanties légales pour
              protéger vos achats.
            </p>
            <p className="text-lg">
              Découvrez vos droits en tant que consommateur en matière de garantie et en cas de litige, faites un signalement sur
              SignalConso.
            </p>
          </NarrowAndCentered>
          {button}
        </>
        <div>
          <h2 className="fr-h4 ">
            Vos droits en tant que consommateur pendant le Black Friday : comment fonctionne la garantie légale de conformité ?
          </h2>
          <p>
            La <b>garantie légale de conformité</b> vous couvre pour les défauts ou les non-conformités d'un produit acheté auprès
            d'un vendeur professionnel. Si le produit ne fonctionne pas comme prévu ou ne correspond pas à sa description, cette
            garantie s'applique automatiquement.
          </p>
          <ul className="space-y-2">
            <li>
              <b>Durée</b> : Elle est valable <b>2 ans</b> à partir de la date de réception de votre produit.
            </li>
            <li>
              <b>Solutions proposées</b> : En cas de défaut de conformité, vous avez droit à{' '}
              <b>une réparation ou un remplacement gratuit</b>. Et si ces solutions sont impossibles, vous pouvez demander un
              remboursement.
            </li>
          </ul>
          <p>
            Les défauts apparus dans les 24 mois suivant l'achat sont présumés présents dès l'achat, ce qui facilite vos démarches
            !
          </p>
        </div>
        <div>
          <h2 className="fr-h4">Et la garantie contre les vices cachés, c'est quoi ?</h2>
          <p>
            La <b>garantie contre les vices cachés</b> s'applique aux défauts qui ne sont pas visibles lors de l'achat mais
            rendent le produit impropre à l'usage attendu, ou diminuent tellement sa valeur que vous n'auriez pas acheté le
            produit si vous l'aviez su.
          </p>
          <ul className="space-y-2">
            <li>
              <b>Durée</b> : Elle est valable <b>2 ans</b> à partir de la découverte du vice caché pour invoquer cette garantie.
            </li>
            <li>
              <b>Solutions proposées</b> : En cas de vice caché, vous pouvez demander un remboursement partiel ou total, ou garder
              le produit contre une réduction de prix.
            </li>
          </ul>
        </div>
        <div>
          {' '}
          <h2 className="fr-h4">La garantie commerciale : attention, ce n'est pas obligatoire !</h2>
          <p>
            Certains vendeurs proposent des <b>garanties commerciales</b>, aussi appelées extensions de garantie. Ces garanties
            payantes peuvent prolonger la durée de protection de votre achat, mais attention :
          </p>
          <ul className="space-y-2">
            <li>
              <b>Vérifiez bien ce qu'elle couvre réellement</b> car parfois, elle n'apporte rien de plus que les garanties
              légales.
            </li>
            <li>
              A gardez à l'esprit qu'elle est <b>facultative</b>. Vous n'êtes pas obligé de l'acheter et elle ne remplace pas la
              garantie légale !
            </li>
          </ul>
          <p>
            Et si le vendeur ne respecte pas la garantie ? Signalez-le sur SignalConso pour protéger vos droits et aider d'autres
            consommateurs !
          </p>
          {button}
        </div>
      </AlternatingPurpleBands>
    </FullWidthPageContainer>
  )
}

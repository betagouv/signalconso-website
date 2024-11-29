import Button from '@codegouvfr/react-dsfr/Button'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandings/manualLandingsComponents'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'

export function venteProduitsPlastiqueUsageUniqueInternet() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'AchatInternet')}>Je fais un signalement</Button>
    </div>
  )

  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <>
          <h1>
            La vente de produits en <HighlightBlue>plastique à usage unique</HighlightBlue> sur{' '}
            <HighlightPurple>internet</HighlightPurple>
          </h1>
          <p className="fr-h3 !mb-8 !text-scbluefrance">
            <strong>Protégez vos droits et renseignez-vous sur la réglementation avec SignalConso !</strong>
          </p>
          <p className="text-xl">
            Avec l’entrée en vigueur de la loi anti-gaspillage et pour une économie circulaire (AGEC), la vente de nombreux
            produits à usage unique est désormais interdite ou encadrée en France. Pourtant, certains commerçants continuent de
            proposer ces produits en ligne, en toute illégalité.
          </p>
          <p className="text-xl">
            <strong>Vous avez le pouvoir</strong> de participer à une <strong>consommation plus responsable</strong> en vous
            renseignant sur la réglementation et en faisant un signalement sur SignalConso.
          </p>
          {button}
        </>
        <>
          <h2 className="fr-h4">
            Vente sur internet de produit en plastique à usage unique&nbsp;: Que dit la réglementation en vigueur&nbsp;?
          </h2>
          <p>
            La France s’est engagée à réduire drastiquement l’impact environnemental des plastiques à usage unique. Depuis 2021 :
          </p>
          <ul>
            <li>Il est interdit de fabriquer, importer ou vendre des produits en plastique à usage unique.</li>
            <li>Les alternatives durables (compostables, biodégradables ou réutilisables) doivent remplacer ces produits.</li>
          </ul>
          <p>
            <strong>Attention</strong> : Si vous achetez ces produits en ligne, vous soutenez des pratiques contraires à la loi et
            nuisibles à l’environnement.
          </p>
          <p>
            Les produits à usage unique <strong>interdits</strong> comprennent :
          </p>
          <ul>
            <li>
              Les <strong>couverts</strong> en plastique (fourchettes, couteaux, cuillères)
            </li>
            <li>
              Les <strong>assiettes</strong> et <strong>gobelets</strong> en plastique
            </li>
            <li>
              Les <strong>pailles</strong> et <strong>touillettes</strong> en plastique
            </li>
            <li>
              Les <strong>cotons-tiges</strong> en plastique
            </li>
            <li>
              Les emballages alimentaires en <strong>polystyrène</strong> <strong>expansé</strong>
            </li>
          </ul>
          <p>
            Ces produits doivent être remplacés par des <strong>alternatives durables</strong>, <strong>réutilisables</strong> ou{' '}
            <strong>compostables</strong>.
          </p>
        </>
        <>
          <h2 className="fr-h4">Comment repérer un produit illégal ? Les bonnes pratiques à adopter&nbsp;!</h2>
          <p>
            Un produit peut être <strong>illégal</strong> si :
          </p>
          <ol>
            <li>Il est entièrement ou partiellement composé de plastique à usage unique.</li>
            <li>Il n’indique aucune alternative durable sur l’emballage ou dans la description.</li>
            <li>Il ne respecte pas les normes européennes en matière d’écologie.</li>
          </ol>
        </>
        <>
          <h2 className="fr-h4">
            Pourquoi faire un signalement sur SignalConso si vous rencontrez des produits en plastique en vente sur internet ?
          </h2>
          <p>Votre signalement est essentiel pour :</p>
          <ul className="mb-8 md:list-none md:pl-0 md:flex md:flex-row md:flex-wrap md:gap-y-4">
            <li className="px-4 basis-1/3">
              <strong>Assurer le respect de la loi</strong> et protéger les consommateurs.
            </li>
            <li className="px-4 basis-1/3">
              <strong>Préserver l’environnement</strong> en limitant les déchets plastiques.
            </li>
            <li className="px-4 basis-1/3">
              <strong>Favoriser un commerce équitable</strong> en ligne.
            </li>
          </ul>
        </>
      </AlternatingPurpleBands>

      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered>
          <p className="text-xl">Chaque signalement compte pour un monde plus responsable.</p>
          <p className="text-xl">
            Vous avez un doute ? Signalez-le sur SignalConso pour protéger vos droits et l’environnement&nbsp;!
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

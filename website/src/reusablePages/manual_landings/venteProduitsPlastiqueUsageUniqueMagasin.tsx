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

export function venteProduitsPlastiqueUsageUniqueMagasin() {
  const lang = 'fr'
  const button = (
    <div className="flex justify-center">
      <Button {...getManualLpButtonProps(lang, 'AchatMagasin')}>Je fais un signalement</Button>
    </div>
  )

  return (
    <FullWidthPageContainer>
      <AlternatingPurpleBands>
        <>
          <h1>
            La vente de produits en <HighlightBlue>plastique à usage unique</HighlightBlue> en{' '}
            <HighlightPurple>magasin physique</HighlightPurple>
          </h1>
          <p className="fr-h3 !mb-8 !text-scbluefrance">
            <strong>Agissez pour une consommation responsable et renseignez-vous sur la réglementation avec SignalConso !</strong>
          </p>
          <p className="text-xl">
            La loi anti-gaspillage (AGEC) interdit depuis 2021 la vente de nombreux produits en plastique à usage unique.
            Pourtant, certains magasins persistent à proposer ces articles en rayon, en violation de la législation.
          </p>
          <p className="text-xl">
            <strong>Vous avez le pouvoir</strong> de participer à une <strong>consommation plus responsable</strong> en vous
            renseignant sur la réglementation et en faisant un signalement sur SignalConso.
          </p>
          {button}
        </>
        <>
          <h2 className="fr-h4">
            Vente en magasin de produit en plastique à usage unique&nbsp;: Que dit la réglementation en vigueur&nbsp;?
          </h2>
          <p>
            La France a adopté des mesures ambitieuses pour r<strong>éduire l’impact des plastiques à usage unique</strong> sur
            l’environnement. Depuis 2021 :
          </p>

          <ul>
            <li>
              <strong>Interdiction stricte</strong> de fabriquer, importer ou vendre des produits en plastique à usage unique.
            </li>
            <li>
              <strong>Substitution obligatoire</strong> par des alternatives durables, comme des produits compostables,
              biodégradables ou réutilisables.
            </li>
          </ul>
          <p>
            <strong>Attention</strong> : Si vous achetez ces produits en magasin, vous soutenez des pratiques contraires à la loi
            et néfaste pour l’environnement.
          </p>
          <p>
            Les produits en plastique à usage unique dont la vente en magasin est <strong>interdite</strong> comprennent :
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
          <p>Ces articles doivent être remplacés par des solutions écologiques et durables.</p>
        </>
        <>
          <h2 className="fr-h4">Comment reconnaître un produit illégal en magasin ? Les bonnes pratiques à adopter&nbsp;!</h2>
          <p>Soyez vigilant lors de vos achats. Un produit peut être illégal si :</p>
          <ol>
            <li>
              <strong>Il contient du plastique à usage unique</strong>, totalement ou partiellement.
            </li>
            <li>
              <strong>Il ne propose aucune alternative durable</strong> sur l’emballage ou dans sa description.
            </li>
            <li>
              <strong>Il ne respecte pas les normes européennes</strong> en matière de durabilité ou d’écologie.
            </li>
          </ol>
        </>
        <>
          <h2 className="fr-h4">
            Pourquoi faire un signalement sur SignalConso si vous constatez en magasin la vente de produits en plastique ?
          </h2>
          <ul>
            <li>
              <strong>Protéger l’environnement</strong> en limitant les déchets plastiques.
            </li>
            <li>
              <strong>Favoriser un commerce équitable</strong> en ligne.
            </li>
            <li>
              Faire <strong>respecter la loi</strong> et garantir des pratiques équitables.
            </li>
            <li>
              Encourager les commerçants à adopter des <strong>solutions alternatives</strong>.
            </li>
          </ul>
        </>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered>
          <p className="text-xl">Chaque action compte pour un commerce plus responsable !</p>
          <p className="text-xl">
            Alors si vous avez un doute, signalez-le sur SignalConso pour protéger vos droits et l’environnement&nbsp;!
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

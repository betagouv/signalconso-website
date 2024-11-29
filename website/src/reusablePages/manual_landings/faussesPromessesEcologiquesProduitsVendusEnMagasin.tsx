import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandings/manualLandingsComponents'

export function faussesPromessesEcologiquesProduitsVendusEnMagasin() {
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
            <HighlightBlue>Fausses promesses écologiques</HighlightBlue> sur des produits vendus en{' '}
            <HighlightPurple>magasin physique</HighlightPurple>
          </h1>
          <p className="fr-h3 !mb-8 !text-scbluefrance">
            <strong>Agissez et renseignez-vous sur la réglementation avec SignalConso !</strong>
          </p>
          <p className="text-xl">
            Certains magasins affichent des allégations environnementales trompeuses sur leurs produits. Découvrez comment les
            repérer et comment signaler ces pratiques frauduleuses.
          </p>
          {button}
        </>
        <>
          <h2 className="fr-h4">Produits avec fausses allégations environnementales : ce que dit la réglementation</h2>
          <p>
            La législation française interdit les pratiques commerciales trompeuses et cela comprend les fausses allégations
            environnementales, également appelées <strong>greenwashing</strong>.
          </p>
          <ul>
            <li>
              <strong>Une allégation environnementale doit être vérifiable</strong> : les informations présentées doivent être
              exactes, claires et basées sur des preuves.
            </li>
            <li>
              <strong>Les mentions vagues ou non justifiées</strong> comme “éco-responsable”, “100 % naturel” ou “respectueux de
              l’environnement” sont illégales si elles ne reposent sur aucun argument solide.
            </li>
          </ul>
          <p>
            <strong>Attention :</strong> Ces pratiques induisent les consommateurs en erreur et ralentissent la transition
            écologique.
          </p>
        </>
        <>
          <h2 className="fr-h4">Comment reconnaître de fausses allégations&nbsp;?</h2>
          <p>Voici des exemples de promesses environnementales trompeuses :</p>
          <ul>
            <li>
              <strong>Mentions vagues ou non justifiées</strong> : “Produit écologique” ou “Respecte la nature”, sans explications
              ou labels officiels.
            </li>
            <li>
              <strong>Labels inventés ou non certifiés</strong> : usage de faux logos ou certifications inconnues.
            </li>
            <li>
              <strong>Déclarations incomplètes ou trompeuses</strong> : prétendre qu’un produit est “sans plastique” alors qu’il
              contient d’autres matériaux polluants.
            </li>
            <li>
              <strong>Mise en avant excessive d’un seul aspect écologique</strong> (par exemple, un emballage recyclable) tout en
              omettant les impacts environnementaux globaux du produit.
            </li>
          </ul>
        </>
        <>
          <h2 className="fr-h4">
            Pourquoi faire un signalement sur SignalConso si vous constatez en magasin des fausses allégations environnementales ?
          </h2>
          <p>Votre signalement est essentiel pour :</p>
          <ul>
            <li>
              <strong>Lutter contre le greenwashing</strong>, en obligeant les commerçants à respecter la réglementation.
            </li>
            <li>
              <strong>Protéger les consommateurs</strong>, en garantissant une <strong>information fiable et transparente</strong>
              .
            </li>
            <li>
              Encourager des <strong>pratiques commerciales responsables</strong>, favorisant une transition écologique réelle.
            </li>
          </ul>
        </>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered>
          <p className="text-xl">
            Chaque signalement est un pas vers un <strong>commerce plus honnête et durable</strong> !
          </p>
          <p className="text-xl">
            <strong>Si vous avez un doute, signalez-le sur SignalConso pour protéger vos droits et l’environnement&nbsp;!</strong>
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

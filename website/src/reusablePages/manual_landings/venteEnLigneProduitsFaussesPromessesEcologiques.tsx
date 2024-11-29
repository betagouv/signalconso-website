import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  HighlightPurple,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function venteEnLigneProduitsFaussesPromessesEcologiques() {
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
            <HighlightBlue>Vente en ligne</HighlightBlue> de produits avec de{' '}
            <HighlightPurple>fausses promesses écologiques</HighlightPurple>
          </h1>
          <p className="fr-h3 !mb-8 !text-scbluefrance">
            <strong>Agissez et renseignez-vous sur la réglementation avec SignalConso !</strong>
          </p>
          <p className="text-xl">
            De nombreux produits vendus en ligne affichent des allégations environnementales trompeuses. Découvrez comment les
            identifier et comment signaler ces pratiques abusives sur SignalConso.
          </p>
          {button}
        </>
        <>
          <h2 className="fr-h4">Produits avec fausses allégations environnementales : ce que dit la réglementation</h2>
          <p>
            La législation française interdit les pratiques commerciales trompeuses telles que les{' '}
            <strong>fausses allégations environnementales (greenwashing)</strong>, et cela même en ligne.
          </p>
          <ul>
            <li>
              Les <strong>allégations</strong> doivent être <strong>justifiées</strong> : les informations environnementales
              fournies doivent être exactes, claires et vérifiables.
            </li>
            <li>
              Les termes <strong>vagues</strong> ou <strong>non prouvés</strong> sont illégaux sans preuve ou certification
              fiable.
            </li>
          </ul>
          <p>
            Le <strong>greenwashing</strong> en ligne est particulièrement trompeur car il exploite la difficulté des
            consommateurs à vérifier les informations sur des produits qu’ils ne peuvent pas examiner physiquement.
          </p>
        </>
        <>
          <h2 className="fr-h4">Exemples de pratiques courantes de fausses allégations environnementales en ligne</h2>
          <p>Voici des exemples de fausses allégations environnementales couramment trouvées sur les sites de vente en ligne :</p>
          <ul>
            <li>
              <strong>Descriptions floues ou non justifiées</strong> : “Produit 100 % vert” ou “Zéro impact”, sans explications ou
              preuves.
            </li>
            <li>
              <strong>Labels douteux</strong> : présence de faux logos environnementaux ou certifications inconnues.
            </li>
            <li>
              <strong>Publicités trompeuses</strong> : insistance sur un aspect soi-disant écologique (ex. : “emballage
              recyclable”) sans mentionner les impacts globaux.
            </li>
            <li>
              <strong>Informations cachées ou contradictoires</strong> : un produit décrit comme “biodégradable” mais accompagné
              d’instructions indiquant qu’il doit être jeté comme un produit classique.
            </li>
          </ul>
        </>
        <>
          <h2 className="fr-h4">
            Pourquoi faire un signalement sur SignalConso si vous constatez en ligne des fausses allégations environnementales ?
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
          <p>Avant d’acheter, prenez le temps de vérifier la fiabilité des informations affichées.</p>
        </>
        <>
          <h2 className="fr-h4">Pourquoi signaler ces pratiques ?</h2>
          <p>Votre signalement permet de :</p>
          <ul>
            <li>
              <strong>Lutter contre les pratiques commerciales trompeuses</strong>, en alertant les autorités sur les fausses
              allégations environnementales.
            </li>
            <li>
              <strong>Protéger les consommateurs</strong>, en favorisant une information fiable et vérifiable.
            </li>
            <li>
              <strong>Encourager une concurrence équitable</strong>, en pénalisant les vendeurs qui profitent du greenwashing pour
              attirer des clients.
            </li>
          </ul>
        </>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered>
          <p className="text-xl">
            En signalant, vous contribuez à un commerce en ligne plus transparent et respectueux de l’environnement !
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

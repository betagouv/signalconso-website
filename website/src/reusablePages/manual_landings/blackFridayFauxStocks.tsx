import {
  AlternatingPurpleBands,
  HighlightBlue,
  HighlightPurple,
  LinkToFichePratique,
  LpColoredBand,
  NarrowAndCentered,
  getManualLpButtonProps,
} from '@/landings/manualLandingsUtils'

import Button from '@codegouvfr/react-dsfr/Button'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'

export function blackFridayFauxStocks(props: PageComponentProps) {
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
        <NarrowAndCentered>
          <h1 className="mb-6">
            Fausse information sur <HighlightBlue>l’état des stocks</HighlightBlue> pendant le{' '}
            <HighlightPurple>Black Friday</HighlightPurple> ?
          </h1>
          <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
          <p className="text-lg">
            Le Black Friday est une période idéale pour profiter de réductions importantes, mais elle peut également être synonyme
            de pratiques commerciales trompeuses. L'une des plus courantes concerne la fausse information sur l'état des stocks.
            Vous avez peut-être déjà vu des offres alléchantes annoncées comme "stock limité" ou "dernière chance", pour ensuite
            découvrir que les produits sont en réalité toujours disponibles.
          </p>
          <p className="text-lg">
            Découvrez vos droits en tant que consommateur face à ces fausses informations sur l’état des stocks et en cas de
            litige, faites un signalement sur SignalConso.
          </p>
          {button}
        </NarrowAndCentered>
        <div>
          <h2 className="fr-h4 ">Fausse information sur l’état des stocks : Quels sont vos droits en tant que consommateur ?</h2>
          <p>
            Le Code de la consommation prévoit que tout commerçant fournisse des informations <strong>claires</strong>,{' '}
            <strong>véridiques</strong> et <strong>complètes</strong>. Afficher des produits comme étant en stock limité, alors
            qu'ils ne le sont pas réellement, est considéré comme une <strong>pratique commerciale trompeuse</strong>. Cela peut
            fausser votre décision d'achat en vous incitant à acheter dans l’urgence.
          </p>
          <p>Cela signifie que les commerçants doivent respecter les principes suivants :</p>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              <strong>Transparence sur les stocks</strong> : Les annonces de stock limité doivent correspondre à la réalité des
              inventaires.
            </li>
            <li>
              <strong>Publicité honnête</strong> : Les promotions doivent refléter les vraies réductions par rapport aux prix
              pratiqués avant la période du Black Friday.
            </li>
            <li className="mb-0">
              <strong>Pas de fausse urgence</strong> : Les promotions basées sur une soi-disant pénurie ne doivent pas induire en
              erreur.
            </li>
          </ul>
        </div>
        <div>
          <NarrowAndCentered>
            <h2 className="fr-h4">Comment éviter les pièges pendant le Black Friday ?</h2>
            <p>Pour vous protéger, voici quelques conseils avant de valider un achat :</p>
            <ul className="grid md:grid-cols-3 gap-8">
              <li>
                <strong>Comparez les prix</strong> sur plusieurs sites avant de céder à la pression de l'urgence.
              </li>
              <li>
                <strong>Lisez les avis</strong> clients et vérifiez la réputation du vendeur.
              </li>
              <li className="mb-0">
                <strong>Prenez votre temps</strong> et ne vous laissez pas influencer par des messages d’urgence qui peuvent être
                trompeurs.
              </li>
            </ul>
          </NarrowAndCentered>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez constaté une fausse information sur l'état des stocks ou vous vous êtes senti trompé par une offre ?
            Signalez-le sur SignalConso !
          </p>
          {button}
        </NarrowAndCentered>
        <LinkToFichePratique url="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/pieges-sur-les-sites-de-commerce-en-ligne-attention-aux-dark-patterns"
        text="la fiche pratique Dark pattern"
         />
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

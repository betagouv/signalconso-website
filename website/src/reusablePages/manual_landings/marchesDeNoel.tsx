import Button from '@codegouvfr/react-dsfr/Button'
import {
  AlternatingPurpleBands,
  getManualLpButtonProps,
  HighlightBlue,
  LpColoredBand,
  NarrowAndCentered,
} from '@/landings/manualLandings/manualLandingsComponents'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Link from 'next/link'

export function marchesDeNoel() {
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
            Profitez des <HighlightBlue>marchés de Noël</HighlightBlue> en toute sérénité&nbsp;!
          </h1>
          <p className="fr-h3 !mb-8 !text-scbluefrance">
            <strong>Protégez vos droits avec SignalConso</strong>
          </p>
          <p className="text-xl">
            Les Fêtes approchent. Les marchés de Noël illuminent nos villes et nos villages, offrant des produits du terroir et
            des créations artisanales uniques. C’est le moment idéal pour trouver des cadeaux originaux ou déguster des
            spécialités de saison.
          </p>
          <p className="text-xl">
            Mais comment s’assurer de faire des achats en toute confiance ? Découvrez les points de vigilance et en cas de
            problème, faites un signalement sur SignalConso.
          </p>
          {button}
        </>
        <>
          <h2 className="fr-h4">Ce qu’il faut savoir avant d’acheter sur un marché de Noël</h2>
          <p>
            <strong>Vérifiez l’origine des produits :</strong> Les denrées alimentaires comme le miel ou l’huile d’olive doivent
            indiquer clairement leur origine.
          </p>
          <p>Pour d’autres produits, cette information est obligatoire si son absence peut prêter à confusion.</p>
          <p>
            <strong>Choisissez des labels de qualité :</strong> Privilégiez les mentions “Fabriqué en France”, “Made in France”,
            ou des labels tels que les{' '}
            <strong>AOP (Appellation d’Origine Protégée) ou AOC (Appellation d’Origine Contrôlée).</strong> Ces labels
            garantissent un savoir-faire unique et une origine contrôlée.
          </p>
          <p>
            <strong>Exigez la transparence sur les prix et les produits&nbsp;:</strong> Les prix doivent être clairement affichés
            à proximité des produits vendus.
          </p>
          <p>L’origine des produits doit être précisée pour éviter tout doute sur leur caractère local ou artisanal.</p>
          <p>
            <strong>Réfléchissez bien avant d’acheter&nbsp;:</strong> contrairement aux achats en ligne, le droit de rétractation
            ne s’applique pas aux achats effectués sur les marchés de Noël.
          </p>
          <p>
            Les commerçants doivent cependant informer les consommateurs de cette règle via une{' '}
            <strong>signalisation visible</strong>.
          </p>
        </>
        <>
          <h2 className="fr-h4">Que faire en cas de problème&nbsp;?</h2>
          <p>
            Si vous avez constaté un problème d’affichage des prix, une tromperie ou une utilisation frauduleuse de label ou
            d’appellation, vous pouvez agir et défendre vos droits en signalant la pratique sur SignalConso.
          </p>
          <p>Cela permet de faire remonter les pratiques frauduleuses et de protéger d’autres consommateurs.</p>
        </>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered>
          <p className="text-xl">
            <strong>
              Vous avez rencontré un problème sur un marché de Noël ? Signalez-le sur SignalConso pour protéger vos droits et
              aider d’autres consommateurs !
            </strong>
          </p>
          {button}
          <p className="mt-4">
            Pour en savoir plus sur vos droits, allez lire nos{' '}
            <Link
              href="https://www.economie.gouv.fr/particuliers/marches-noel-conseils-bien-acheter"
              target="_blank"
              rel="noopener"
            >
              conseils pour bien acheter sur un marché de Noël
            </Link>
          </p>
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

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

export function blackFridayFausseReduction(props: PageComponentProps) {
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
                  <HighlightBlue>Fausses réductions de prix</HighlightBlue> pendant le{' '}
                  <HighlightPurple>Black Friday</HighlightPurple>?
                </h1>
                <p className="fr-h3 !mb-4 !text-scbluefrance">Protégez vos droits avec SignalConso !</p>
                <p className="text-lg">
                  Le Black Friday est synonyme de bonnes affaires, mais attention aux fausses réductions de prix ou au promotion
                  mensongère. Certains commerçants peu scrupuleux gonflent artificiellement leurs prix juste avant cette période,
                  pour ensuite afficher de fausses réductions. Vous avez peut-être déjà vu des produits en promotion, alors qu'ils
                  sont vendus au même prix, voire plus cher que d'habitude.
                </p>
                {illustrationMobile}
                <p className="text-lg">
                  Découvrez vos droits en tant que consommateur face à ces fausses réductions de prix et en cas de litige, faites
                  un signalement sur SignalConso.
                </p>
                {button}
              </>
            )
          }}
        </WithSuperheroIllustration>
        <div>
          <h2 className="fr-h4 ">Fausses réductions de prix : Quels sont vos droits en tant que consommateur ?</h2>
          <p>Selon le Code de la consommation, les commerçants doivent respecter certaines règles concernant les promotions :</p>
          <ul className="grid md:grid-cols-2 gap-8">
            <li>
              <strong>Prix de référence réel</strong> : Le prix "avant réduction" doit être celui effectivement pratiqué avant la
              période de promotion. Gonfler artificiellement ce prix constitue une pratique commerciale trompeuse, punie par la
              loi.
            </li>
            <li>
              <strong>Transparence des remises</strong> : Les commerçants doivent indiquer clairement le prix de départ, le
              pourcentage de réduction et le prix final.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">Comment repérer une fausse réduction de prix ?</h2>
          <p>Avant d'acheter, voici quelques astuces pour détecter les fausses réductions :</p>
          <ul className="grid md:grid-cols-3 gap-8">
            <li>
              Surveillez les prix avant le Black Friday : Si vous avez repéré un article, vérifiez son prix plusieurs semaines
              avant la période des promotions.
            </li>
            <li>
              Utilisez des comparateurs de prix : De nombreux outils en ligne permettent de suivre l'évolution des prix d'un
              produit sur plusieurs sites.
            </li>
            <li className="mb-0">
              Méfiez-vous des trop grosses remises : Des réductions de plus de 50% peuvent parfois cacher une fausse promotion ou
              un produit de mauvaise qualité.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="fr-h4">Que faire en cas de fausse réduction ?</h2>
          <p className="mb-0">
            Si vous avez constaté une fausse réduction de prix, vous pouvez agir et défendre vos droits en signalant la pratique
            sur SignalConso. Cela permet de faire remonter les pratiques frauduleuses et de protéger d'autres consommateurs.
          </p>
        </div>
      </AlternatingPurpleBands>
      <LpColoredBand className="bg-scblueinfo text-white py-8">
        <NarrowAndCentered narrower>
          <p className="text-lg">
            Vous avez constaté une fausse promotion ? Signalez-le sur SignalConso pour protéger vos droits et aider d'autres
            consommateurs !
          </p>
          {button}
        </NarrowAndCentered>
      </LpColoredBand>
    </FullWidthPageContainer>
  )
}

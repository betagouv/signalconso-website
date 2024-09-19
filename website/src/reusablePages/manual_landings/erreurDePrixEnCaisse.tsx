import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'

export function erreurDePrixEnCaisse(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">Vous avez constaté un prix différent en magasin et en caisse ?</h1>
            <p className="text-xl">
              Lorsque le prix affiché en rayon diffère de celui passé en caisse, cela peut constituer une infraction à la
              réglementation sur l’affichage des prix. En tant que consommateur, il est important de connaître vos droits et
              d’agir si vous êtes confronté à ce type de situation !
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'AchatMagasin')}>
                Je signale une erreur de prix en caisse
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Que dit la loi sur l’affichage des prix ?</h2>
          <p className="text-lg">
            Le code de la consommation impose que le prix d’un produit ou service soit clairement affiché et respecté. Lorsqu’une
            différence est constatée, le consommateur est en droit de payer le prix le plus bas indiqué. Toutefois, en cas
            d’erreur manifeste, le commerçant peut refuser la vente.
          </p>
          <p className="text-lg">
            Par exemple, un professionnel peut refuser de vendre un produit à haute valeur qui a été affiché à un prix dérisoire
            par inadvertance.
          </p>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Quels sont les cas fréquents d'erreur d'affichage des prix ?</h2>
          <ul className="mb-8 md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">Prix en caisse supérieur à celui affiché en rayon.</li>
            <li className="text-lg basis-1/4">Promotions non appliquées ou disparité entre publicité et prix facturé.</li>
            <li className="text-lg basis-1/4">
              Prix mal indiqués dans des secteurs comme les restaurants, garages ou coiffeurs.
            </li>
          </ul>

          <p className="text-lg font-bold">Si vous constatez des écarts, n’hésitez pas à agir et à protéger vos droits.</p>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <p className="text-lg mt-4">
            SignalConso est une plateforme qui permet aux consommateurs de signaler les problèmes rencontrés lors de leurs achats.
            Que ce soit pour une erreur de prix, un défaut d'affichage ou toute autre pratique commerciale trompeuse, vous
            participez à la protection des consommateurs en aidant la DGCCRF à enquêter et à corriger ces pratiques.
          </p>
          <p className="text-lg mb-8">
            Protégez-vous et faites respecter vos droits : signalez toute anomalie de prix avec SignalConso !
          </p>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

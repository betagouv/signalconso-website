import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'

export function repasSurPlaceCouvertsJetables(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">
              Votre repas sur place est servi avec des couverts jetables : Signalez les problématiques de consommation durable sur
              SignalConso
            </h1>
            <p className="text-xl">
              Alors que la France poursuit ses efforts vers une consommation plus responsable, l’usage de{' '}
              <strong>couverts jetables</strong> pour les repas servis sur place continue de soulever des questions sur les
              impacts environnementaux. Bien que pratique pour les restaurateurs, ce type de consommation génère une quantité non
              négligeable de déchets plastiques et va à l’encontre des principes de <strong>consommation durable</strong>. Depuis
              le 1er janvier 2021, les <strong>couverts en plastique à usage unique sont interdits</strong> en France.
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'CafeRestaurant')}>
                Faites un signalement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Que dit la loi sur les couverts jetables ?</h2>
          <p className="text-lg">
            La réglementation française évolue rapidement pour lutter contre les déchets plastiques, et cela concerne aussi la
            restauration :
          </p>
          <p className="text-lg">
            <strong>Interdiction des plastiques à usage unique :</strong> Depuis le 1er janvier 2021, les{' '}
            <strong>couverts en plastique à usage unique sont interdits</strong> en France dans le cadre de la loi anti-gaspillage
            pour une économie circulaire. Cela concerne également les assiettes, verres, pailles et touillettes.
          </p>
          <p className="text-lg">
            <strong>Favoriser la réutilisation :</strong> Les restaurants, même pour des repas à emporter ou en livraison, sont
            encouragés à utiliser des <strong>contenants réutilisables</strong> ou compostables pour leurs clients. Pour les repas
            sur place, l’usage de vaisselle durable est même obligatoire.
          </p>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Quel est l’impact environnemental des couverts jetables ?</h2>
          <p className="text-lg">
            La fourniture de couverts jetables dans les restaurants, même pour des repas consommés sur place, présente plusieurs
            enjeux environnementaux importants :
          </p>
          <p className="text-lg">
            <strong>Production massive de déchets :</strong> Les couverts jetables, qu’ils soient en plastique, en bois ou en
            carton, finissent généralement à la poubelle après une seule utilisation. Cela contribue à la production massive de
            déchets, dont une grande partie n’est pas recyclée correctement. Ces déchets mettent des décennies, voire des siècles,
            à se décomposer dans la nature.
          </p>
          <p className="text-lg">
            <strong>Pollution plastique :</strong> Si les couverts sont en plastique, ils participent directement à la pollution
            des océans et des sols, en particulier lorsque le tri des déchets n’est pas fait correctement. Les microplastiques
            issus de ces produits ont un effet dévastateur sur les écosystèmes marins.
          </p>
          <p className="text-lg">
            <strong>Épuisement des ressources naturelles :</strong> La production de couverts à usage unique, qu’ils soient en
            plastique ou en matériaux dits plus “écolos” comme le bois ou le bambou, nécessite des ressources importantes :
            extraction de pétrole, abattage d’arbres, utilisation d’énergie pour la fabrication et le transport. Cette
            consommation de ressources non renouvelables alourdit considérablement l’empreinte écologique.
          </p>
          <p className="text-lg">
            <strong>Emballages superflus :</strong> En plus des couverts eux-mêmes, ces articles sont souvent fournis dans des
            emballages plastiques supplémentaires, ce qui amplifie la quantité de déchets produits.
          </p>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <h2 className="fr-h4 !text-white">Pourquoi faire un signalement sur SignalConso ?</h2>
          <p className="text-lg">
            Si, malgré la législation, vous constatez encore l’utilisation de couverts jetables dans un restaurant, vous avez le
            pouvoir d’agir en effectuant un signalement via SignalConso.
          </p>
          <p className="text-lg">Ce signalement permettra :</p>
          <ul className="ml-4">
            <li className="text-lg">
              D’encourager des pratiques conformes à la législation en vigueur en matière d’usage unique et de lutte contre la
              pollution plastique.
            </li>
            <li className="text-lg">
              De protéger l’environnement en réduisant les déchets et en favorisant une prise de conscience des restaurateurs sur
              l’impact de leurs choix.
            </li>
          </ul>
          <p className="text-lg">
            Chacun de nous peut être acteur d’un changement positif. En signalant les pratiques non conformes ou en encourageant
            les restaurateurs à adopter des solutions durables, nous participons collectivement à la réduction des déchets et à la
            protection de l’environnement.
          </p>
          <p className="text-lg">Ensemble, agissons pour une restauration plus respectueuse de la planète.</p>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

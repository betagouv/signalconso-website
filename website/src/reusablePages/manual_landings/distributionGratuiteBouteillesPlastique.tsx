import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {getManualLpButtonProps} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function distributionGratuiteBouteillesPlastique() {
  const lang = 'fr'
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">
              Distribution gratuite de bouteilles en plastique : Un geste anodin mais un impact majeur à signaler sur SignalConso
              !
            </h1>
            <p className="text-xl">
              Lors de festivals, événements sportifs, ou même en magasin, il est courant de se voir proposer des bouteilles en
              plastique gratuitement. Si ce geste peut sembler pratique et sans conséquences, il cache pourtant un{' '}
              <strong>impact environnemental considérable</strong>. La distribution gratuite de bouteilles en plastique contribue
              à l’augmentation des déchets plastiques, l’un des fléaux environnementaux les plus urgents à traiter aujourd’hui.
              Alors Signalez-le sur SignalConso.
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
          <h2 className="fr-h4">Que dit la réglementation sur la distribution de plastique ?</h2>
          <p className="text-lg">
            Face à l’urgence climatique et aux problématiques liées aux déchets, la <strong>loi anti-gaspillage</strong> adoptée
            en France a pour but de réduire la consommation de plastique à usage unique. La distribution gratuite de bouteilles en
            plastique dans certains lieux publics ou lors d’événements est encadrée, avec pour objectif de promouvoir des
            alternatives durables comme les bouteilles réutilisables ou les points d’eau potable.
          </p>
          <p className="text-lg">Les organisateurs d’événements et les commerces sont encouragés à :</p>
          <ul className="md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">Limiter l’usage de plastique à usage unique.</li>
            <li className="text-lg basis-1/4">
              Proposer des bouteilles réutilisables ou des alternatives écologiques (bouteilles en verre, gourdes, etc.).
            </li>
            <li className="text-lg basis-1/4">
              Installer des fontaines à eau pour permettre aux consommateurs de se servir sans générer de déchets plastiques.
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Pourquoi la distribution de bouteilles en plastique pose problème ?</h2>
          <p className="text-lg">
            <strong>Le plastique à usage unique :</strong> Une grande majorité des bouteilles en plastique distribuées
            gratuitement sont à usage unique. Cela signifie qu’elles sont rapidement jetées après une seule utilisation,
            rejoignant ainsi la masse grandissante de déchets plastiques qui finissent dans les décharges ou les océans. Chaque
            année, des millions de tonnes de plastique finissent dans nos écosystèmes.
          </p>
          <p className="text-lg">
            <strong>Un faible taux de recyclage :</strong> Même lorsque des bouteilles en plastique sont collectées via des
            systèmes de tri, seulement une fraction est réellement recyclée. La majeure partie finit par être incinérée ou
            stockée, contribuant à la pollution.
          </p>
          <p className="text-lg">
            <strong>Un coût environnemental énorme :</strong> La production de plastique nécessite des ressources considérables,
            notamment du pétrole et de l’eau. La distribution gratuite de bouteilles contribue donc indirectement à la
            surexploitation de ces ressources naturelles.
          </p>
        </div>
      </div>
      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Comment pouvez-vous agir en tant que consommateur ?</h2>
          <p className="text-lg">
            En tant que consommateur, vous pouvez contribuer à réduire la distribution inutile de bouteilles en plastique :
          </p>
          <ul className="md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">
              Refusez les bouteilles gratuites lorsque cela est possible et optez pour une gourde réutilisable.
            </li>
            <li className="text-lg basis-1/4">
              Sensibilisez votre entourage : Faites prendre conscience des impacts environnementaux de ces gestes anodins.
            </li>
            <li className="text-lg basis-1/4">Faites un signalement sur SignalConso</li>
          </ul>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <h2 className="fr-h4 !text-white">Pourquoi signaler sur SignalConso ?</h2>
          <p className="text-lg">En signalant la distribution abusive de bouteilles en plastique, vous participez à :</p>
          <ul className="ml-4">
            <li className="text-lg">
              <strong>Faire respecter les lois environnementales :</strong> Les entreprises et organisateurs ont l’obligation de
              réduire leur impact écologique, et chaque signalement aide à les responsabiliser.
            </li>
            <li className="text-lg">
              <strong>Favoriser les pratiques écoresponsables :</strong> Vos signalements encouragent l’adoption de solutions plus
              durables dans les événements publics et les points de vente.
            </li>
            <li className="text-lg">
              <strong>Contribuer à la réduction des déchets plastiques :</strong> Moins de bouteilles en plastique distribuées,
              c’est moins de déchets dans nos décharges et nos océans.
            </li>
          </ul>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

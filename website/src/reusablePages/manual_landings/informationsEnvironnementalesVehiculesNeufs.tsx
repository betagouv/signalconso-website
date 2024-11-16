import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {getManualLpButtonProps} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function informationsEnvironnementalesVehiculesNeufs() {
  const lang = 'fr'
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex justify-center">
          <div className="flex flex-col max-w-4xl">
            <h1 className="text-white">
              Informations environnementales pour les véhicules neufs : Protégez vos Droits avec SignalConso !
            </h1>
            <p className="text-xl">
              Lors de l’achat d’un véhicule neuf, les consommateurs sont en droit de recevoir des{' '}
              <strong>informations précises</strong> sur <strong>l’impact environnemental</strong> de ce véhicule. Il s'agit
              notamment de l'étiquette énergie qui indique les émissions de CO2, la consommation de carburant et, dans certains
              cas, les informations sur les émissions d'autres polluants atmosphériques. Pourtant, certains concessionnaires ou
              sites de vente omettent de fournir ces informations essentielles.
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'VoitureVehiculeVelo')}>
                Faites un signalement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Que dit la loi en matière d’information environnementale sur les véhicules neufs ?</h2>
          <p className="text-lg">
            Depuis plusieurs années, la législation impose aux vendeurs de véhicules neufs de{' '}
            <strong>fournir des informations environnementales claires</strong>. Cela inclut l’affichage d’une{' '}
            <strong>étiquette énergie</strong> similaire à celles utilisées pour les appareils électroménagers. L’objectif est de
            donner aux consommateurs une idée précise de l’impact écologique de leur futur véhicule.
          </p>
          <p className="text-lg">Cette étiquette doit comporter :</p>
          <ul className="ml-4">
            <li className="text-lg">Les émissions de CO2 (exprimées en grammes par kilomètre).</li>
            <li className="text-lg">La consommation de carburant (exprimée en litres pour 100 km).</li>
            <li className="text-lg">La classe énergétique du véhicule (allant de A à G, selon les émissions de CO2).</li>
            <li className="text-lg">D’autres informations sur les émissions polluantes (NOx, particules fines, etc.).</li>
          </ul>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Pourquoi est-ce important ?</h2>
          <p className="text-lg">
            Choisir un véhicule, c'est faire un investissement à long terme, mais c'est aussi avoir un impact sur l’environnement.
            En disposant des informations environnementales, vous pouvez :
          </p>
          <ul className="md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">
              Comparer les véhicules entre eux en fonction de leur <strong>efficacité énergétique.</strong>
            </li>
            <li className="text-lg basis-1/4">
              Faire un <strong>choix éclairé</strong> qui prend en compte à la fois le coût d’usage et les émissions de CO2.
            </li>
            <li className="text-lg basis-1/4">
              Contribuer à <strong>réduire votre empreinte carbone</strong> en optant pour des véhicules plus écologiques.
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">Que faire si ces informations ne sont pas fournies ?</h2>
          <p className="text-lg">
            Il arrive que certains vendeurs ne respectent pas ces obligations. Si vous ne voyez pas d’étiquette énergie affichée
            ou si l’impact environnemental du véhicule n’est pas clairement expliqué faites un signalement sur SignalConso.
          </p>
        </div>
      </div>

      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <h2 className="fr-h4 !text-white">Pourquoi signaler sur SignalConso ?</h2>
          <p className="text-lg">
            En signalant l’absence d’informations environnementales sur les véhicules neufs, vous contribuez à :
          </p>
          <ul className="md:pl-0 md:flex md:flex-row md:justify-around">
            <li className="text-lg basis-1/4">Garantir la transparence pour tous les consommateurs.</li>
            <li className="text-lg basis-1/4">Encourager les vendeurs à respecter leurs obligations légales.</li>
            <li className="text-lg basis-1/4">
              Réduire l’impact environnemental en sensibilisant les acheteurs à l’efficacité énergétique.
            </li>
          </ul>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

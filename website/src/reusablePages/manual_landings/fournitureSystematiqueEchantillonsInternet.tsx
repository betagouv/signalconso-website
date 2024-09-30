import {PageComponentProps} from '@/core/metadatas'
import {notFound} from 'next/navigation'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import Button from '@codegouvfr/react-dsfr/Button'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'

export function fournitureSystematiqueEchantillonsInternet(props: PageComponentProps) {
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
              Fourniture non sollicitée d’échantillons : Signalez les pratiques impactant la consommation durable sur SignalConso
              !
            </h1>
            <p className="text-xl">
              En matière de <strong>consommation durable</strong>, la fourniture non sollicitée d’échantillons gratuits pose une
              vraie question : ces "cadeaux" sont-ils vraiment sans conséquence pour la planète et les consommateurs ? Si recevoir
              des produits gratuits peut sembler anodin, dans une optique de consommation durable, il est important de dénoncer
              ces pratiques qui créent un gaspillage inutile et une incitation à la surconsommation.
            </p>
            <div className="flex justify-center w-full">
              <Button className=" border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'AchatInternet')}>
                Faites un signalement
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <h2 className="fr-h4">L’envers du décor : un geste anti-écolo ?</h2>
          <p className="text-lg">
            Si nous pensons souvent aux échantillons gratuits comme une manière de découvrir de nouveaux produits, il est
            important de prendre du recul et d’évaluer l'impact environnemental et éthique de ces pratiques commerciales :
          </p>
          <ul className="ml-4">
            <li className="text-lg">
              Surproduction et gaspillage : L’envoi d’échantillons non sollicités contribue à la surproduction de biens,
              entraînant un gaspillage de ressources naturelles. Ces produits, souvent petits et fabriqués en masse, demandent
              malgré tout des matières premières (plastique, papier, énergie). La majorité finit jetée sans avoir été utilisée,
              augmentant ainsi la production de déchets.
            </li>
            <li className="text-lg">
              Emballages excessifs : Ces échantillons sont souvent accompagnés de multiples couches d’emballages plastiques ou
              cartonnés, qui sont rarement recyclés correctement. Cela contribue à la pollution plastique, un enjeu
              environnemental majeur, et ne fait qu'alourdir l'empreinte écologique de ces pratiques.
            </li>
            <li className="text-lg">
              Transport et émissions de CO2 : L’acheminement des échantillons gratuits génère des émissions de CO2 liées à la
              logistique et aux livraisons. Quand ces envois ne sont pas désirés par les consommateurs, ils participent
              directement au gaspillage de ressources tout en augmentant l’impact carbone.
            </li>
            <li className="text-lg">
              Pratiques commerciales non responsables : En plus des enjeux environnementaux, la fourniture non sollicitée
              d’échantillons peut induire le consommateur en erreur, en lui faisant croire à un cadeau ou en l’incitant à acheter
              des produits dont il n’a pas réellement besoin. Ce type de marketing encourage la surconsommation, à l’opposé des
              principes de consommation raisonnée et durable.
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-4">
          <h2 className="fr-h4 !text-white">Pourquoi faire un signalement sur SignalConso ?</h2>
          <p className="text-lg">En signalant ces pratiques, vous participez activement à une économie plus responsable :</p>
          <ul className="ml-4">
            <li className="text-lg">
              Encourager les pratiques éthiques : En dénonçant les envois non sollicités d’échantillons, vous poussez les
              entreprises à revoir leurs stratégies commerciales pour s’adapter à des attentes plus respectueuses de
              l'environnement.
            </li>
            <li className="text-lg">
              Réduire l'impact environnemental : Les signalements permettent aux autorités de mieux contrôler et limiter ces
              pratiques, qui entraînent un gaspillage important de ressources.
            </li>
          </ul>
          <p className="text-lg">
            Nous avons tous un rôle à jouer dans la protection de l’environnement et dans la promotion d’une consommation
            responsable. Chaque geste compte, y compris le refus de pratiques commerciales nuisibles et peu éthiques.
          </p>
          <p className="text-lg">
            Signaler les envois non sollicités d’échantillons sur SignalConso est un moyen de lutter contre les excès de la
            surconsommation et d’encourager des comportements plus respectueux de notre planète.
          </p>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

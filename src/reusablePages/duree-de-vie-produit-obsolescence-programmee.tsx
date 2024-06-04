import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {bigReportButtonProps} from '@/components_simple/buttons/buttonsUtils'
import {PageComponentProps} from '@/core/metadatas'
import {ChildrenProps} from '@/utils/utils'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

const obsolescenceReportPage = 'https://signal.conso.gouv.fr/fr/obsolescence/faire-un-signalement'

export function obsolescencePage(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }

  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-12 flex items-center justify-center">
          <div className="max-w-4xl w-full flex flex-col items-start">
            <h1 className="flex flex-col mb-6 text-white">
              La durée de vie de votre appareil vous semble particulièrement courte ?
            </h1>
            <p className="text-2xl mb-0 font-bold">Il n'existe pas de pièces détachées pour le réparer ?</p>
            <p className="text-2xl  mb-4 font-bold">Son indice de durabilité n'était pas affiché lors de son achat ?</p>
            <p className="text-lg mb-4">
              Il s'agit peut-être d'un cas d'obsolescence programmée. Vous pouvez le signaler sur la plateforme SignalConso. Votre
              signalement sera envoyé aux agents de la répression des fraudes, ainsi qu'à l'entreprise concernée.
            </p>
            <Button
              className="border-blue-300 border border-solid mb-4"
              {...bigReportButtonProps}
              linkProps={{href: obsolescenceReportPage}}
            >
              Je signale un cas d'obsolescence programmée
            </Button>

            <p className="text-lg mb-0"></p>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple ">
        <div className="fr-container py-12">
          <h2 className="text-3xl !text-slate-900 text-normal mt-2 mb-8">
            Dans quels cas l'indice de réparabilité est obligatoire ?
          </h2>
          <div>
            <p className="mb-0 text-lg">
              La présence d'un <strong>indice de réparabilité</strong> est <strong> obligatoire</strong> sur les appareils
              suivants, qu'ils soient vendus en magasin ou sur Internet :
            </p>
            <ul className="list-disc ml-8 text-lg">
              <li>Les smartphones</li>
              <li>Les téléviseurs</li>
              <li>Les ordinateurs portables</li>
              <li>Les aspirateurs</li>
              <li>Les lave-linge</li>
              <li>Les lave-vaisselle</li>
              <li>Les nettoyeurs haute-pression (dits "Kärcher")</li>
              <li>Les tondeuses à gazon</li>
            </ul>
            <div className="">
              <p className="text-lg">
                S'il n'y a pas d'indice de réparabilité sur ces produits, vous pouvez faire un signalement.
              </p>
              <p className="text-lg">
                Si vous avez un doute sur la sincérité de cet indice et que vous pensez qu'il a pu être gonflé artificiellement
                par le fabricant, vous pouvez aussi faire un signalement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker py-6">
        <div className="fr-container">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/2 flex">
              <Case>
                <strong className="text-xl text-black">Comment reconnaître l'indice de réparabilité ?</strong>
                <p className="mt-4 text-lg">
                  Il s'agit d'un pictogramme de clé à molette, d'une note comprise entre 0 et 10 et d'une couleur en fonction du
                  degré de réparabilité. Le détail de la notation et le tableau de synthèse doivent également être mis à
                  disposition, de manière automatique pour les sites de vente en ligne et sur demande pour les magasins physiques.
                </p>
              </Case>
            </div>
            <div className="md:w-1/2 flex">
              <Case>
                <strong className="text-lg text-black">L'indice de durabilité remplacera l'indice de réparabilité</strong>
                <p className="mt-4 text-lg">
                  À compter de 2025 pour les téléviseurs et les lave-linge ménagers hublot et top puis pour les autres catégories
                  d'équipements électriques et électroniques dans les prochaines années.
                </p>
              </Case>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex">
          <div className="max-w-6xl w-full flex flex-col items-start">
            <h2 className="text-2xl font-bold mb-8 text-white">
              Vous pensiez rencontrer un problème de consommation mais il s'avère finalement que la pratique du professionnel que
              vous avez pointée n'est pas contraire à la réglementation ?
            </h2>
            <div className="flex flex-col">
              <p className="text-2xl mb-8">Votre signalement ne sera pour autant pas inutile !</p>
              <div className="flex gap-8 ">
                <p className="md:w-1/3 text-xl">
                  Il sert à <strong>interpeler le professionnel</strong> qui aura peut-être à cœur de faire évoluer sa pratique,
                  conforme certes, mais pas forcément très écologique.
                </p>
                <p className="md:w-1/3 text-xl">
                  Plus encore, votre signalement fait <strong>remonter une information</strong> qui peut ensuite motiver des
                  contrôles et orienter les enquêtes de la DGCCRF pour faire progresser la consommation durable.
                </p>
                <p className="md:w-1/3 text-xl">
                  Avec SignalConso, <strong>vous envoyez avant tout un signal !</strong> Ne sous-estimez pas les effets de votre
                  signalement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

function Case({children}: ChildrenProps) {
  return <div className=" bg-sclightpurple p-6 border border-gray-300 h-72">{children}</div>
}

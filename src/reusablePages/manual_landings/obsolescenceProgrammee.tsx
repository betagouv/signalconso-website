import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import imgReparabilite8_5 from '@/img/landings/indice_reparabilite_8_5.jpg'
import {getManualLpButtonProps} from '@/landings/manualLandingsUtils'
import Button from '@codegouvfr/react-dsfr/Button'
import Image from 'next/image'
import {notFound} from 'next/navigation'

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
            <p className="text-2xl  mb-4 font-bold">Son indice de réparabilité n'était pas affiché lors de son achat ?</p>
            <p className="text-lg mb-4">
              Il s'agit peut-être d'un cas d'obsolescence programmée. Vous pouvez le signaler sur la plateforme SignalConso. Votre
              signalement sera envoyé aux agents de la répression des fraudes, ainsi qu'à l'entreprise concernée.
            </p>
            <Button className="border-blue-300 border border-solid mb-4" {...getManualLpButtonProps(lang, 'AchatMagasin')}>
              Je signale un cas d'obsolescence programmée
            </Button>
          </div>
        </div>
      </div>
      <div className=" bg-sclightpurpledarker">
        <div className="fr-container py-4 flex flex-col md:flex-row md:items-center md:gap-4 ">
          <h2 className="fr-h4">Comment reconnaître l'indice de réparabilité ?</h2>
          <p className=" text-lg">
            Il s'agit d'un pictogramme de clé à molette, d'une note comprise entre 0 et 10 et d'une couleur en fonction du degré
            de réparabilité.
          </p>
          <div className="flex items-center justify-center w-full md:w-auto ">
            <div className="bg-white rounded-xl p-4 pb-2">
              <Image src={imgReparabilite8_5} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-sclightpurple">
        <div className="fr-container pt-4 pb-8">
          <div className="">
            <h2 className="fr-h4">Dans quels cas l'indice de réparabilité est obligatoire ?</h2>
            <div>
              <p className="text-lg">
                La présence d'un <strong>indice de réparabilité</strong> est <strong> obligatoire</strong> sur les appareils
                suivants, qu'ils soient vendus en magasin ou sur Internet :
              </p>
              <p className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-2 mb-0 text-lg">
                <span className="">Les smartphones</span>
                <span className="">Les téléviseurs</span>
                <span className="">Les ordinateurs portables</span>
                <span className="">Les aspirateurs</span>
                <span className="">Les lave-linge</span>
                <span className="">Les lave-vaisselle</span>
                <span className="">Les nettoyeurs haute-pression (karcher)</span>
                <span className="">Les tondeuses à gazon</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-sclightpurpledarker">
        <div className="fr-container py-4">
          <div className="flex flex-col items-start ">
            <h2 className="fr-h4">Comment cet indice est-il calculé ?</h2>
            <p className="text-lg mb-2">
              Il est calculé par l'entreprise elle-même, en suivant des grilles de notation imposées par l'administration.
            </p>
            <p className="text-lg mb-2">
              Le détail de la notation et le tableau de synthèse doivent vous être mis à disposition, de manière automatique pour
              les sites de vente en ligne et sur demande pour les magasins physiques.
            </p>
            <p className="text-lg mb-0">
              <strong>Si vous avez un doute sur la sincérité de cet indice</strong> et que vous pensez qu'il a pu être gonflé
              artificiellement par le fabricant, vous pouvez aussi faire un signalement.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container py-4">
          <div className="flex flex-col items-start ">
            <h2 className="fr-h4">A partir de 2025, l'indice de durabilité remplacera l'indice de réparabilité</h2>
            <p className="text-lg">
              À compter de 2025 pour les téléviseurs et les lave-linge ménagers, puis pour les autres catégories d'équipements
              électriques et électroniques dans les prochaines années.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-scblueinfo text-white">
        <div className="fr-container py-12 flex">
          <div className="">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-8 text-white ">
                Vous pensiez rencontrer un problème d'obscolescence programmée mais il s'avère finalement que la pratique du
                professionnel n'est pas contraire à la réglementation ?
              </h2>
              <p className="text-xl mb-8">Votre signalement ne sera pour autant pas inutile !</p>
            </div>
            <div className="flex flex-col">
              <div className="grid md:grid-cols-3 md:gap-8">
                <p className="text-lg">
                  Il sert à <strong>interpeler le professionnel</strong> qui aura peut-être à cœur de faire évoluer sa pratique,
                  conforme certes, mais pas forcément très écologique.
                </p>
                <p className="text-lg">
                  Plus encore, votre signalement fait <strong>remonter une information</strong> qui peut ensuite motiver des
                  contrôles et orienter les enquêtes de la DGCCRF pour faire progresser la consommation durable.
                </p>
                <p className="text-lg">
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

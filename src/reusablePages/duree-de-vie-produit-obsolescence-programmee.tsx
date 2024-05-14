import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {PageComponentProps} from '@/core/metadatas'
import Button from '@codegouvfr/react-dsfr/Button'
import {notFound} from 'next/navigation'

const signalConsoUrl = 'https://signal.conso.gouv.fr/'

export function obsolescencePage(props: PageComponentProps) {
  const lang = props.params.lang
  if (lang !== 'fr') {
    return notFound()
  }

  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black">
        <div className="fr-container py-12 flex items-center justify-center">
          <div className="max-w-4xl flex flex-col items-start">
            <h1 className="flex flex-col">
              <span className="mb-2 text-white">
                Obsolescence programmée : votre appareil a une durée de vie qui vous semble trop courte
              </span>
            </h1>
            <p className="text-xl text-center">
              Signalez un appareil dont la durée de vie vous semble trop courte et pourrait s’apparenter à de l’obsolescence
              programmée et contribuez ainsi à préserver notre environnement pour les générations futures.
            </p>
            <div className="flex justify-center w-full">
              {' '}
              {/* Wrapper for centering */}
              <Button className="mb-6 border-blue-300 border border-solid" linkProps={{href: signalConsoUrl}}>
                Faire un signalement
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurple">
        <div className="fr-container">
          <div className="pt-4 pb-6 flex flex-col md:flex-row items-start gap-0 md:gap-8">
            <h2 className="text-3xl !text-slate-900 text-normal md:w-1/3 mt-2">
              Dans quels cas peut-on parler de durée trop courte ou d’obsolescence programmée ?
            </h2>
            <div className="md:w-2/3">
              <p className="font-bold text-lg">
                Un produit durable, réparable, performant, évolutif et fiable risque moins d’être gaspillé qu’un produit dénué de
                tout ou partie de ces atouts.
              </p>
              <p className="text-lg">
                Depuis 2021, la présence d’un indice de réparabilité sur certaines catégories de produits est obligatoire :
                lave-linge, smartphone, ordinateur portable, télévision, lave-vaisselle…
              </p>
              <p className="text-lg">
                Il s’agit d’une note comprise entre 0 et 10 et d’une couleur en fonction du degré de réparabilité. Dès 2024,
                l’indice de réparabilité va progressivement se transformer en indice de durabilité, avec deux nouveaux critères :
                la fiabilité du produit et son évolutivité.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-sclightpurpledarker py-8">
        <div className="fr-container">
          <p className="text-lg text-center mb-0">
            Vous pensiez rencontrer un problème de consommation mais il s’avère finalement que la pratique du professionnel que
            vous avez pointée n’est pas contraire à la réglementation ? Votre signalement ne sera pour autant pas inutile ! Il
            sert à interpeler le professionnel qui aura peut-être à cœur de faire évoluer sa pratique conforme certes mais pas
            forcément très écologique. Plus encore, votre signalement fait remonter une information qui peut ensuite motiver des
            contrôles et orienter les enquêtes de la DGCCRF pour faire progresser la consommation durable.
          </p>
          <p className="text-lg text-center font-bold mb-0">
            Avec SignalConso, vous envoyez avant tout un signal ! Ne sous-estimez pas les effets de votre signalement.
          </p>
          <div className="flex justify-center">
            <Button className="mt-4 border-blue-300 border border-solid" linkProps={{href: signalConsoUrl}}>
              Je signale un problème
            </Button>
          </div>
        </div>
      </div>
    </FullWidthPageContainer>
  )
}

export default obsolescencePage

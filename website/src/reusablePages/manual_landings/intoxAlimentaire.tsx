import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {BlueBandWhySignalConso, LpColoredBand, getManualLpButtonProps} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'

export function IntoxAlimentairePage() {
  const lang = 'fr'
  return (
    <FullWidthPageContainer>
      <LpColoredBand className="bg-scblueinfo">
        <div className="py-12 text-white ">
          <div className="max-w-4xl mx-auto flex flex-col items-start mb-8">
            <h1 className="fr-h2 !text-white">
              Intoxication alimentaire : vous avez mangé dans un restaurant et vous êtes tombé malade ?
            </h1>
            <p className="text-lg ">
              Les pratiques du restaurant sont peut-être la cause : non-respect des mesures d'hygiène ou des températures,
              utilisation de matières contaminées, ...
            </p>
            <p className="font-bold text-xl">
              Pour éviter que cela se reproduise, faites un signalement sur la plateforme SignalConso !
            </p>
            <Button
              className="border-blue-300 border border-solid mb-4"
              {...getManualLpButtonProps(lang, 'IntoxicationAlimentaire')}
            >
              Je signale une intoxication alimentaire dans un restaurant
            </Button>
            <p className="text-lg">
              Votre signalement sera transmis à l'établissement concerné, ainsi qu'aux agents de la DGAL (Direction générale de
              l'alimentation) et de la DGCCRF (la répression des fraudes).
            </p>
          </div>
          <div className="">
            <div className="mx-auto border-white border-solid border rounded-xl text-gray-100 p-4">
              <div className=" mx-auto">
                <h3 className="fr-h5 !text-gray-200">Avant toute chose, quels sont les bons réflexes à avoir ?</h3>
                <ul>
                  <li className="text-lg">
                    Consultez rapidement un médecin afin de procéder au diagnostic et à votre prise en charge.
                  </li>
                  <li className="text-lg">Dans les cas les plus sévères, alertez le SAMU ou le Centre Antipoison.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LpColoredBand>
      <LpColoredBand className="bg-sclightpurpledarker">
        <div className="py-8">
          <h3 className="fr-h4">Après votre signalement, que se passe-t-il ensuite pour l'établissement ?</h3>{' '}
          <p className="text-lg mb-4">
            <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
            L'établissement pourra faire l'objet d'un contrôle de la part des services de la DGAL.
          </p>{' '}
          <p className="text-lg mb-4">
            <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
            En cas d'infraction aux règles d'hygiène constatée lors du contrôle, les sanctions pourront aller du simple
            avertissement à la fermeture de l'établissement.
          </p>
          <p className="text-lg mb-0">
            <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
            Les services de la DGAL peuvent vous recontacter pour avoir davantage d'éléments mais ce n'est pas systématique. Vous
            ne serez pas informé des suites du contrôle.
          </p>
        </div>
      </LpColoredBand>
      <BlueBandWhySignalConso
        {...{lang}}
        title="Pourquoi faire un signalement sur SignalConso lors d'un démarchage téléphonique abusif ?"
      />
    </FullWidthPageContainer>
  )
}

import {UserQuote} from '@/components_feature/LandingPage'
import {FullWidthPageContainer} from '@/components_simple/PageContainers'
import {BlueBandWhySignalConso, getManualLpButtonProps} from '@/landings/manualLandings/manualLandingsComponents'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'

const bloctel = 'https://www.bloctel.gouv.fr/'

export function DemarchageAbusifPage() {
  const lang = 'fr'
  return (
    <FullWidthPageContainer>
      <div className="bg-scblueinfo text-white border-t-[1px] border-0 border-solid border-black ">
        <div className="fr-container py-12 flex items-center justify-center">
          <div className="max-w-4xl flex flex-col items-start">
            <h1 className="text-white">Démarchage téléphonique abusif</h1>
            <p className="text-xl text-center mb-0">Vous avez reçu des appels commerciaux abusifs :</p>
            <ul className="text-xl ml-4  mb-6">
              <li className="font-bold">hors des heures et jours autorisés ?</li>
              <li>ou <strong>trop fréquents</strong> ?</li>
              <li>ou <strong>alors que vous n’aviez pas donné votre consentement</strong> ?</li>
              <li>ou <strong>alors que vous aviez retiré votre consentement</strong> ?</li>
            </ul>
            <p className="text-lg ">
              Faites un signalement sur la plateforme SignalConso. Votre signalement sera envoyé aux agents de la répression des
              fraudes, ainsi qu'à l'entreprise si vous pouvez l'identifier.
            </p>
            <Button className="border-blue-300 border border-solid" {...getManualLpButtonProps(lang, 'DemarchageAbusif')}>
              Je signale un démarchage téléphonique abusif
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-sclightpurpledarker ">
        <div className="fr-container ">
          <div className="py-6">
            <h2 className="text-3xl text-normal">Qu'est-ce qui est interdit exactement ?</h2>
            <div className="space-y-4 mb-6">
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Le démarchage téléphonique des consommateurs est autorisé{' '}
                <strong>uniquement de 10 heures à 13 heures et de 14 heures à 20 heures</strong>. Il est interdit le samedi, le
                dimanche et les jours fériés.
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit à un même professionnel de démarcher un même consommateur{' '}
                <strong>plus de quatre fois sur une période de trente jours.</strong>
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit si vous n’avez jamais consenti à recevoir des appels commerciaux.
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit de vous démarcher après que vous ayez retiré votre consentement
              </p>
              <p className="text-lg mb-0">
                <span className="ri-arrow-right-line mr-2 fr-icon--lg" />
                Il est interdit s'il concerne le <strong>Compte personnel de formation (CPF)</strong>.
              </p>
            </div>
            <p className="text-lg mb-6">Dans chacun de ces cas, vous pouvez faire un signalement.</p>
          </div>
        </div>
      </div>

      <BlueBandWhySignalConso
        {...{lang}}
        title="Pourquoi faire un signalement sur SignalConso lors d'un démarchage téléphonique abusif ?"
      />
    </FullWidthPageContainer>
  )
}

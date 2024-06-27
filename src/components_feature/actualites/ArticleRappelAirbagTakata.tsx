import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import Link from 'next/link'
import {ScAlert} from '@/components_simple/ScAlert'
import {androidAppUrl, iosAppUrl} from '@/components_simple/bigBanners/MobileAppPromoBanner'

const urlSsvm = 'https://www.ecologie.gouv.fr/service-surveillance-du-marche-des-vehicules-et-des-moteurs-ssmvm'

export function ArticleRappelAirbagTakata() {
  return (
    <>
      <p className="fr-h6 ">Comment savoir si vous êtes concerné ? Quelle est la marche à suivre ?</p>
      <p className="mb-10">
        Depuis mai 2024, en raison d'un défaut majeur dans les airbags, des millions de véhicules sont actuellement rappelés à
        travers le monde. Ces airbags, fabriqués par Takata, présentent un risque sérieux pour la sécurité des occupants.
      </p>
      <div className="mb-8">
        <div className="fr-accordions-group ">
          <Accordion label="Pourquoi ce rappel est-il important ?">
            <p className="mb-0">
              Les airbags défectueux peuvent éclater lors de leur déploiement, projetant des fragments métalliques dans
              l'habitacle. Cela peut entraîner des blessures graves, voire mortelles. Les véhicules concernés doivent être réparés
              au plus vite.
            </p>
          </Accordion>
          <Accordion label="Est-ce que je vais être prévenu automatiquement si mon véhicule est concerné ?">
            <p>
              Vous allez probablement recevoir un courrier postal. Lorsqu'une marque lance officiellement une campagne de rappels
              en France, elle envoie généralement un courrier recommandé pour informer le propriétaire, surtout si le véhicule est
              entretenu en concession.
            </p>
            <p className="mb-0">
              Mais ce n'est pas garanti, et il se peut que la marque n'ait pas votre bonne adresse, par exemple si vous avez
              déménagé.
            </p>
          </Accordion>
          <Accordion label="Comment savoir si mon véhicule est concerné ?">
            <p>
              Trouvez votre numéro d'identification du véhicule (VIN) : le VIN est un numéro unique de 17 caractères qui est écrit
              :
            </p>
            <ul>
              <li>sur votre carte grise à côté de la lettre E</li>
              <li>sur le tableau de bord côté conducteur</li>
              <li>sur votre carnet d'entretien/garantie</li>
              <li>ou sur la plaque constructeur sur le pare-brise</li>
            </ul>
            <p>
              Puis rendez vous sur le site web de votre constructeur automobile. Des marques comme Ford, Honda, Suzuki, Peugeot,
              Citroën, Renault, Jaguar, Tesla, etc., offrent des plateformes dédiées où vous pouvez entrer votre numéro VIN et
              savoir si vous êtes concernés par un rappel.
            </p>
            <p className="mb-0">
              Certains constructeurs fournissent des notifications via leurs applications officielles ou directement sur l'écran
              de bord de votre véhicule.
            </p>
          </Accordion>
          <Accordion label="Que faire si mon véhicule est concerné ?">
            <p className="mb-0">
              Contactez immédiatement un concessionnaire agréé pour planifier la réparation de votre véhicule. La réparation est
              gratuite et doit être effectuée rapidement. Certains constructeurs offrent des solutions de mobilité temporaire si
              votre voiture doit être immobilisée.
            </p>
          </Accordion>
          <Accordion label="Mon véhicule est concerné et je ne parviens pas à faire effectuer rapidement les réparations">
            <p className="mb-0">
              Vous pouvez faire un signalement au service de surveillance du marché des véhicules et des moteurs (SSMVM) en
              utilisant le lien suivant :<br />
              <Link href={urlSsvm} target="_blank">
                {urlSsvm}
              </Link>
            </p>
          </Accordion>
          <Accordion label="J'ai fait un signalement sur Signalconso, que va-t-il se passer ?">
            <p className="mb-0">
              Votre signalement sera transmis à l'entreprise pour qu'elle puisse vous répondre. Les agents de la répression des
              fraudes (DGCCRF) et le service de surveillance du marché des véhicules et des moteurs (SSMVM) en seront également
              destinataires.
            </p>
          </Accordion>
        </div>
      </div>
      <ScAlert type="info">
        Pour être informé de tous les rappels de produits sur votre téléphone, téléchargez dès maintenant la nouvelle version de
        l'application SignalConso sur{' '}
        <Link href={iosAppUrl} target="_blank">
          iOS
        </Link>{' '}
        et{' '}
        <Link href={androidAppUrl} target="_blank">
          Google Play
        </Link>
        .
      </ScAlert>
    </>
  )
}

'use client'

import Image from 'next/image'
import {useI18n} from '../../i18n/I18n'
import {AppLangs} from '../../i18n/localization/AppLangs'
import Link from 'next/link'

export function ArticleResilierContratsEnLigne() {
  const {m, currentLang} = useI18n()
  return (
    <div>
      <p>
        Fini les lettres recommandées avec accusé de réception pour mettre fin à son contrat d'assurance, d'abonnement à une
        plateforme de streaming, à un opérateur téléphonique ou à une salle de sport !!
      </p>
      <p>
        <span className="font-bold">
          Les contrats conclus ou pouvant être conclus en ligne, peuvent être résiliés en quelques clics, c'est à dire rapidement
          et en ligne
        </span>
        . Cette nouvelle disposition, prévue par la loi du 16 août 2022 portant mesure d'urgence pour la protection du pouvoir
        d'achat, facilite les démarches du consommateur qui souhaite choisir une offre plus intéressante ou renoncer à un service.
        Elle ne change pas les conditions de résiliation du contrat mais offre une nouvelle modalité de résiliation au
        consommateur.
      </p>
      <p>
        Comment ça marche ? Les sites Internet et applications mobiles devront comporter un bouton de résiliation facilement et
        directement accessible par leurs clients souhaitant résilier leur contrat.
      </p>
      <p>
        Le consommateur n'aura plus qu'à :
        <ul>
          <li>
            Cliquer sur ce bouton de résiliation sur le site Internet ou l'application mobile. Le professionnel pourra rappeler
            les informations sur les conditions de la résiliation du contrat (respect d'un délai de préavis, paiement d'une
            indemnité de résiliation ...)
          </li>
          <li>
            Indiquer son nom, ses coordonnées électroniques ou postales, la référence du contrat ou confirmer ces informations
            lorsqu'elles sont pré-enregistrées par le professionnel
          </li>
          <li>
            Pour les cas où les contrats sont résiliés de façon anticipée, indiquer le cas échéant le motif de résiliation et
            envoyer les pièces justificatives (par exemple les contrats d'accès à Internet peuvent être résiliées sans frais en
            cas de surendettement)
          </li>
          <li>Il sera alors redirigé vers une page récapitulative lui permettant de vérifier les informations fournies</li>
          <li>
            Il pourra alors valider pour finaliser sa démarche et notifier sa résiliation au professionnel en cliquant sur un
            bouton « notification de la résiliation »
          </li>
          <li>
            L'entreprise doit confirmer la réception de la décision de résiliation, puis informer le consommateur, dans un délai
            raisonnable, de la date et des effets de la résiliation.
          </li>
        </ul>
      </p>
      <p className="italic">
        Consulter{' '}
        <Link href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047314374" target="_blank">
          le décret d’application sur la résiliation des contrats par voie électronique
        </Link>
      </p>
      {/* this image is too large for mobile viewports, and unreadable if scaled down  */}
      {currentLang === AppLangs.fr && (
        <div className="hidden lg:flex justify-center ">
          <Image
            width={830}
            height={444}
            src={`/image/actualites/infographie-resiliation-contrats.jpg`}
            alt={m.articleAppMobile.banner}
          />
        </div>
      )}
    </div>
  )
}

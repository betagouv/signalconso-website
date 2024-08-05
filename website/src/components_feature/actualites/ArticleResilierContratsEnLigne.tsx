'use client'

import {buildHardcodedLinkLandingPageFr} from '../../core/pagesDefinitions'
import Image from 'next/image'
import Link from 'next/link'
import {ReactNode} from 'react'
import {useI18n} from '../../i18n/I18n'
import {AppLangs} from '../../i18n/localization/AppLangs'
import imgInfographieResiliation from '@/img/actualites/infographie-resiliation-contrats.jpg'

function LandingLink({path, children}: {path: string; children: ReactNode}) {
  const fullUrl = buildHardcodedLinkLandingPageFr(path)
  if (!fullUrl) {
    // it's not worth throwing an error
    console.warn(`Didn't find landing ${path}`)
    return children
  }
  return <Link href={fullUrl}>{children}</Link>
}

export function ArticleResilierContratsEnLigne() {
  const {m, currentLang} = useI18n()
  return (
    <div>
      <p>
        Oubliez les lettres recommandées avec accusé de réception pour mettre fin à votre{' '}
        <LandingLink path={'banque-assurance-mutuelle'}>contrat d'assurance</LandingLink>, d'abonnement à une{' '}
        <LandingLink path={'tel-internet-media'}>plateforme de streaming</LandingLink>, à un{' '}
        <LandingLink path={'tel-internet-media'}>opérateur téléphonique</LandingLink> ou à une{' '}
        <LandingLink path={'voyage-loisirs'}>salle de sport</LandingLink>, ou encore{' '}
        <LandingLink path={'eau-gaz-electricite'}>d'énergie</LandingLink> !
      </p>
      <p>
        <span className="font-bold">
          <LandingLink path={'achat-site'}>Tous ces contrats</LandingLink> que vous avez conclus ou que vous pourriez conclure en
          ligne peuvent être résiliés en deux temps trois mouvements, c'est-à-dire rapidement et en ligne
        </span>
        . Grâce à cette nouvelle disposition, qui a été mise en place par la loi du 16 août 2022 pour protéger votre pouvoir
        d'achat, vous allez pouvoir vous simplifier la vie si vous voulez changer pour une offre plus intéressante ou tout
        simplement renoncer à un service. Elle ne change pas les conditions de résiliation de votre contrat, mais elle vous donne
        une nouvelle option pour résilier.
      </p>
      <p>
        Mais comment ça marche concrètement ? Les sites web et les applis mobiles doivent maintenant présenter bien en évidence un
        bouton de résiliation pour que vous puissiez résilier votre contrat facilement.
      </p>
      <p>Le consommateur n'aura plus qu'à :</p>
      <ul>
        <li>
          Vous cliquez sur le bouton de résiliation sur le site web ou l'appli mobile. Le professionnel vous rappellera les
          détails concernant les conditions de résiliation (comme le préavis à respecter ou les frais éventuels).
        </li>
        <li>
          Vous donnez votre nom, vos coordonnées électroniques ou postales, la référence de votre contrat, ou vous confirmez ces
          informations si elles sont déjà pré-remplies par le professionnel.
        </li>
        <li>
          Si vous résiliez votre contrat avant son terme, vous expliquez pourquoi, et si besoin, vous envoyez les justificatifs
          (par exemple, pour les contrats d'accès à Internet, vous pouvez résilier gratuitement en cas de surendettement).
        </li>
        <li>
          Ensuite, vous arrivez sur une page récapitulative où vous pouvez vérifier toutes les informations que vous avez
          fournies.
        </li>
        <li>
          Une fois que tout est en ordre, vous validez pour finaliser la démarche et vous notifiez votre résiliation au
          professionnel en cliquant sur le bouton "notification de la résiliation".
        </li>
        <li>
          L'entreprise doit vous confirmer qu'elle a bien reçu votre demande de résiliation, puis elle doit vous informer dans un
          délai raisonnable de la date à laquelle votre résiliation prendra effet.
        </li>
      </ul>
      <p className="italic">
        Consulter{' '}
        <Link href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000047314374" target="_blank">
          le décret d’application sur la résiliation des contrats par voie électronique
        </Link>
      </p>
      {currentLang === AppLangs.fr && (
        // this image is too large for mobile viewports, and unreadable if scaled down
        <div className="hidden lg:flex justify-center">
          <Image src={imgInfographieResiliation} alt={m.articleAppMobile.banner} />
        </div>
      )}
    </div>
  )
}

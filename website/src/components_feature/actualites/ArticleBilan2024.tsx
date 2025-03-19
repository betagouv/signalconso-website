import imgAgentDGCCRF from '@/img/actualites/agentDGCCRF.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleBilan2024() {
  return (
    <div className="sc-article">
      <Image
        src={imgAgentDGCCRF}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p className="mt-4">
        Chaque année, la Direction générale de la concurrence, de la consommation et de la répression des fraudes (DGCCRF) mène de
        nombreuses actions pour protéger les consommateurs et garantir un marché plus juste. En 2024, ses efforts ont permis
        d’identifier et de sanctionner des pratiques frauduleuses, d’améliorer la sécurité des produits et d’assurer une
        concurrence loyale entre les entreprises.
      </p>
      <h2 className="fr-h2">
        <strong>Des contrôles renforcés pour une meilleure protection</strong>
      </h2>
      <p>
        En 2024, la DGCCRF a réalisé plus de <strong>91 000 visites de contrôle</strong> dans des établissements et sites
        internet. Parmi les infractions constatées :
      </p>
      <ul>
        <li>
          <strong>Pratiques commerciales trompeuses</strong> : près de <strong>960 cas signalés</strong> aux tribunaux.
        </li>
        <li>
          <strong>Non-respect des règles d’étiquetage</strong> : plus de <strong>600 infractions relevées</strong> sur l’origine
          des produits et la traçabilité alimentaire.
        </li>
        <li>
          <strong>Sécurité des produits</strong> : <strong>6 658 produits testés en laboratoire</strong>, dont de nombreux
          équipements électriques et alimentaires.
        </li>
      </ul>
      <p>
        Ces contrôles ont conduit à <strong>2 356 amendes administratives</strong>, pour un montant total de{' '}
        <strong>92,9 millions d’euros</strong>.
      </p>
      <h2 className="fr-h2">
        <strong>Des actions ciblées sur les problèmes du quotidien</strong>
      </h2>
      <p>
        Grâce aux signalements des consommateurs via <strong>SignalConso</strong>, la DGCCRF a pu agir sur les secteurs les plus
        problématiques :
      </p>
      <ul>
        <li>
          <strong>Le démarchage téléphonique abusif</strong> : plus de <strong>6 200 établissements contrôlés</strong>, avec des
          amendes sévères pour les entreprises ne respectant pas la loi.
        </li>
        <li>
          <strong>Les fraudes dans le secteur automobile</strong> : <strong>1 561 garages inspectés</strong>, révélant des
          irrégularités dans près de 75 % des cas.
        </li>
        <li>
          <strong>Les arnaques aux énergies renouvelables</strong> : sanctions infligées à plusieurs sociétés pratiquant des
          ventes trompeuses de panneaux solaires.
        </li>
      </ul>
      <h2 className="fr-h2">
        <strong>Informer et accompagner les consommateurs</strong>
      </h2>
      <p>
        En plus des contrôles et sanctions, la DGCCRF a répondu à <strong>45 278 appels</strong> et{' '}
        <strong>27 468 courriers</strong> via son service <strong>RéponseConso</strong>, et publié de nombreux guides pour mieux
        informer le public sur leurs droits.
      </p>
      <h2 className="fr-h2">
        <strong>Perspectives 2025</strong>
      </h2>
      <p>
        L’année 2025 s’annonce sous le signe du renforcement des contrôles et de la coopération avec les autorités européennes.
        Parmi les priorités :
      </p>
      <ul>
        <li>
          Un focus sur les droits des consommateurs dans le secteur de la <strong>santé</strong>.
        </li>
        <li>
          L’application stricte des nouvelles règles sur les <strong>contrats d’électricité et de gaz</strong>.
        </li>
        <li>
          La lutte contre le <strong>greenwashing</strong> et l’amélioration de l’affichage environnemental des produits.
        </li>
      </ul>
      <p>
        <strong>Vous êtes témoin d’une fraude ou d’une pratique commerciale douteuse ? Signalez-la sur</strong>{' '}
        <Link href="https://signal.conso.gouv.fr/" target="_blank" rel="noopener">
          <strong>SignalConso</strong>
        </Link>
        <strong>!</strong>
      </p>
    </div>
  )
}

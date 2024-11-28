import Image from 'next/image'
import imgAlerte from '@/img/actualites/alerte.png'
import Link from 'next/link'

export function ArticleLanceurAlerte() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgAlerte} width={285} height={215} alt="" />
        </div>
        <p>
          Savez-vous que vous pouvez contribuer directement à la protection des consommateurs en devenant{' '}
          <strong>lanceur d'alerte</strong> ? Ce statut permet à toute personne, salariée ou non, de signaler des{' '}
          <strong>infractions graves</strong> ou des <strong>risques</strong> qui menacent l’intérêt général, notamment dans le
          domaine de la consommation.
        </p>
      </div>

      <h2 className="text-2xl">Qu’est-ce qu’un lanceur d’alerte ?</h2>
      <p>
        Un lanceur d’alerte est une personne qui révèle ou signale, de manière <strong>désintéressée</strong> et en toute{' '}
        <strong>bonne foi</strong>, des <strong>faits illégaux ou dangereux</strong> qu’elle observe dans le cadre de ses{' '}
        <strong>activités professionnelles</strong>. Ce dispositif est indispensable pour faire face aux pratiques frauduleuses ou
        contraires à la loi qui peuvent mettre en danger les droits des consommateurs ou leur sécurité.
      </p>

      <h2 className="text-2xl">Comment ça fonctionne ?</h2>
      <p>
        En complément de <Link href="https://signal.conso.gouv.fr/">SignalConso</Link>, qui permet à tout consommateur de signaler
        des problèmes quotidiens (produits non conformes, arnaques commerciales, etc.), le{' '}
        <strong>dispositif de lanceur d’alerte</strong> est destiné aux personnes qui souhaitent dénoncer des infractions graves
        susceptibles de constituer <strong>un délit, un crime, une menace ou un préjudice pour l'intérêt général</strong>. Ces
        signalements doivent être faits de bonne foi et basés sur des informations obtenues dans un cadre professionnel ou
        personnel.
      </p>
      <p>Les domaines concernés par les signalements à la DGCCRF sont :</p>
      <ul className="mb-4">
        <li>
          Les <strong>pratiques anticoncurrentielles</strong>, notamment les ententes et abus de position dominante dans les
          marchés publics.
        </li>
        <li>
          La <strong>sécurité</strong> et la <strong>conformité</strong> des produits et services.
        </li>
        <li>
          La <strong>protection économique des consommateurs.</strong>
        </li>
      </ul>

      <p>
        Ce dispositif protège les lanceurs d'alerte, notamment grâce à la <strong>confidentialité</strong> de leur identité et à
        la <strong>protection contre les représailles</strong>. Vous pouvez ainsi signaler les faits en toute sécurité, que vous
        soyez <strong>salarié</strong> d’une entreprise ou simple <strong>témoin</strong> d’un dysfonctionnement.
      </p>

      <h2 className="text-2xl">Qui peut bénéficier du statut de Lanceur d'Alerte ?</h2>

      <p>
        Vous pouvez prétendre à ce statut si vous remplissez les <strong>conditions</strong> suivantes :
      </p>

      <ul className="mb-4">
        <li>
          Vous êtes une <strong>personne physique.</strong>
        </li>
        <li>
          Vous avez signalé un fait <strong>sans contrepartie financière</strong> directe.
        </li>
        <li>
          Vous avez des motifs raisonnables de croire que les faits sont <strong>véridiques.</strong>
        </li>
        <li>
          Le signalement porte sur des <strong>faits graves</strong>, tels qu’une infraction à la loi ou un préjudice pour
          l’intérêt général.
        </li>
      </ul>

      <p>
        ⚠️ <strong>Attention :</strong> Dénoncer des faits inexactes est punissable par la loi.
      </p>

      <h2 className="text-2xl">Quels sont vos Droits et Protections ?</h2>

      <p>En tant que lanceur d’alerte, vous bénéficiez de plusieurs protections, dont :</p>

      <ul className="mb-4">
        <li>
          La <strong>confidentialité</strong> de votre identité.
        </li>
        <li>
          La <strong>protection contre les représailles</strong> (licenciement, rétrogradation, harcèlement, etc.).
        </li>
        <li>
          La <strong>limitation de responsabilité pénale et civile</strong> dans le cadre du signalement.
        </li>
      </ul>

      <h2 className="text-2xl">Que se passe-t-il après votre signalement ?</h2>

      <p>
        La DGCCRF accuse réception de votre signalement sous <strong>7 jours ouvrés</strong> et évalue s’il relève de son domaine
        de compétence. Si le signalement est jugé recevable, un service d’enquête sera saisi. Vous serez informé des suites dans
        un délai de <strong>trois mois.</strong>
      </p>

      <h2 className="text-2xl">Pourquoi c’est important ?</h2>

      <p>
        Les signalements effectués par des lanceurs d’alerte sont cruciaux pour révéler des pratiques cachées qui peuvent affecter
        la qualité des produits et services, et menacer la sécurité ou les droits des consommateurs. Grâce à ces alertes, la
        DGCCRF peut intervenir plus efficacement pour faire respecter la loi et assurer la protection des citoyens.
      </p>
      <p>
        👉 Pour en savoir plus sur vos droits et les démarches pour devenir lanceur d'alerte rendez vous sur la page officielle de
        la DGCCRF{' '}
        <Link
          href="https://www.economie.gouv.fr/dgccrf/les-demarches-et-les-services/vous-etes-un-lanceur-dalerte"
          target="_blank"
        >
          Vous êtes un lanceur d'alerte
        </Link>{' '}
        ou sur le site du{' '}
        <Link href="https://www.defenseurdesdroits.fr/orienter-et-proteger-les-lanceurs-dalerte-180" target="_blank">
          Défenseur des droits
        </Link>
        , en charge de coordonner l’action des autorités externes en matière de signalement de lanceurs d’alerte.
      </p>
    </div>
  )
}

import imgCadeau from '@/img/actualites/cadeau.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleCoffretsCadeaux() {
  return (
    <div className="sc-article">
      <Image
        src={imgCadeau}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>Les coffrets-cadeaux sont souvent présentés comme une solution clé en main pour offrir des expériences variées.</p>
      <p>
        Cependant, vous n’êtes pas à l’abri de certaines déconvenues : prestations non conformes, difficultés à réserver, service
        indisponible, etc. En tant que consommateur, il est important de connaître vos droits pour savoir réagir face à ces
        situations.
      </p>
      <h2 className="fr-h2">
        <strong>Les obligations des émetteurs de coffrets cadeaux</strong>
      </h2>
      <p>
        Les coffrets-cadeaux incluant des prestations de voyage ou de séjour sont soumis aux dispositions du Code du tourisme. Les
        émetteurs de ces coffrets sont par conséquent soumis à plusieurs obligations :
      </p>
      <ul>
        <li>
          <p>
            <strong>Immatriculation obligatoire</strong> : Ils doivent être enregistrés au registre des opérateurs de voyages et
            de séjours.
          </p>
        </li>
        <li>
          <p>
            <strong>Garantie financière et assurance</strong> : Ils sont tenus d’avoir une garantie financière et une assurance
            couvrant leur responsabilité civile professionnelle.
          </p>
        </li>
        <li>
          <p>
            <strong>Responsabilité pleine et entière</strong> : Ils sont responsables de la bonne exécution des services prévus.
            Si une prestation est mal exécutée ou annulée, le consommateur peut demander réparation.
          </p>
        </li>
      </ul>
      <p>
        Par ailleurs, si les services délivrés présentent des écarts importants avec ceux décrits dans le coffret, cela peut être
        qualifié de <strong>pratique commerciale trompeuse.</strong>
      </p>
      <h2 className="fr-h2">
        <strong>Les bons réflexes pour éviter les mauvaises surprises</strong>
      </h2>
      <ul>
        <li>
          <p>
            <strong>Lisez attentivement les conditions générales</strong> : Informez-vous sur les modalités de réservation, la
            durée de validité et les éventuelles restrictions.
          </p>
        </li>
        <li>
          <p>
            <strong>Renseignez-vous sur les prestataires</strong> : Vérifiez les avis et la fiabilité des partenaires inclus dans
            le coffret.
          </p>
        </li>
        <li>
          <p>
            <strong>Choisissez des marques reconnues</strong> : Privilégiez les émetteurs bien établis.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">
        <strong>Que faire en cas de litige ?</strong>
      </h2>
      <h3 className="fr-h4">
        <strong>Contactez le service client</strong>
      </h3>
      <p>
        Dès qu’un problème survient, contactez le service client. Expliquez la situation en détail et conservez une trace de vos
        échanges (emails, captures d’écran, lettres).
      </p>
      <h3 className="fr-h4">
        <strong>Refusez les propositions non satisfaisantes</strong>
      </h3>
      <p>
        En cas d’annulation ou de modification de la prestation, sachez que vous n’êtes pas obligé d’accepter un remplacement.
        Vous pouvez exiger un remboursement intégral, notamment si le coffret inclut des prestations touristiques.
      </p>
      <h3 className="fr-h4">
        <strong>Faites un signalement</strong>
      </h3>
      <p>
        En cas d’échec des démarches amiables, rendez-vous sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          SignalConso
        </Link>
        . Notre plateforme permet de signaler des pratiques commerciales abusives et les manquements afin d’inciter les
        entreprises à respecter leurs obligations.
      </p>
      <p>
        Alors pour profiter des fêtes de fin d’année sans stress, ayez le réflexe{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          Signal Conso
        </Link>
        .
      </p>
    </div>
  )
}

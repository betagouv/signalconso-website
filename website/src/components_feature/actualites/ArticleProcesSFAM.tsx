import Image from 'next/image'
import imgTrial from '@/img/actualites/trial.png'
import Link from 'next/link'

export function ArticleProcesSFAM() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgTrial} width={306} height={204} alt="" />
        </div>
        <p>
          L'affaire SFAM a provoqué un véritable séisme dans le secteur des assurances. De nombreux consommateurs ont dénoncé des
          pratiques commerciales trompeuses, pointant du doigt des prélèvements non autorisés et des refus de remboursement. Ce
          procès aboutissement de plusieurs années d’abus, met en lumière l’importance de la vigilance des consommateurs et
          l’impact des plateformes de signalement pour faire respecter leurs droits.
        </p>
      </div>

      <h2 className="text-2xl">Un modèle de vente agressif et trompeur</h2>
      <p>
        Dirigée par <strong>Sadri Fegaier</strong>, la SFAM s’est rapidement imposée dans le secteur des assurances en s’associant
        à de grandes enseignes pour proposer des assurances lors de l'achat de produits électroniques. Cependant, de nombreux
        clients ont rapidement constaté des <strong>prélèvements non autorisés</strong> et une{' '}
        <strong>souscription automatique à des services d'assurance ou de fidélité</strong> sans leur consentement explicite.
      </p>
      <p>
        Les demandes de remboursement, faites par téléphone, étaient systématiquement ignorées. Les téléconseillers étaient formés
        pour compliquer les résiliations et retarder les remboursements. Lorsqu’un consommateur souhaitait résilier son contrat,
        le premier appel n’avait souvent aucun effet réel : les prélèvements continuaient et la demande de résiliation n'était
        prise en compte qu'après un second appel.
      </p>
      <p>
        Entre <strong>2014 et 2020</strong>, plus de <strong>743 000 demandes de remboursement</strong> ont été enregistrées, et à
        la fin de l’année 2023, SFAM devait près de <strong>22 millions d’euros</strong> à ses clients lésés. Ces pratiques
        trompeuses ont engendré une vague de mécontentement, avec <strong>plus de 1 660 victimes</strong> de prélèvements abusifs
        parties civiles lors du procès.
      </p>

      <h2 className="text-2xl">Des sanctions judiciaires à la hauteur des préjudices</h2>
      <p>
        Le 23 septembre 2024, le tribunal correctionnel de Paris a ouvert le procès de SFAM et de son PDG Sadri Fegaier pour{' '}
        <strong>pratiques commerciales trompeuses</strong>. La <strong>peine maximale</strong> a été requise à l'encontre de
        Fegaier, avec une demande de <strong>18 mois de prison ferme</strong> et des amendes importantes pour réparer les torts
        causés aux clients lésés.
      </p>

      <h2 className="text-2xl">SignalConso : un levier pour les droits des consommateurs</h2>

      <p>
        Les consommateurs ont joué un rôle crucial dans l’identification des pratiques abusives de SFAM. La plateforme a notamment
        permis de centraliser les plaintes.
      </p>
      <p>
        Si vous avez été victime de prélèvements abusifs ou d'autres pratiques trompeuses, il est important de{' '}
        <Link href="https://signal.conso.gouv.fr/fr">signaler votre expérience</Link> sur SignalConso. Cette démarche permet de
        faire entendre votre voix, d'aider d'autres consommateurs et de pousser les entreprises à respecter les règles.
      </p>

      <h2 className="text-2xl">Liens utiles 👉</h2>
      <ul>
        <li>
          <Link href="https://signal.conso.gouv.fr/fr/comment-ca-marche">Comment ça marche ?</Link>
        </li>
        <li>
          <Link href="https://aide.signal.conso.gouv.fr/fr/">Aide SignalConso</Link>
        </li>
      </ul>
    </div>
  )
}

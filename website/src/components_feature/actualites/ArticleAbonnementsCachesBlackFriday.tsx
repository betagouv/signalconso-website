import imgBlackFriday from '@/img/actualites/aboCaches.png'
import Image from "next/image";

export function ArticleAbonnementsCachesBlackFriday() {
  return (
    <div className="sc-article">
      <h2>
        <strong>Attention aux abonnements cachés pendant le Black Friday !</strong>
      </h2>


      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <Image src={imgBlackFriday} width="800" alt="Attention aux abonnements cachés"/>
      </div>

      <p>
        Pendant le Black Friday, certains sites peuvent proposer des “offres d’essai gratuit” et autres promotions
        alléchantes pour vous abonner à un service sans que vous en ayez conscience. Ces abonnements cachés sont souvent
        dissimulés derrière une offre gratuite ou une petite case à cocher, avec l’espoir que vous ne remarquerez pas
        les frais mensuels. Voici comment les repérer, éviter les pièges et faire valoir vos droits.
      </p>

      <h2>La tactique des abonnements cachés</h2>
      <p>Pendant le Black Friday, les sites sont nombreux à ajouter :</p>
      <ul>
        <li>Des essais gratuits pour une durée limitée, avec inscription automatique à la fin de la période d’essai.
        </li>
        <li>
          Des abonnements liés à un produit : assurances, extensions de garantie ou programmes VIP ajoutés lors de
          l’achat d’un produit.
        </li>
        <li>
          Des conditions générales ou des petits caractères, où l’abonnement est mentionné mais de manière peu visible.
        </li>
      </ul>

      <h2>Vos droits en matière d’essais gratuits</h2>
      <p>En France, les professionnels doivent vous informer clairement si une offre gratuite est associée à un
        abonnement payant. Voici ce que la loi prévoit :</p>
      <ul>
        <li>
          <strong>Information préalable obligatoire</strong> : Les conditions d’annulation et les frais d’abonnement
          doivent être clairement visibles avant votre inscription.
        </li>
        <li>
          <strong>Option de désabonnement facile</strong> : L’entreprise doit proposer une procédure de désabonnement
          rapide et accessible. Les démarches longues et complexes sont interdites par le Code de la consommation.
        </li>
        <li>
          <strong>Délai de rétractation</strong> : Si l’abonnement a été souscrit en ligne, vous disposez d’un délai de
          rétractation de 14 jours pour annuler.
        </li>
      </ul>

      <h2>Repérer les abonnements cachés avant de valider</h2>
      <p>Pour éviter la mauvaise surprise d’un abonnement non désiré :</p>
      <ul>
        <li>
          <strong>Vérifiez les petits caractères</strong> : Avant de confirmer un essai gratuit, lisez bien les
          conditions d’annulation et assurez-vous de savoir quand l’essai prendra fin.
        </li>
        <li>
          <strong>Soyez attentif aux cases précochées</strong> : Si une case est précochée, il est probable qu’elle
          engage une option payante. Décochez tout ce qui ne vous semble pas nécessaire.
        </li>
        <li>
          <strong>Cherchez les frais d’abonnement dans la description de l’offre</strong> : Même si l’essai est gratuit,
          les frais mensuels à venir doivent être mentionnés. Un prix absent ou flou doit vous alerter.
        </li>
      </ul>

      <h2>Que faire si vous êtes déjà engagé ?</h2>
      <p>Si vous découvrez après coup que vous êtes engagé dans un abonnement, voici vos recours :</p>
      <ul>
        <li>
          <strong>Annulez immédiatement</strong> : Connectez-vous à votre compte et résiliez l’abonnement. La plupart
          des sites permettent une annulation en ligne, mais si ce n’est pas le cas, contactez le service client.
        </li>
        <li>
          <strong>Demandez un remboursement</strong> : Si les frais d’abonnement sont récents et que vous n’avez pas
          bénéficié du service, expliquez la situation au SAV pour obtenir un remboursement.
        </li>
      </ul>

      <h2>Récapitulatif anti-galère pour repérer et éviter les abonnements non désirés pendant le Black Friday</h2>
      <ul>
        <li>Vérifiez toujours les conditions des essais gratuits.</li>
        <li>Décochez toutes les options non essentielles.</li>
        <li>Gardez une trace des abonnements et des dates de renouvellement.</li>
        <li>Annulez dès les premiers prélèvements suspects et demandez un remboursement.</li>
      </ul>

      <p>
        En prenant le temps de lire les conditions et en restant vigilant, vous éviterez les pièges des abonnements
        cachés pendant le Black Friday. Si malgré tout vous êtes engagé contre votre gré, faites un signalement sur
        Signal Conso !
      </p>

      <p>
        Pour en savoir plus rendez-vous sur{' '}
        <a
          href="https://signal.conso.gouv.fr/fr/black-friday-abonnement-frais-caches"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://signal.conso.gouv.fr/fr/black-friday-abonnement-frais-caches
        </a>
      </p>

      <p>En cas de problème, pensez à Signal Conso pour signaler les abus et défendre vos droits de consommateur !</p>
    </div>
  )
}
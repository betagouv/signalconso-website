import imgLivraisonColis from '@/img/actualites/livraisonColis.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleLivraisonColis() {
  return (
    <div className="sc-article">
      <Image
        src={imgLivraisonColis}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        En 2023, Signal Conso a reçu plus de 24 000 signalements concernant la livraison de petits colis à la suite d’un achat sur
        internet ou en magasin (colis perdus ou abimés, dépôts dans un point relais colis non prévu ou éloigné de l’adresse
        initiale de livraison, délais non respectés, refus de livrer…)
      </p>
      <p>
        Partant de ce constat, la DGCCRF a mené l’enquête auprès des acteurs de ce secteur : vendeurs professionnels,
        transporteurs, opérateurs de réseau de point relais (ORPR) et point relais.
      </p>
      <p>
        Les agents ont relevé, dans les conditions générales de vente, des clauses contraires au droit de la consommation et
        préjudiciables aux consommateurs ainsi que des clauses susceptibles de constituer un déséquilibre significatif dans les
        contrats entre opérateurs, points-relais et transporteurs.
      </p>
      <h2 className="fr-h2">Ce qu’il faut retenir de ces contrôles</h2>
      <p>
        Des déséquilibres contractuels importants ont été identifiés, notamment :<br />
        1️⃣ <strong>Transfert de responsabilité vers le transporteur</strong> : Le vendeur, légalement responsable de la bonne
        exécution du contrat, ne peut déléguer cette obligation au transporteur. Pourtant, plusieurs vendeurs ont tenté d’imposer
        cette charge aux consommateurs en cas de problème de livraison.
      </p>
      <p>
        2️⃣ <strong>Clauses abusives chez les opérateurs de réseau de points relais (ORPR)</strong> :
      </p>
      <ul>
        <li>
          <strong>Déséquilibre des conditions</strong> : Certaines clauses favorisent l’ORPR au détriment des vendeurs, des
          transporteurs ou des points relais.
        </li>
        <li>
          <strong>Exclusivité injustifiée</strong> : Des commerçants sont contraints de ne pas travailler avec des concurrents,
          même après la fin du contrat.
        </li>
        <li>
          <strong>Rémunération insuffisante</strong> : Les points relais ne sont pas payés pour des colis non retirés, alors que
          l’ORPR facture ces mêmes colis aux vendeurs.
        </li>
      </ul>
      <p>
        3️⃣ <strong>Surcharge carburant unilatérale</strong> : Certains vendeurs supportent seuls les hausses de prix du carburant,
        sans bénéficier des baisses éventuelles.
      </p>
      <p>
        4️⃣ <strong>Systèmes de pénalités inéquitables</strong> : Les transporteurs subissent des pénalités automatiques en cas de
        réclamations de client, parfois avec des conséquences sur leurs contrats.
      </p>
      <h2 className="fr-h2">Les actions de la DGCCRF</h2>
      <p>Les manquements relevés ont conduit à :</p>
      <ul>
        <li>
          <strong>6 avertissements</strong> : Pour pratiques non conformes au droit de rétractation, absence d’adhésion à un
          médiateur de la consommation,et anomalies dans le remboursement.
        </li>
        <li>
          <strong>7 injonctions</strong> : Concernant des clauses abusives, des fausses allégations, et des défauts d’informations
          légales ou précontractuelles.
        </li>
        <li>
          <strong>2 procès-verbaux administratifs</strong> : Pour l’utilisation de numéros surtaxés dans les services clients et
          pour le transfert abusif de responsabilité vers le transporteur.
        </li>
      </ul>
      <h2 className="fr-h2">Un impact direct sur les consommateurs</h2>
      <p>
        Ces pratiques affectent la qualité et la fiabilité des services de livraison. On constate notamment des retards fréquents
        et des colis abîmés ou non livrés accompagnés de difficulté pour les consommateurs d’obtenir un dédommagement en cas de
        problème.
      </p>
      <p>
        Lors d’une commande de colis, soyez vigilant et vérifiez que le contrat indique clairement la date ou le délai de
        livraison, que le numéro de téléphone du service après-vente ou du service-client n’est pas surtaxé et que le médiateur de
        la consommation est mentionné.
      </p>
      <p>
        👉 Pour en savoir plus, rendez-vous sur{' '}
        <Link
          href="https://www.economie.gouv.fr/dgccrf/laction-de-la-dgccrf/les-enquetes/livraison-des-petits-colis-desequilibres-dans-les-contrats"
          target="_blank"
          rel="noopener"
        >
          les résultats de l’enquête
        </Link>
      </p>
      <p>
        👉Vous avez rencontré des problèmes avec la livraison de petits colis ? Faites un signalement sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          SignalConso
        </Link>{' '}
        ! Votre participation aide à identifier et corriger ces déséquilibres.
      </p>
    </div>
  )
}

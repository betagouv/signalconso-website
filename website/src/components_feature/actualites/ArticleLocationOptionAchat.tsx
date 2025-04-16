import imgHandshake from '@/img/actualites/handshake.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleLocationOptionAchat() {
  return (
    <div className="sc-article">
      <Image
        src={imgHandshake}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Très prisée des ménages pour acquérir une voiture, un téléphone ou de l’électroménager, la location avec option d’achat
        (LOA), aussi appelée leasing, fait l’objet d’une vigilance accrue. Une récente enquête de la DGCCRF met en lumière des
        pratiques préoccupantes concernant l’information des consommateurs et la conformité des contrats.
      </p>
      <h2 className="fr-h2">La LOA : comment ça marche ?</h2>
      <p>
        La location avec option d’achat permet à un particulier de louer un bien pendant une période définie, avec la possibilité
        de l’acheter à la fin du contrat. Le bien reste la propriété d’une banque ou d’un établissement de crédit jusqu’au rachat
        éventuel.
      </p>
      <p>Ce mécanisme hybride associe donc :</p>
      <ul>
        <li>
          <p>Une location : le consommateur paie des mensualités pour l’usage du bien.</p>
        </li>
        <li>
          <p>Un crédit : activé si le consommateur décide d’acheter le bien en fin de contrat.</p>
        </li>
      </ul>
      <h2 className="fr-h2">50 % d’anomalies détectées lors des contrôles</h2>
      <p>
        Entre avril 2023 et juin 2024, la DGCCRF a contrôlé 101 établissements (banques, sociétés de crédit et intermédiaires) sur
        :
      </p>
      <ul>
        <li>
          <p>la vérification de la conformité des supports publicitaires destinés à promouvoir des opérations de LOA</p>
        </li>
        <li>
          <p>la conformité et la loyauté des informations transmises aux consommateurs avant et pendant le contrat.</p>
        </li>
      </ul>
      <p>👉 Résultat : 50 % d’anomalies constatées.</p>
      <h2 className="fr-h2">Les principales infractions</h2>
      <ul>
        <li>
          <p>
            Mentions légales absentes dans les publicités : absence de l’avertissement « Un crédit vous engage et doit être
            remboursé ».
          </p>
        </li>
        <li>
          <p>Informations incomplètes sur le coût total, la durée et les mensualités dans les offres.</p>
        </li>
        <li>
          <p>Clauses abusives dans certains contrats :</p>
          <ul>
            <li>Facturation abusive en cas de sinistre total.</li>
            <li>Restriction du droit de rétractation via un bordereau imposé.</li>
            <li>Frais excessifs au retour du véhicule, assimilables à des frais de remise à neuf.</li>
          </ul>
        </li>
        <li>
          <p>Rémunération des vendeurs selon le type de crédit octroyé.</p>
        </li>
      </ul>
      <h2 className="fr-h2">Sanctions prononcées par la DGCCRF</h2>
      <p>Face à ces pratiques, la DGCCRF a prononcé 22 avertissements et 15 injonctions de mise en conformité.</p>
      <h2 className="fr-h2">LOA vs LLD : un changement de tendance ?</h2>
      <p>
        Si la LOA reste prisée pour les véhicules neufs, notamment électriques, les professionnels semblent se tourner de plus en
        plus vers la location longue durée (LLD), moins encadrée juridiquement.
      </p>
      <h2 className="fr-h2">Ce qu’il faut retenir</h2>
      <p>📑 Lisez attentivement votre contrat et repérez les clauses abusives.</p>
      <p>📢 Vérifiez les mentions légales dans les publicités.</p>
      <p>⚖️ Gardez à l’esprit que vous disposez de droits, notamment le droit de rétractation sans conditions abusives.</p>
      <p>
        💡 Signalez toute anomalie sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          SignalConso
        </Link>
        .
      </p>
    </div>
  )
}

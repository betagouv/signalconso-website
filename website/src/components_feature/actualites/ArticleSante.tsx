import imgOpticien from '@/img/actualites/opticien.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleSante() {
  return (
    <div className="sc-article">
      <Image
        src={imgOpticien}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Destiné à garantir un accès aux soins sans reste à charge, le <strong>dispositif « 100 % santé »</strong> permet à tous
        les assurés bénéficiant d’une complémentaire santé responsable ou solidaire d’obtenir des lunettes, des prothèses
        auditives ou des soins dentaires entièrement pris en charge. Mais une récente enquête de la <strong>DGCCRF</strong> a mis
        en lumière des <strong>pratiques commerciales douteuses</strong> chez certains professionnels de santé.
      </p>
      <h2 className="fr-h2">Des devis incomplets ou trompeurs</h2>
      <p>
        Les opticiens, audioprothésistes et chirurgiens-dentistes sont tenus de fournir un <strong>devis conforme</strong>,
        mentionnant systématiquement une offre « 100 % santé » aux côtés d’un autre choix libre. Pourtant, les enquêteurs ont
        relevé de <strong>nombreuses anomalies</strong> :
      </p>
      <ul>
        <li>
          Absence de <strong>mentions obligatoires</strong> (nom du professionnel, modalités de remboursement, matériau utilisé,
          etc.)
        </li>
        <li>
          <strong>Substitution du devis</strong> réglementaire par un autre document
        </li>
        <li>
          Présence de <strong>faux restes à charge</strong> sur des produits « 100 % santé »
        </li>
      </ul>
      <h2 className="fr-h2">Une offre mal présentée voire dévalorisée</h2>
      <p>
        Si certains opticiens proposent un présentoir dédié, celui-ci est souvent <strong>peu visible ou mal étiqueté</strong>. Du
        côté des audioprothésistes, <strong>certains ne présentaient tout simplement pas les produits éligibles</strong>.
      </p>
      <p>
        Pire encore, des professionnels ont été surpris en train de <strong>dénigrer l’offre « 100 % santé »</strong>, la
        qualifiant de « basique », « entrée de gamme » ou même peu fiable. Ces pratiques sont non seulement{' '}
        <strong>déloyales</strong>, mais peuvent induire en erreur des patients qui renonceraient alors à une solution adaptée.
      </p>
      <h2 className="fr-h2">Des réseaux frauduleux profitant du système</h2>
      <p>
        L’enquête révèle aussi l’existence de <strong>réseaux de délinquance organisée</strong>. Leur méthode : démarchage illégal
        à domicile, promesses mensongères, manipulation de patients vulnérables… L’objectif ?{' '}
        <strong>Détourner les remboursements de l’Assurance Maladie</strong>.
      </p>
      <p>
        <strong>Résultat</strong> : des consommateurs mal équipés, financièrement lésés et exposés à des risques pour leur santé.
        Des <strong>procédures pénales</strong> sont en cours, certaines pour <strong>escroquerie et abus de faiblesse</strong>.
        En complément, des <strong>signalements</strong> ont été adressés <strong>aux parquets</strong> en application de
        l’article 40 du Code de procédure pénale, visant notamment le délit d’<strong>escroquerie</strong>.
      </p>
      <h3 className="fr-h3">📊 Des chiffres parlants</h3>
      <p>L’enquête a donné lieu à :</p>
      <ul>
        <li>
          <strong>567 avertissements</strong> (rappels à la loi, mesures pédagogiques)
        </li>
        <li>
          <strong>495 injonctions</strong> (notamment sur l’information des prix)
        </li>
        <li>
          <strong>79 amendes administratives</strong> (souvent pour pratiques trompeuses)
        </li>
        <li>
          <strong>29 procès-verbaux pénaux</strong>
        </li>
      </ul>
      <p>
        <strong>À noter</strong> :{' '}
        <strong>
          79 % des opticiens, 70 % des audioprothésistes et 72 % des dentistes contrôlés présentaient au moins une anomalie
        </strong>
        . Ces chiffres sont à relativiser néanmoins puisque les établissements visés avaient été ciblés à la suite de signalements
        via <strong>SignalConso</strong>, et beaucoup ont corrigé immédiatement les problèmes constatés.
      </p>
      <h2 className="fr-h2">Vos droits : ce que vous devez toujours retrouver dans un devis</h2>
      <p>Avant toute commande ou prestation, le professionnel doit vous fournir un devis :</p>
      <ul>
        <li>
          Mentionnant <strong>au moins deux produits</strong>, dont <strong>un relevant du 100 % santé</strong>
        </li>
        <li>
          Indiquant <strong>les caractéristiques</strong>, <strong>les prix</strong>,{' '}
          <strong>le remboursement de la Sécu et de la mutuelle</strong>
        </li>
        <li>
          Et précisant <strong>le reste à charge</strong>… qui doit être <strong>nul pour l’option 100 % santé</strong>
        </li>
      </ul>
      <p>
        <strong>ATTENTION</strong> : <strong>la vente à domicile de prothèses auditives est interdite</strong>.{' '}
        <strong>Passez toujours par un professionnel de santé qualifié.</strong>
      </p>
      <h2 className="fr-h2">Vous avez un doute ? Vous pensez avoir été mal informé ?</h2>
      <p>
        👉{' '}
        <strong>
          Signalez-le sur{' '}
          <Link href="https://signal.conso.gouv.fr/" target="_blank" rel="noopener">
            SignalConso
          </Link>
        </strong>
        . Votre signalement permettra peut-être de déclencher des enquêtes et de protéger d’autres consommateurs.
      </p>
    </div>
  )
}

import imgGrowingMoney from '@/img/actualites/growingMoney.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticlePlacementsFinanciers() {
  return (
    <div className="sc-article">
      <Image
        src={imgGrowingMoney}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Les promesses de gains rapides et attractifs peuvent cacher des pièges financiers dangereux, des arnaques ou des
        placements risqués. On vous éclaire sur les pratiques frauduleuses et les précautions à prendre pour protéger vos
        finances.
      </p>
      <h2 className="fr-h2">Le leurre des formations de trading</h2>
      <p>
        Certains sites de trading en ligne, spécialisés par exemple dans le <strong>Forex</strong> ou les{' '}
        <strong>options binaires</strong>, promettent des formations courtes pour devenir trader et faire fortune rapidement. En
        réalité, il s’agit souvent d’ <strong>arnaques</strong>. Les bonnes surprises sont rarissimes et en tant qu’investisseur
        novice, il est très probable que vous perdiez tout votre capital ou que vous vous endettiez lourdement. Avant de vous
        lancer, vérifiez que le site est autorisé et gardez à l’esprit qu’un rendement élevé implique toujours des risques élevés.
      </p>
      <h2 className="fr-h2">Les faux récupérateurs de fonds perdus</h2>
      <p>
        Après une perte d’argent, de faux professionnels de la finance, ou se prétendant avocats ou agents officiels, promettent
        aux victimes de récupérer leurs fonds perdus en échange d’informations personnelles ou bancaires. En réalité, il s’agit
        bien d’une <strong>arnaque</strong>. <strong>Aucune autorité publique ne peut récupérer vos fonds perdus</strong>.
      </p>
      <p>
        Vérifiez toujours l’identité de votre interlocuteur en téléphonant à la société pour laquelle la personne prétend
        travailler et surtout, pensez à vérifier son agrément sur le site de l’
        <Link href="https://www.orias.fr" target="_blank" rel="noopener">
          ORIAS
        </Link>
        , organisme en charge du Registre officiel des intermédiaires en Assurance, Banque et Finance.
      </p>
      <h2 className="fr-h2">Les placements atypiques ou alternatifs</h2>
      <p>
        Les investissements dans des placements « atypiques » ou « alternatifs » à hauts rendements comme les{' '}
        <strong>métaux précieux</strong> ou les <strong>cryptoactifs</strong> promettent des rendements exceptionnels. Cependant,
        les risques sont souvent élevés et, dans de nombreux cas, ces propositions sont <strong>illégales</strong>.
      </p>
      <p>
        Consultez la{' '}
        <Link
          href="https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/listes-noires-et-mises-en-garde"
          target="_blank"
          rel="noopener"
        >
          liste noire de l’AMF
        </Link>{' '}
        et exigez des{' '}
        <Link
          href="https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/faire-les-verifications"
          target="_blank"
          rel="noopener"
        >
          documents officiels
        </Link>{' '}
        avant tout engagement.
      </p>
      <h2 className="fr-h2">Les usurpations d’identité de sites internet et d’adresses email d’institutions officielles</h2>
      <p>
        Certaines escroqueries reposent sur de faux sites internet ou des emails imitant des institutions officielles. Soyez
        extrêmement vigilant avant de fournir des informations sensibles ou d’investir.
        <br />
        Généralement, la différence entre le site/adresse email officiel et le site/adresse email usurpé se joue sur quelques
        détails (un logo un peu différent, un changement de lettre dans le nom de la société ou de l’adresse du site, une adresse
        en .com au lieu de .fr).
      </p>
      <h2 className="fr-h2">Repérez les comportements suspects des conseillers</h2>
      <p>Certains comportements doivent vous mettre en alerte. Évitez les conseillers qui :</p>
      <ul>
        <li>Sont évasifs sur leur entreprise ;</li>
        <li>
          Promettent des rendements irréalistes sans risque ; - Ne tiennent pas compte de votre profil d’investisseur pour vous
          conseiller ;
        </li>
        <li>Vous pressent à agir rapidement, à fournir des informations sensibles ou à effectuer des versements d’argent.</li>
      </ul>
      <h2 className="fr-h2">Que faire si vous êtes victime d’une arnaque ?</h2>
      <p>Si vous avez été piégé :</p>
      <ol>
        <li>
          <strong>Portez plainte</strong> immédiatement.
        </li>
        <li>
          <strong>Faites opposition</strong> auprès de votre banque si des informations bancaires ont été divulguées.
        </li>
        <li>
          Faites un{' '}
          <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
            signalement
          </Link>{' '}
          pour alerter la DGCCRF et éviter qu’il y ait d’autres victimes.
        </li>
      </ol>
      <p>Prévenir vaut mieux que guérir alors, restez vigilant face aux promesses trop belles pour être vraies.</p>
    </div>
  )
}

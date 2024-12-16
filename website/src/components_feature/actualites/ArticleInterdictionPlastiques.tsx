import Image from 'next/image'
import Link from 'next/link'
import imgPlastiqueUsageUnique from '@/img/actualites/plastiqueUsageUnique.jpg'

export function ArticleInterdictionPlastiques() {
  return (
    <div className="sc-article">
      <Image
        src={imgPlastiqueUsageUnique}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p className={'mt-3'}>
        Depuis l’entrée en vigueur de la <strong>loi Anti-Gaspillage pour une Économie Circulaire (AGEC)</strong>, la vente de
        nombreux produits en plastique à usage unique est strictement interdite. Cette réglementation, en application depuis
        janvier 2021, vise à réduire les déchets plastiques et à encourager des alternatives durables.
      </p>

      <h3 id="Le-rôle-de-la-DGCCRF-dans-la-transition-écologique">Le rôle de la DGCCRF dans la transition écologique</h3>

      <p>
        La <strong>DGCCRF (Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes)</strong> mène
        des enquêtes régulières pour vérifier l’application de ces interdictions.
      </p>

      <p>
        Les résultats des contrôles montrent une prise de conscience des interdictions concernant les plastiques à usage unique
        chez les professionnels, bien qu’elle soit moins marquée chez les commerçants non sédentaires. Cependant, des infractions
        subsistent :
      </p>

      <ul>
        <li>
          <p>
            <strong>Commercialisation de sacs plastiques</strong> : sous prétexte d’écouler des stocks ou en raison de leur coût
            réduit par rapport aux alternatives réutilisables.
          </p>
        </li>
        <li>
          <p>
            <strong>Mentions frauduleuses</strong> : certains sacs « réutilisables » ou portant la mention « OK Compost » ne
            respectaient pas les normes (épaisseur, absence de matières biosourcées).
          </p>
        </li>
        <li>
          <p>
            <strong>Vente de sacs oxodégradables</strong> : malgré l’interdiction en raison de la pollution par microplastiques
            qu’ils génèrent.
          </p>
        </li>
      </ul>

      <p>
        Concernant les produits en plastique à usage unique récemment interdits (pailles, gobelets, etc.), les enquêteurs ont
        relevé :
      </p>

      <ul>
        <li>
          <p>
            <strong>Modification de la dénomination des produits</strong> pour contourner la réglementation (ex. appeler un
            gobelet « pot »).
          </p>
        </li>
        <li>
          <p>
            <strong>Substituts trompeurs</strong> prétendument sans plastique ou en matériaux biosourcés, mais contenant en
            réalité du plastique.
          </p>
        </li>
      </ul>

      <p>
        Ces pratiques illustrent des tentatives persistantes de contournement, nécessitant une vigilance accrue des consommateurs
        et des autorités.
      </p>

      <p>
        La DGCCRF a réalisé plus de 200 contrôles auprès d’établissements commercialisant des produits en plastique à usage unique
        (sacs, pailles, vaisselle jetable, coton-tiges, etc). Ces enquêtes ont conduit les agents à adresser 23 avertissements, 4
        injonctions de mise en conformité et 13 procès-verbaux.
      </p>

      <h4 id="Points-de-vigilance-pour-les-consommateurs">Points de vigilance pour les consommateurs</h4>

      <p>
        Malgré ces interdictions, certains professionnels continuent de proposer ou d’utiliser ces produits, volontairement ou par
        méconnaissance de la loi. <strong>Soyez attentif</strong> lorsque :
      </p>

      <ul>
        <li>
          <p>Vous commandez des plats à emporter ou des boissons : vérifiez si les contenants sont conformes.</p>
        </li>
        <li>
          <p>
            Vous achetez des produits de fête ou des ustensiles de pique-nique : assurez-vous qu’ils ne contiennent pas de
            plastique interdit.
          </p>
        </li>
      </ul>

      <p>
        Et si vous constatez une infraction, signalez la situation sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          <strong>SignalConso</strong>
        </Link>
        .
      </p>

      <p>
        En signalant ces pratiques, vous contribuez à la <strong>protection de l’environnement</strong> et encouragez les
        professionnels à <strong>se conformer à la loi</strong>.
      </p>
    </div>
  )
}

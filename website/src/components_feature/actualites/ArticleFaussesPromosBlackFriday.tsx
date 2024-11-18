import Image from 'next/image'
import imgBlackFriday from '@/img/actualites/blackfriday.png'

export function ArticleFaussesPromosBlackFriday() {
  return (
    <div className="sc-article">
      <h2>
        <strong>Attention aux fausses promotions et aux réductions trompeuses pendant le Black Friday !</strong>
      </h2>

      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <Image src={imgBlackFriday} width="800" alt="Attention aux fausses promotions" />
      </div>

      <h2>
        <strong>Comment repérer les arnaques et signaler les abus ?</strong>
      </h2>
      <p>
        Le Black Friday, c’est bientôt ! Ce grand rendez-vous commercial promet de belles promotions, mais attention, certaines
        offres ne sont pas aussi alléchantes qu’elles ne le paraissent. Chaque année, certaines enseignes gonflent les prix juste
        avant le Black Friday pour afficher ensuite des “réductions” trompeuses. Face à ces pratiques, soyez vigilant et n’hésitez
        pas à signaler les abus pour que ces pratiques trompeuses ne gâchent pas la fête !
      </p>
      <p>
        <strong>Fausses promotions : vos droits en tant que consommateur</strong>
      </p>
      <p>Le Code de la consommation impose aux commerçants de respecter certaines règles :</p>
      <ul>
        <li>
          <strong>Prix de référence réel</strong> : Le prix avant réduction doit être celui effectivement pratiqué avant le
          lancement de la période de promotion.
        </li>
        <li>
          <strong>Transparence des remises</strong> : Les commerçants doivent indiquer clairement le prix initial, le pourcentage
          de réduction et le prix final.
        </li>
      </ul>

      <h2>Les fraudes les plus courantes à surveiller</h2>
      <ul>
        <li>
          <strong>Les fausses réductions</strong> : Certaines enseignes augmentent artificiellement leurs prix avant la période du
          Black Friday afin d’afficher ensuite une “réduction” qui n’en est pas une.
        </li>
        <li>
          <strong>Les rabais trompeurs</strong> : Il arrive qu’une réduction affichée en pourcentage soit exagérée ou que le prix
          de référence affiché soit supérieur au prix habituel du produit.
        </li>
        <li>
          <strong>Les fausses “liquidations”</strong> : Attention aux messages comme “fin de série” ou “stock limité”. Derrière
          cette tactique se cache parfois un argument marketing sans fondement, pour pousser le consommateur à l’achat.
        </li>
        <li>
          <strong>Les frais cachés</strong> : Lors d’un achat en ligne, des frais supplémentaires peuvent s’ajouter en dernière
          étape, réduisant fortement l’intérêt de la “promotion”.
        </li>
      </ul>

      <h2>Récapitulatif Anti-Galère avec les fausses promotions pendant le Black Friday</h2>
      <p>
        Pour éviter de tomber dans le piège des fausses promotions, voici quelques conseils simples à appliquer avant d’acheter :
      </p>
      <ul>
        <li>
          <strong>Comparer les prix</strong> : N’hésitez pas à comparer le prix du produit sur différents sites ou magasins pour
          vérifier que la réduction affichée est bien réelle. Il existe également des sites, applications et extensions de
          navigateur qui permettent de retracer l’historique des prix et de voir si le prix a été gonflé artificiellement.
        </li>
        <li>
          <strong>Vérifier les conditions de vente</strong> : Les produits soldés peuvent parfois être difficiles à retourner.
          Lisez bien les conditions d’achat, de retour et de remboursement pour ne pas être pris au dépourvu.
        </li>
        <li>
          <strong>Consulter les avis clients</strong> : Les avis des autres consommateurs peuvent donner des indices sur la
          qualité d’un produit ou sur les pratiques de certains vendeurs.
        </li>
      </ul>
      <p>Avec un peu de vigilance, le Black Friday peut vraiment être l’occasion de faire de bonnes affaires !</p>
      <p>
        Pour en savoir plus rendez-vous sur{' '}
        <a href="https://signal.conso.gouv.fr/fr/black-friday-fausse-reduction" target="_blank" rel="noopener noreferrer">
          https://signal.conso.gouv.fr/fr/black-friday-fausse-reduction
        </a>
      </p>
      <p>En cas de problème, pensez à Signal Conso pour signaler les abus et défendre vos droits de consommateur !</p>
    </div>
  )
}

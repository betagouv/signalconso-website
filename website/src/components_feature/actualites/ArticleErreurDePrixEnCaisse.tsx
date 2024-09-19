import Image from 'next/image'
import imgCaisse from '@/img/actualites/caisse.png'
import Link from 'next/link'

export function ArticleErreurDePrixEnCaisse() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgCaisse} width={306} height={189} alt="" />
        </div>
        <p>
          Lors de vos courses, vous avez peut-être déjà constaté une différence entre le prix affiché en rayon et celui enregistré
          en caisse. Cette situation est plus courante qu’on ne pourrait le penser et peut causer une frustration légitime. Il est
          important de savoir comment réagir et, surtout, comment se protéger contre ces erreurs.
        </p>
      </div>

      <h2 className="text-2xl">La problématique</h2>
      <p>
        Selon la loi, les commerçants ont l'obligation de fournir une information claire et exacte sur le prix des produits, que
        ce soit en magasin ou en ligne. Cependant, il arrive que des écarts apparaissent entre le prix indiqué en rayon et celui
        facturé en caisse. Ces erreurs peuvent survenir en raison de modifications tarifaires non mises à jour ou de problèmes
        techniques et humains, comme un manque de personnel.
      </p>
      <p className="font-bold">Environ 8 % des produits en magasin sont affectés par ces erreurs !</p>

      <h2 className="text-2xl">Que dit la loi ?</h2>
      <p>
        <Link href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032227013" target="_blank">
          L'article L.211-1 du Code de la consommation
        </Link>{' '}
        prévoit qu’en cas de différence entre le prix en rayon et celui à la caisse, le consommateur est en droit d’exiger de
        payer le prix le plus bas affiché, sauf en cas d’erreur manifeste. Par exemple, si un article de haute valeur est étiqueté
        à un prix dérisoire, le commerçant peut refuser la vente, arguant d’une erreur évidente.{' '}
      </p>
      <h2 className="text-2xl">Que faire en cas d'erreur ?</h2>
      <ul>
        <li>
          <strong>Avant de payer :</strong> Si vous remarquez une différence de prix avant le passage en caisse, vous pouvez
          demander que le prix affiché soit appliqué.
        </li>
        <li>
          <strong>Après paiement :</strong> Si l'erreur est constatée après avoir réglé, conservez votre ticket de caisse et
          retournez voir un employé pour demander un remboursement de la différence. Les magasins sont souvent disposés à
          effectuer ce geste commercial pour éviter les réclamations.
        </li>
      </ul>
      <p>
        Dans les cas où le commerçant refuse d'appliquer la loi : il est crucial de signaler ces pratiques sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          SignalConso.fr
        </Link>
      </p>

      <h2 className="text-2xl">Pourquoi faire un signalement sur SignalConso ?</h2>

      <p>
        Si vous constatez que ces erreurs sont récurrentes ou que l’enseigne ne respecte pas la loi, vous pouvez faire un
        signalement sur le site SignalConso. Cela permet à la DGCCRF (Direction générale de la concurrence, de la consommation et
        de la répression des fraudes) d’être informée et, si nécessaire, de mener des contrôles dans les magasins concernés. Votre
        signalement peut non seulement vous aider, mais aussi protéger d’autres consommateurs de pratiques commerciales déloyales.
      </p>
      <p>
        En résumé, il est essentiel de rester vigilant lors de vos achats et de ne pas hésiter à demander un remboursement ou à
        signaler un problème si une erreur de prix survient.
      </p>
    </div>
  )
}

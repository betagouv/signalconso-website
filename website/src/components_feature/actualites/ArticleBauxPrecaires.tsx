import Image from 'next/image'
import imgStore from '@/img/actualites/store.png'
import playStore from '@/img/actualites/download-play-store.png'
import appStore from '@/img/actualites/download-app-store.svg'
import Link from 'next/link'

export function ArticleBauxPrecaires() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="w-full sm:w-1/2 md:w-1/2">
          <Image src={imgStore} width={306} height={189} alt="" />
        </div>
        <p>
          L’application SignalConso s’enrichit d’un tout <strong>nouveau parcours</strong> pour signaler les problématiques
          rencontrées lors d’achats dans des magasins éphémères. On fait le point.
        </p>
      </div>

      <p>
        Les magasins éphémères se multiplient dans des lieux temporaires comme des hôtels ou centres commerciaux. Ils promettent
        de superbes affaires, mais attention aux pièges ! Voici les principales arnaques à surveiller et comment les éviter.
      </p>

      <h2 className="text-2xl">Des méthodes de vente agressives à surveiller</h2>
      <p>
        Les <strong>magasins éphémères</strong> et les ventes sous <strong>bail précaire</strong>, en particulier dans le secteur
        de l'ameublement, utilisent parfois des méthodes commerciales agressives. Voici quelques cas fréquents :
      </p>
      <ul>
        <li>
          <strong>Démarchage téléphonique :</strong> Vous recevez un appel vous invitant à retirer un cadeau ou à participer à une
          loterie dans un <strong>magasin de meubles éphémère</strong> récemment ouvert.
        </li>
        <li>
          <strong>Ventes au déballage :</strong> Vous êtes invité à assister à une démonstration commerciale dans un{' '}
          <strong>hôtel</strong> ou un <strong>restaurant</strong>, où l'on vous propose des réductions importantes sur des
          articles de <strong>literie</strong> ou des <strong>meubles</strong>.
        </li>
      </ul>
      <p>
        Ces pratiques peuvent pousser à des achats impulsifs, souvent sous la pression des vendeurs, avec des promesses de{' '}
        <strong>remises importantes</strong> ou de <strong>facilités de paiement</strong>. Cependant, il arrive que ces achats
        soient regrettés, et que les consommateurs aient du mal à contacter les vendeurs après coup.
      </p>

      <h2 className="text-2xl">Apprenez à reconnaître les arnaques les plus fréquentes dans les magasins éphémères</h2>

      <ul>
        <li>
          Produits de mauvaise qualité : Vous pensez acheter un meuble ou un matelas haut de gamme à prix cassé, mais à la
          livraison, le produit est de qualité bien inférieure à ce qui était annoncé.
        </li>
        <li>
          Réductions trompeuses : Certains vendeurs augmentent d'abord le prix de base pour ensuite proposer de fausses
          réductions. Méfiez-vous des remises trop belles pour être vraies !
        </li>
        <li>
          Pression pour acheter : Les vendeurs vous font croire que l’offre est exceptionnelle et limitée dans le temps pour vous
          forcer à acheter sur-le-champ. Prenez le temps de réfléchir !
        </li>
        <li>
          Conditions de vente floues : Vous n’êtes pas toujours informé des conditions de livraison ou de votre droit de
          rétractation. Assurez-vous que toutes les informations sont claires avant de payer.
        </li>
      </ul>

      <h2 className="text-2xl">N’oubliez pas qu’en tant que consommateur vous avez des droits</h2>

      <ul>
        <li>
          <strong>Droit de rétractation :</strong> Lors d'une vente en dehors des établissements habituels vous disposez d'un{' '}
          <strong>délai de 14 jours</strong> pour changer d'avis et annuler votre achat sans avoir à vous justifier. Si ce droit
          ne vous est pas communiqué, le délai de rétractation est automatiquement prolongé à 12 mois.
        </li>
        <li>
          <strong>Droit à la garantie légale :</strong> Tout produit acheté bénéficie d'une{' '}
          <strong>garantie légale de conformité de 2 ans</strong>, vous permettant de demander réparation, remplacement ou
          remboursement en cas de défaut ou de non-conformité du bien.
        </li>
        <li>
          <strong>Obligations d’information :</strong> Le vendeur doit vous fournir des informations claires sur le produit
          (caractéristiques, prix, conditions de livraison), ainsi que sur vos droits de rétractation et la garantie légale.
        </li>
      </ul>

      <h2 className="text-2xl">Que faire en cas de problème ?</h2>

      <p>
        <strong>
          Si vous avez été victime de ce type de pratiques commerciales, il est essentiel de signaler rapidement le problème sur
          SignalConso.
        </strong>{' '}
        Cela permet à la DGCCRF d’identifier les entreprises concernées, d'intervenir rapidement et, si nécessaire, de sanctionner
        les abus. SignalConso vous permet également de vous informer sur vos droits en tant que consommateur et de recevoir des
        conseils pratiques.
      </p>
      <p>
        Les magasins éphémères peuvent offrir de bonnes affaires, mais soyez vigilant face aux arnaques courantes. Si vous
        rencontrez un problème, vous avez des recours : n'hésitez pas à utiliser SignalConso pour signaler tout abus.
      </p>

      <h2 className="text-2xl">Liens vers SignalConso sur les stores 👉</h2>

      <div className="flex justify-around mb-8">
        <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso&hl=ln&pli=1" className="!bg-none">
          <Image src={playStore} width={135} height={40} alt="Télécharger sur Google Play store" />
        </Link>
        <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093" className="!bg-none">
          <Image src={appStore} width={135} height={40} alt="Télécharger sur l'App store'" />
        </Link>
      </div>

      <h2 className="text-2xl">Liens utiles 👉</h2>
      <ul>
        <li>
          <Link href="https://signal.conso.gouv.fr/fr/comment-ca-marche">Comment ça marche ?</Link>
        </li>
        <li>
          <Link href="https://aide.signal.conso.gouv.fr/fr/">Aide SignalConso</Link>
        </li>
        <li>
          <Link href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/litiges-consommation-courante">
            Comment régler un litige de la consommation ?
          </Link>
        </li>
      </ul>
    </div>
  )
}

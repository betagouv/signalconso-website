import imgDarkPatterns from '@/img/actualites/dark-patterns.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleDarkPatterns() {
  return (
    <div className="sc-article">
      <Image
        src={imgDarkPatterns}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Chaque année, le Black Friday attire des millions de consommateurs à la recherche de bonnes affaires. Mais attention,
        derrière les offres alléchantes, certaines pratiques trompeuses, appelées <strong>Dark Patterns</strong>, peuvent fausser
        votre expérience d’achat.
      </p>

      <h2>
        <strong>Qu’est-ce qu’un Dark Pattern ?</strong>
      </h2>

      <p>
        Les dark patterns sont des techniques de conception d’interface web qui manipulent subtilement l’utilisateur pour
        l’inciter à effectuer des actions qu’il n’avait pas initialement prévues : achats impulsifs, abonnements involontaires,
        partage d’informations personnelles, etc. Ces pratiques, bien qu’éthiquement discutables, sont souvent difficiles à
        détecter et peuvent amener les consommateurs à regretter leur décision d’achat.
      </p>

      <h2>
        <strong>Quels sont les types de Dark Patterns les plus courants durant le Black Friday&nbsp;?</strong>
      </h2>

      <h3 className="text-xl">
        <strong>L’Illusion de l’urgence</strong>
      </h3>

      <p>
        Vous voyez un compte à rebours avant la fin d’une promotion ou un décompte du nombre d’articles en stock ? Ces messages
        visent souvent à créer un sentiment d’urgence pour vous inciter à acheter rapidement, de préférence sans réfléchir. Bien
        qu’ils prétendent vous signaler des offres limitées, ils sont rarement vérifiables et vous poussent à passer à l’achat
        sans comparer d’autres offres ou vérifier la qualité du produit.
      </p>

      <h3 className="text-xl">
        <strong>L’apparence trompeuse des boutons</strong>
      </h3>

      <p>
        Les sites jouent souvent sur la présentation visuelle pour influencer vos choix. Les boutons « Refuser » sont parfois
        discrets, tandis que ceux d’« Acceptation » sont colorés et mis en évidence. D’autres fois, il faut suivre plusieurs
        étapes pour refuser une option, alors qu’un seul clic suffit pour l’accepter. Cela encourage les choix avantageux pour le
        site et rend les options de refus plus complexes.
      </p>

      <h3 className="text-xl">
        <strong>La complexité du désabonnement</strong>
      </h3>

      <p>
        Vous cherchez à vous désabonner d’une newsletter ou supprimer une option ? Si le site rend cette action volontairement
        compliquée avec des menus cachés ou des étapes multiples, c’est pour décourager votre démarche. L’objectif est de vous
        faire abandonner cette action afin que vous restiez abonné ou que vous conserviez une option que vous souhaitiez
        supprimer.
      </p>

      <h3 className="text-xl">
        <strong>L’ajout d’articles au panier</strong>
      </h3>

      <p>
        Vous arrivez à la fin de vos achats et un produit ou une option supplémentaire s’est glissé dans votre panier sans votre
        accord. Cette technique parie sur le fait que vous ne vérifierez pas chaque ligne avant de payer, ou que vous n’aurez pas
        envie de refaire tout le processus pour retirer cet ajout non désiré.
      </p>

      <h3 className="text-xl">
        <strong>Les frais de livraison cachés</strong>
      </h3>

      <p>
        Certains sites n’affichent les frais de livraison ou autres frais annexes qu’au moment du paiement. Ce manque de
        transparence peut surprendre, surtout lorsque les frais sont élevés.
      </p>

      <h3 className="text-xl">
        <strong>L’abonnement caché sous une offre d’essai gratuit</strong>
      </h3>

      <p>
        Beaucoup de services en ligne utilisent ce piège pour transformer une offre d’essai en abonnement automatique. Les
        utilisateurs oublient souvent de vérifier la date d’expiration de la période gratuite, et se retrouvent débités pour un
        abonnement payant. Cette pratique est fréquente dans les applications mobiles ou les services liés aux téléphones et
        ordinateurs, et il est parfois difficile de détecter ces frais sur les factures.
      </p>

      <h2>
        <strong>Récapitulatif anti galère pour repérer les Dark Patterns pendant le Black Friday ?</strong>
      </h2>

      <ul>
        <li>
          <p>
            <strong>Lisez les avis et les conditions générales</strong> : Souvent, les pièges sont mentionnés par d’autres
            utilisateurs.
          </p>
        </li>
        <li>
          <p>
            <strong>Surveillez votre panier</strong> : Avant de confirmer l’achat, vérifiez les produits ajoutés et les options
            cochées.
          </p>
        </li>
        <li>
          <p>
            <strong>Prenez le temps de comparer les offres</strong> : Méfiez-vous des messages d’urgence qui vous forcent à
            décider trop vite.
          </p>
        </li>
      </ul>
      <p>
        En restant vigilant et en connaissant vos droits, vous pouvez profiter du Black Friday sans tomber dans les pièges des
        dark patterns.
      </p>

      <p>
        Pour en savoir plus rendez vous sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr/black-friday-dark-patterns" target="_blank" rel="noopener">
          Signal Conso
        </Link>
        .
      </p>
    </div>
  )
}

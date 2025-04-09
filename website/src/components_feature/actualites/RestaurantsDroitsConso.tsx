import imgRestaurant from '@/img/actualites/restaurant.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleRestaurantsDroitsConso() {
  return (
    <div className="sc-article">
      <Image
        src={imgRestaurant}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Vous aimez partager un repas au restaurant avec vos amis, vos collègues ou votre famille ? Mais êtes-vous au fait de vos
        droits en tant que client et des obligations qui incombent aux restaurateurs ? Voici un tour d’horizon pour vous permettre
        de profiter pleinement de vos sorties gastronomiques.
      </p>
      <h2 className="fr-h2">Les obligations des restaurateurs en matière d’affichage</h2>
      <ul>
        <li>
          <p>
            <strong>Affichage des prix</strong> : Les établissements doivent afficher clairement les prix{' '}
            <strong>à l’extérieur</strong> et <strong>à l’intérieur</strong>. Les cartes et menus disponibles à l’intérieur
            doivent être identiques à ceux affichés à l’extérieur.
          </p>
        </li>
        <li>
          <p>
            <strong>Origine des viandes bovines</strong> : L’origine des viandes bovines servies doit être précisée.
          </p>
        </li>
        <li>
          <p>
            <strong>Prix des boissons courantes</strong> : Les prix de cinq vins ou de cinq boissons couramment servies, si le
            restaurant ne sert pas de vin, doit être affiché.
          </p>
        </li>
        <li>
          <p>
            <strong>Prix toutes taxes et services compris</strong> : Dans les établissements avec service, les prix affichés
            incluent les taxes et le service.
          </p>
        </li>
        <li>
          <p>
            <strong>Note en fin de repas</strong> : Une note détaillée doit vous être remise, indiquant la date, le nom et
            l’adresse de l’établissement, ainsi que le détail des prestations fournies avec leurs prix TTC.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">Vos droits en tant que consommateur</h2>
      <ul>
        <li>
          <p>
            <strong>Remplacement d’un plat ou d’une boisson</strong> : Si un plat n’est pas conforme à vos attentes en termes de
            fraîcheur ou de température, vous pouvez demander son remplacement. De la même façon, vous pouvez demander le
            remplacement d’un vin bouchonné.
          </p>
        </li>
        <li>
          <p>
            <strong>Refus du vestiaire</strong> : Vous n’êtes pas obligé de déposer vos effets personnels au vestiaire.
          </p>
        </li>
        <li>
          <p>
            <strong>Carafe d’eau gratuite</strong> : Vous pouvez refuser de commander de l’eau minérale ou du vin. Vous pouvez
            vous contenter d’une carafe d’eau sans frais supplémentaire.
          </p>
        </li>
        <li>
          <p>
            <strong>“Doggy-bag”</strong> : Vous pouvez demander à emporter les aliments ou boissons non consommés. Le restaurateur
            peut fournir un contenant réutilisable, éventuellement facturé, ou accepter que vous apportiez le vôtre.
          </p>
        </li>
        <li>
          <p>
            <strong>Repas en solo</strong> : Même si le restaurant est complet, vous avez le droit de dîner seul.
          </p>
        </li>
        <li>
          <p>
            <strong>Dédommagement en cas d’incident</strong> : Si vous subissez un préjudice (par exemple, une tache sur vos
            vêtements due au service ou un vol dans le vestiaire), vous pouvez demander un dédommagement.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">Les droits des restaurateurs</h2>
      <ul>
        <li>
          <p>
            <strong>Refus des animaux</strong> : Les restaurateurs peuvent refuser l’accès aux animaux dans leur établissement ou
            imposer le port d’une laisse.
          </p>
        </li>
        <li>
          <p>
            <strong>Facturation d’un couvert pour les enfants</strong> : Un couvert peut être facturé pour chaque enfant, même
            s’il ne consomme pas, à condition que cela soit clairement indiqué sur le menu ou la carte.
          </p>
        </li>
        <li>
          <p>
            <strong>Menus à tarif réduit</strong> : Les menus à tarif réduit proposés en semaine jusqu’à une certaine heure
            peuvent être refusés au-delà de cet horaire si cela est précisé.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">En cas de litige</h2>
      <p>
        Les infractions les plus fréquemment constatées concernent la qualité des produits alimentaires, notamment en matière
        d’hygiène et de conservation des aliments, ainsi que les fausses mentions valorisantes sur l’origine ou la nature des
        produits.
      </p>
      <p>
        Si vous constatez une anomalie, faites un signalement sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          SignalConso
        </Link>
      </p>
      <p>
        Pour plus d’informations, vous pouvez consulter la{' '}
        <Link
          href="https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/restaurants-droits-et-obligations-des-professionnels"
          target="_blank"
          rel="noopener"
        >
          fiche pratique de la DGCCRF
        </Link>
        .
      </p>
    </div>
  )
}

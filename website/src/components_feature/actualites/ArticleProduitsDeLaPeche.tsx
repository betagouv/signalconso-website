import imgPoissons from '@/img/actualites/poissons.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleProduitsDeLaPeche() {
  return (
    <div className="sc-article">
      <Image
        src={imgPoissons}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Entre 2022 et 2023, la DGCCRF a contrôlé plus de 2320 établissements agissant à tous les stades de commercialisation de
        produits issus de la pêche et de l’aquaculture. Les enquêtes ont révélé des manquements importants dans l’étiquetage et
        l’information des produits de la pêche et de l’aquaculture. Ces pratiques peuvent induire les consommateurs en erreur,
        particulièrement sur l’origine et la qualité des produits.
      </p>
      <h2 className="fr-h2">Les constats principaux</h2>
      <p>
        1️⃣ Étiquetage trompeur : Substitution de noms d’espèces par des appellations plus prisées ou ambiguës, absence de mentions
        obligatoires (comme le nom scientifique ou le caractère décongelé, saumuré ou enrichi en eau), utilisation de termes
        valorisants comme “pêche durable” sans preuve ni certification fiable.
      </p>
      <p>
        2️⃣ Informations incompréhensibles : Utilisation de termes techniques sans support explicatif, indications floues sur les
        méthodes de pêche ou d’élevage.
      </p>
      <p>
        3️⃣ Additifs non autorisés : Utilisation d’additifs pour améliorer l’aspect, le poids ou la conservation, ajout d’eau dans
        certains produits commercialisés comme frais.
      </p>
      <p>4️⃣ Traçabilité insuffisante : Étiquettes ne précisant pas correctement le lieu de capture ou de production.</p>
      <h2 className="fr-h2">Pourquoi est-ce problématique ?</h2>
      <p>Ces manquements nuisent à :</p>
      <ul>
        <li>
          <p>
            <strong>La transparence</strong> : Vous ne savez pas ce que vous achetez vraiment.
          </p>
        </li>
        <li>
          <p>
            <strong>La traçabilité</strong> : Les consommateurs souhaitant privilégier des produits locaux ou durables ne peuvent
            pas faire de choix éclairés.
          </p>
        </li>
        <li>
          <p>
            <strong>La confiance</strong> : Cela crée une inégalité entre les entreprises respectueuses des règles et celles qui
            ne le sont pas.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">Les actions de la DGCCRF</h2>
      <p>La DGCCRF :</p>
      <p>
        <strong>Rappelle les obligations légales</strong> aux professionnels pour garantir une information claire et fiable.
      </p>
      <p>
        <strong>Renforce les contrôles</strong> sur les circuits de distribution.
      </p>
      <p>
        <strong>Sanctionne les pratiques non conformes</strong> pour protéger les consommateurs.
      </p>
      <p>
        Entre 2022 et 2023, la DGCCRF a intensifié ses contrôles. C’est 806 avertissements, 208 injonctions et 166 procès-verbaux
        qui ont été adressés aux établissements en infraction pour sanctionner des pratiques trompeuses et des anomalies
        d’étiquetage.
      </p>
      <p>
        👉 Vous avez constaté un problème avec l’étiquetage ou la qualité d’un produit de la mer ? Signalez-le sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          Signal Conso
        </Link>{' '}
        ! Vos signalements aident à renforcer la transparence et à protéger les autres consommateurs.
      </p>
    </div>
  )
}

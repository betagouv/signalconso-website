import imgproduitsFraisSac from '@/img/actualites/produitsFraisSac.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleConsultationPublique() {
  return (
    <div className="sc-article">
      <Image
        src={imgproduitsFraisSac}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Du 27 janvier au 17 février 2025, une consultation publique en ligne est ouverte pour recueillir vos avis sur le projet de
        décret relatif au développement de la vente de produits non préemballés, notamment en vrac, dans les commerces de détail
        de plus de 400 m². Cette initiative s’inscrit dans le cadre de la loi Climat et résilience, avec l’objectif ambitieux de
        réduire les emballages et d’encourager des pratiques de consommation plus durables.
      </p>
      <h2 className="fr-h2">Ce que prévoit le projet de décret</h2>
      <p>
        Le décret en consultation vise à concrétiser l’article 23 de la loi Climat et résilience, qui impose qu’à partir du 1er
        janvier 2030, les commerces de détail de plus de 400 m² consacrent 20 % de leur surface de vente à des produits sans
        emballage primaire.
      </p>
      <h2 className="fr-h2">Parmi les principaux points du projet :</h2>
      <p>
        <strong>Une méthodologie de calcul</strong> : Les commerces pourront mesurer cet objectif en fonction de leur chiffre
        d’affaires, du nombre de références vendues, ou de la surface de vente, offrant ainsi une certaine flexibilité.
      </p>
      <p>
        <strong>Produits exclus</strong> : Les produits ne pouvant être vendus sans emballage pour des raisons de santé publique
        ou légales ne seront pas pris en compte dans le calcul.
      </p>
      <p>
        <strong>Catégories spécifiques</strong> : Des modulations sont prévues pour les boissons alcoolisées, les produits
        cosmétiques et les détergents, afin de prendre en compte les contraintes particulières de ces catégories.
      </p>
      <p>
        <strong>Types de vente concernés</strong> : Cela inclut les produits vendus en vrac ou en quantité prédéfinie sans
        emballage primaire, ainsi que les rayons en vente assistée.
      </p>
      <p>
        Ces propositions s’appuient sur les retours recueillis lors d’une concertation préalable organisée par la DGCCRF en 2022,
        qui avait mis en lumière certaines difficultés, notamment pour les catégories de produits spécifiques mentionnées.
      </p>
      <h2 className="fr-h2">Pourquoi participer à cette consultation publique ?</h2>
      <p>
        La mise en œuvre de ce décret est une étape clé pour atteindre les objectifs fixés par la loi Climat et résilience. En
        réduisant les déchets liés aux emballages et en favorisant la vente en vrac, cette démarche permet :
      </p>
      <ul>
        <li>
          <p>
            Une <strong>diminution significative des déchets</strong> d’emballages.
          </p>
        </li>
        <li>
          <p>
            Une plus grande{' '}
            <strong>
              <strong>liberté</strong>
            </strong>{' '}
            pour les consommateurs : pouvoir choisir les quantités adaptées à ses besoins aide à mieux maîtriser son budget et à
            éviter le gaspillage.
          </p>
        </li>
      </ul>
      <p>
        Votre participation est essentielle pour que le texte final prenne en compte les attentes des consommateurs, des
        professionnels et des acteurs concernés.
      </p>
      <h2 className="fr-h2">Comment participer ?</h2>
      <p>C’est simple ! Vous pouvez :</p>
      <ul>
        <li>
          <p>Consulter le projet de décret en ligne sur la page dédiée de la DGCCRF.</p>
        </li>
        <li>
          <p>
            Envoyer vos commentaires et contributions par e-mail à l’adresse suivante :{' '}
            <Link href="mailto:conso.durable.equitable@dgccrf.finances.gouv.fr" target="_blank" rel="noopener">
              conso.durable.equitable@dgccrf.finances.gouv.fr
            </Link>
            .
          </p>
        </li>
      </ul>
      <p>
        <strong>Ne tardez pas : la consultation est ouverte jusqu’au 17 février 2025.</strong>
      </p>
      <p>
        L’adoption de ce décret permettra aux commerces de détail de se préparer à l’objectif de 2030, tout en sensibilisant
        davantage les consommateurs aux bénéfices environnementaux et économiques de la vente sans emballage. Ce mode de
        consommation durable, déjà plébiscité par de nombreux Français, constitue une réponse concrète aux enjeux climatiques.
      </p>
      <p>
        <strong>Participez</strong> dès maintenant et <strong>devenez acteur du changement</strong> !
      </p>
    </div>
  )
}

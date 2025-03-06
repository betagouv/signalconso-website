import imgIndicationsGeographiques from '@/img/actualites/igp.jpg'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleIndicationsGeographiques() {
  return (
    <div className="sc-article">
      <Image
        src={imgIndicationsGeographiques}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt="Indications Géographiques"
      />

      <p>
        Dans le cadre de leur mission de protection des consommateurs, les agents de la DGCCRF ont mené en 2022 une enquête sur
        l’utilisation des indications géographiques des produits industriels et artisanaux (IGPIA). Ces labels garantissent
        l’authenticité et la qualité des produits selon des critères précis. Les contrôles ont révélé un respect satisfaisant des
        règles, bien que quelques irrégularités aient été relevées.
      </p>

      <h2>Une protection réglementée des savoir-faire locaux</h2>
      <p>
        Créées par la loi Hamon du 17 mars 2014, les IGPIA certifient l’origine et les spécificités des produits artisanaux et
        industriels. Chaque indication est encadrée par un cahier des charges validé par l’INPI et géré par un Organisme de
        Défense et de Gestion (ODG). Un organisme certificateur indépendant vérifie ensuite la conformité des professionnels.
      </p>
      <p>
        Ce dispositif permet aux artisans et industriels de valoriser leur savoir-faire et protège les consommateurs contre les
        pratiques trompeuses. Il contribue également à lutter contre la concurrence déloyale.
      </p>

      <h2>Des contrôles pour prévenir les fraudes</h2>
      <p>
        L’enquête de la DGCCRF visait à détecter d’éventuelles allégations frauduleuses et à évaluer l’efficacité des ODG. Sur les
        37 établissements contrôlés (10 ODG et 27 entreprises), 6 présentaient des anomalies, principalement liées à une
        utilisation irrégulière d’une indication géographique.
      </p>

      <h2>Des irrégularités sanctionnées</h2>
      <ul>
        <li>
          <strong>Trois avertissements</strong> pour des informations trompeuses (origine du produit, diplômes des employés,
          mentions obligatoires absentes).
        </li>
        <li>
          <strong>Une injonction</strong> pour usage frauduleux d’une IG, obligeant l’entreprise à se mettre en conformité.
        </li>
        <li>
          <strong>Deux procès-verbaux</strong> pour utilisation abusive d’une IG et obstruction à un contrôle.
        </li>
      </ul>
      <p>
        Par ailleurs, des professionnels certifiés ont dû modifier la présentation de leurs produits pour éviter toute confusion
        sur leur certification.
      </p>

      <h2>Vers une évolution de la réglementation</h2>
      <p>
        La législation européenne sur les indications géographiques va évoluer avec l’entrée en vigueur, le 1er décembre 2025,
        d’un nouveau règlement visant à renforcer la protection des IG pour les produits artisanaux et industriels.
      </p>

      <p>Pour en savoir plus, rendez-vous sur les fiches pratiques :</p>
      <ul>
        <li>
          <Link
            href="https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/la-valorisation-de-lorigine-et-de-la-qualite-produits-industriels-et"
            target="_blank"
            rel="noopener noreferrer"
          >
            Les signes d’origine et de qualité
          </Link>
        </li>
        <li>
          <Link
            href="https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/le-fabrique-en-france-la-garantie-de-lorigine-des-produits"
            target="_blank"
            rel="noopener noreferrer"
          >
            Le fabriqué en France
          </Link>
        </li>
      </ul>
    </div>
  )
}

import imgRouages from '@/img/actualites/rouages.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticlePlanStrategique() {
  return (
    <div className="sc-article">
      <Image
        src={imgRouages}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p className="mt-6">
        La Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes (DGCCRF) a défini son plan
        stratégique 2025-2028, une feuille de route ambitieuse pour mieux réguler les marchés et renforcer la protection des
        consommateurs.
      </p>
      <p>
        Fruit d’une démarche participative impliquant l’ensemble de l’organisation, ce plan repose sur une analyse approfondie des
        transformations économiques et sociétales : numérisation, mondialisation des marchés, transition écologique et nouvelles
        attentes des consommateurs.
      </p>
      <h2 className="fr-h2">Quatre axes stratégiques pour une action plus efficace</h2>
      <h3 className="fr-h3">1. Maximiser l’impact de l’action au plus près des territoires</h3>
      <p>
        La DGCCRF entend renforcer son action en intensifiant la veille économique et la détection des fraudes. L’objectif est
        d’adapter en permanence ses contrôles et enquêtes aux nouvelles pratiques des entreprises et aux évolutions des marchés.
        Outre les contrôles, l’administration mise sur une meilleure sensibilisation des consommateurs et un accompagnement des
        professionnels pour prévenir les infractions.
      </p>
      <h3 className="fr-h3">2. Accompagner les transformations économiques et sociales</h3>
      <p>
        Les grands enjeux de notre société – transition écologique, pouvoir d’achat, sécurité, numérique – sont au cœur des
        missions de la DGCCRF. L’administration continuera d’intervenir pour garantir des pratiques commerciales équitables,
        assurer la loyauté des transactions et veiller à la sécurité des produits et services mis sur le marché.
      </p>
      <h3 className="fr-h3">3. Mener une stratégie d’ouverture et de coopération</h3>
      <p>
        La DGCCRF renforce ses partenariats avec d’autres administrations, les organisations de consommateurs, les institutions
        européennes et le milieu universitaire. Cette coopération permettra une meilleure anticipation des risques et une action
        plus coordonnée contre les fraudes, tout en renforçant la confiance des consommateurs et des entreprises.
      </p>
      <h3 className="fr-h3">4. Investir dans les compétences et les outils numériques</h3>
      <p>
        Pour améliorer l’efficacité de ses interventions, la DGCCRF mise sur la modernisation de ses outils, la simplification de
        ses processus et le développement des compétences de ses agents. Cela passe notamment par l’intégration de technologies
        avancées pour l’analyse des données et le renforcement des formations.
      </p>
      <h2 className="fr-h2">Des actions concrètes pour une meilleure protection des consommateurs</h2>
      <p>
        Le plan stratégique 2025-2028 se traduira par la mise en place de 15 chantiers prioritaires, dont certains sont déjà
        engagés. Parmi eux :
      </p>
      <ul>
        <li>
          <p>Une action renforcée au niveau européen, pour une régulation plus efficace des marchés transnationaux.</p>
        </li>
        <li>
          <p>
            Un développement accru des partenariats, afin d’améliorer le partage d’informations et la coordination des actions.
          </p>
        </li>
        <li>
          <p>Un dialogue renforcé avec les organisations de consommateurs, pour mieux intégrer les attentes du public.</p>
        </li>
        <li>
          <p>
            Une approche globale de la lutte contre la fraude, avec une meilleure exploitation des données issues de{' '}
            <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
              SignalConso
            </Link>{' '}
            et des contrôles.
          </p>
        </li>
        <li>
          <p>
            Un engagement en faveur de la consommation durable, en sensibilisant les consommateurs et en accompagnant les
            entreprises vers des pratiques plus responsables.
          </p>
        </li>
      </ul>
      <p>
        La DGCCRF publiera chaque année un bilan de l’avancement de ce plan pour garantir une transparence et une adaptation
        continue aux enjeux émergents.
      </p>
      <p>
        Avec cette stratégie, la DGCCRF réaffirme son engagement à protéger les consommateurs tout en adaptant son action aux
        mutations économiques et sociétales. Un cap clair pour garantir des marchés plus sûrs, équitables et transparents !
      </p>
    </div>
  )
}

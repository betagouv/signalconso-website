import imgLaptop from '@/img/actualites/laptop.png'
import Image from 'next/image'

export function ArticleTarificationDynamique() {
  return (
    <div className="sc-article">
      <Image
        src={imgLaptop}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Acheter un billet de concert ou réserver un taxi en ligne peut parfois réserver de mauvaises surprises. Les prix changent
        constamment et très souvent à notre désavantage. Ce phénomène, lié aux algorithmes de tarification dynamique, transforme
        notre manière de consommer, mais soulève également de nombreuses questions quant à son impact réel.
      </p>
      <h2 className="fr-h2">Comment fonctionnent les algorithmes de tarification ?</h2>
      <p>
        Les algorithmes analysent d’énormes quantités de données, qu’elles soient publiques (études, données météorologiques),
        internes aux entreprises (données marketing, financières, stratégie de gestion) ou personnelles de masse (tendances
        globales d’un groupe d’utilisateurs) ou individuelles (localisation, recherche internet).
      </p>
      <p>
        Un modèle est calibré statistiquement sur cette masse de données pour déterminer les règles de tarification optimales en
        temps réel pour maximiser les profits des entreprises.
      </p>
      <h2 className="fr-h2">Les risques pour les consommateurs</h2>
      <p>Plusieurs types de risques ont d’ores et déjà été identifiés :</p>
      <ul>
        <li>
          <p>
            <strong>Discrimination :</strong> Les prix individualisés peuvent être basés sur des données sensibles telles que
            l’âge, le sexe ou l’ethnie. Par ailleurs, certaines données à priori non biaisées sont fortement corrélées avec des
            données sensibles, rendant la sélection des informations utilisables complexe. À termes, les algorithmes peuvent
            également renforcer des inégalités existantes.
          </p>
        </li>
        <li>
          <p>
            <strong>Opacité :</strong> Les algorithmes étant difficiles, voire impossibles à expliquer, leur utilisation réduit la
            transparence vis-à-vis des consommateurs et la possibilité de comparer efficacement des prix.
          </p>
        </li>
        <li>
          <p>
            <strong>Non-conformité réglementaire</strong> : Les entreprises peuvent développer des systèmes ne respectant pas les
            lois relatives à la concurrence, à la protection des données ou à la tarification équitable. La complexité de ces
            algorithmes rend difficile leur contrôle et leur mise en conformité.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">Comment vous protéger ?</h2>
      <ul>
        <li>
          <p>
            <strong>Comparez les prix</strong> : Utilisez plusieurs plateformes avant d’acheter ou de réserver.
          </p>
        </li>
        <li>
          <p>
            <strong>Désactivez les cookies</strong> : Supprimez régulièrement vos cookies et limitez le partage de vos données
            personnelles.
          </p>
        </li>
        <li>
          <p>
            <strong>Surveillez les tendances</strong> : Certaines périodes (jours fériés, événements) entraînent des augmentations
            tarifaires prévisibles. Achetez en avance si possible.
          </p>
        </li>
      </ul>
      <p>
        La tarification dynamique et personnalisée n’est pas une fatalité. Avec un peu de vigilance et une meilleure compréhension
        des mécanismes, vous pouvez limiter l’impact de ces pratiques sur votre budget. Restez informé et protégez vos droits en
        tant que consommateur.
      </p>
    </div>
  )
}

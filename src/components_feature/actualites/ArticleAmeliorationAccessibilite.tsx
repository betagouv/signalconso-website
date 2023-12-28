import Image from 'next/image'
import imgAccessibilityImprovements from '@/img/actualites/ameliorationAccessibilite.jpg'

export function ArticleAmeliorationAccessibilite() {
  return (
    <div>
      <h2>Qu’est-ce que l’accessibilité numérique ?</h2>
      <p>
        L’accessibilité numérique consiste à rendre les contenus et services numériques compréhensibles et utilisables par les
        personnes en situation de handicap.
      </p>

      <p>
        Au cours des trois derniers mois, SignalConso a réalisé d'importantes améliorations sur son site web et son application
        mobile, particulièrement en termes d'accessibilité pour les consommateurs.
      </p>

      <p>
        L'objectif de ces améliorations est de rendre la plateforme plus accessible aux personnes en situation de handicap. Cela
        implique de rendre le contenu perceptible (par exemple, améliorer la perception visuelle), utilisable (comme fournir des
        éléments d'orientation pour faciliter la navigation et l'accès au contenu, ainsi que l'utilisation des fonctionnalités au
        clavier), compréhensible (assurer une fonctionnalité prévisible et aider à la correction d'erreurs de saisie) et robuste
        (optimiser la compatibilité avec les navigateurs et technologies actuels et futurs).
      </p>

      <p>
        L'équipe de SignalConso prévoit de continuer à apporter des améliorations progressives en termes d’accessibilité pour les
        agents et les professionnels tout au long de l'année 2024.
      </p>

      <p>
        Les efforts déployés ces derniers mois ont porté leurs fruits, comme en témoignent les évaluations récentes de la
        plateforme :
      </p>
      <ul>
        <li>Le taux de conformité global est de 98,4% sur les différentes pages de la plateforme,</li>
        <li>Le taux de conformité moyen atteint 99,8% lors de l'utilisation des parcours par les consommateurs.</li>
      </ul>

      <Image
        className="max-w-full h-auto border border-gray-300 border-solid shadow-lg"
        sizes={'100vw'}
        src={imgAccessibilityImprovements}
        alt="logo accessibilité"
      />
    </div>
  )
}

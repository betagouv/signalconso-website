import imgScreenshot from '@/img/actualites/screenshot_code_barres_flow.png'
import Image from 'next/image'
export function ArticleCodeBarres() {
  return (
    <div>
      <p>Fini les difficultés pour identifier le produit alimentaire pour lequel vous souhaitez déposer un signalement !</p>
      <p>SignalConso a développé une nouvelle fonctionnalité de recherche par saisie du code-barres (GTIN) du produit.</p>
      <p>
        Vous avez dès maintenant la possibilité de rechercher un produit par son code-barres (GTIN) lors de la soumission de votre
        signalement. Cette méthode est désormais la première option qui vous est proposée lors de l'identification du produit. Si
        le code-barres n'est pas disponible, les méthodes habituelles de recherche par nom de produit, SIRET, etc., restent
        accessibles.
      </p>
      <p>
        Cette méthode simplifie votre parcours de signalement, l'identification du produit et de l'entreprise concernée, réduisant
        ainsi les risques d'erreurs. Les étapes suivantes du processus de signalement demeurent inchangées.
      </p>

      <Image
        className="max-w-full h-auto border border-gray-300 border-solid shadow-lg"
        sizes={'100vw'}
        src={imgScreenshot}
        alt="Screenshot de la fonctionnalité"
      />
    </div>
  )
}

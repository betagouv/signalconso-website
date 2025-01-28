import imgUnMillion from '@/img/actualites/unMillion.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleUnMillion() {
  return (
    <div className="sc-article">
      <Image
        src={imgUnMillion}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        <strong>C’est officiel : Signal Conso a franchi le cap du million de signalements !</strong>
      </p>
      <p>
        Depuis son lancement, notre plateforme s’est imposée comme un outil incontournable pour améliorer la transparence et
        renforcer la confiance entre consommateurs et entreprises.
      </p>
      <p>
        Ce succès, c’est avant tout grâce à vous : citoyens engagés, qui avez pris le temps de signaler des problèmes rencontrés
        et entreprises responsables, qui participez chaque jour à améliorer nos marchés et nos pratiques.
      </p>
      <h2 className="fr-h2">Signal Conso, c’est bien plus qu’une simple plateforme de signalements</h2>
      <p>C’est un levier pour :</p>
      <ul>
        <li>
          <p>
            <strong>Protéger les consommateurs</strong> : Chaque signalement aide les agents de la DGCCRF à identifier les
            pratiques qui peuvent nuire à vos droits. Que ce soit un produit dangereux, une publicité trompeuse ou une facturation
            abusive, vos retours leur permettent d’agir pour protéger votre sécurité et l’équilibre du marché.
          </p>
        </li>
        <li>
          <p>
            <strong>Aider les entreprises à progresser</strong> : Signal Conso encourage le dialogue. Les entreprises reçoivent
            vos signalements directement et disposent d’un espace pour expliquer, corriger ou résoudre les problèmes. Cela leur
            permet d’améliorer leurs pratiques tout en préservant leur image auprès des consommateurs.
          </p>
        </li>
        <li>
          <p>
            <strong>Rendre les marchés plus justes et transparents</strong> : Signal Conso renforce la confiance entre les
            consommateurs et les entreprises et favorise une économie plus responsable et respectueuse des droits de chacun.
          </p>
        </li>
      </ul>
      <h2 className="fr-h2">Quelques chiffres clés</h2>
      <ul>
        <li>
          <strong>Plus de 700 000 consommateurs</strong> ont déposé un signalement sur la plateforme depuis son lacement,
        </li>
        <li>
          <strong>85 %</strong> des entreprises y ont répondu,
        </li>
        <li>
          en moyenne en <strong>12 jours</strong>.
        </li>
        <li>
          <strong>Plus de 100 000 entreprises</strong> se sont inscrites sur Signal Conso.
        </li>
        <li>
          Plus de <strong>300 000 problèmes ont été résolus</strong> directement grâce à la plateforme.
        </li>
      </ul>
      <h2 className="fr-h2">Et après ?</h2>
      <p>Ce cap symbolique n’est qu’une étape. Nous ne comptons pas nous arrêter là. Signal Conso continue d’innover pour :</p>
      <ul>
        <li>Simplifier vos démarches.</li>
        <li>Vous accompagner sur de nouveaux sujets.</li>
        <li>Renforcer l’impact de vos signalements.</li>
        <li>Rendre le suivi des signalements encore plus transparent.</li>
      </ul>
      <p>Merci à tous pour votre engagement et continuons ensemble à rendre le quotidien des consommateurs meilleur !</p>
      <p>
        ➡️ **Un problème ? Ayez le réflexe{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          Signal Conso
        </Link>{' '}
        !
      </p>
    </div>
  )
}

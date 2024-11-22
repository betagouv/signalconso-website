import imgAteliersUtilisateurs from '@/img/actualites/ateliers-utilisateurs.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleAteliersUtilisateurs() {
  return (
    <div className="sc-article">
      <Image
        src={imgAteliersUtilisateurs}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p className="mt-4">
        Vous avez entre <strong>18 et 30 ans</strong> et vous avez déjà utilisé <strong>SignalConso</strong> plusieurs fois ?
        Rejoignez nos <strong>ateliers utilisateurs</strong> pour nous aider à améliorer notre application !
      </p>

      <h2>Pourquoi participer ?</h2>
      <p>
        Votre avis compte. En participant, vous nous aiderez à améliorer SignalConso pour que ce soit encore plus simple, rapide
        et efficace. C’est l’occasion de donner votre point de vue en tant que consommateur, de partager vos idées et de tester de
        nouvelles fonctionnalités en avant-première.
      </p>

      <h2>Comment ça se passe ?</h2>
      <p>
        Nous organisons un atelier convivial, d’une durée d’environ 1h, en présentiel à Paris ou à distance.
        <br />
        Pas besoin de compétences techniques, juste de votre expérience d’utilisateur.
      </p>

      <h2>Intéressé(e) ?</h2>
      <p>Remplissez notre formulaire en ligne et nous vous recontacterons rapidement !</p>

      <p>
        <strong>📅 Les ateliers auront lieu en décembre et janvier.</strong>
        <br /> Ne tardez pas, les places sont limitées.
      </p>

      <p>Nous avons hâte de vous rencontrer et de construire l’avenir de SignalConso avec vous !</p>

      <p>
        <Link href="https://tally.so/r/mJVVGY" target="_blank" rel="noopener">
          Je veux participer aux ateliers
        </Link>
      </p>
    </div>
  )
}

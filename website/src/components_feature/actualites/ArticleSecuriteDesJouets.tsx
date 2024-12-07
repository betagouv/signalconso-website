import Image from 'next/image';
import Link from 'next/link';
import jouets from "@/img/actualites/jouets.jpg";



export function ArticleSecuriteDesJouets() {
  return (
    <div className="sc-article">
      <Image
        src={jouets}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          marginBottom: 5,
        }}
        alt=""
      />

      <p>
        Les fêtes approchent, et l’achat de jouets pour les enfants est au cœur des préparatifs de fin d’année. Pour garantir
        la sécurité des plus jeunes, voici la réglementation à connaître et quelques recommandations essentielles.
      </p>

      <h2 id="Que-dit-la-loi-en-matière-de-jouets-">
        <strong>Que dit la loi en matière de jouets ?</strong>
      </h2>

      <p>
        On entend par jouets « <em>les produits qui sont conçus pour être utilisés, exclusivement ou non, à des fins de jeu par
        des enfants de moins de quatorze ans ou destinés à cet effet</em> ».
      </p>

      <p>
        Les fabricants de jouets doivent s’assurer du <strong>respect de la réglementation applicable aux jouets</strong>, qui a
        pour objectif d’<strong>écarter les risques et dangers</strong> que pourraient courir les enfants.
      </p>

      <p>
        La loi prévoit notamment la rédaction d’une{' '}
        <Link href="https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000021865491" target="_blank" rel="noopener">
          documentation technique
        </Link>{' '}
        ainsi que l’évaluation des dangers et de la conformité du jouet. C’est le fabricant qui est responsable de{' '}
        <strong>déterminer si ses produits sont des jouets au sens de la réglementation</strong> et d’en{' '}
        <strong>définir la classe d’âge.</strong>
      </p>

      <h2 id="Quels-sont-les-bons-réflexes-à-avoir-en-tant-que-consommateur-">
        <strong>Quels sont les bons réflexes à avoir en tant que consommateur ?</strong>
      </h2>

      <p>
        <strong>Vérifiez le marquage CE</strong> : Assurez-vous que le jouet porte le marquage CE, signe de conformité aux normes
        européennes de sécurité. Ce label doit être visible, lisible et indélébile sur le produit ou son emballage.
      </p>

      <p>
        <strong>Choisissez un jouet adapté à l’âge de l’enfant</strong> : Respectez les indications d’âge minimum pour éviter les
        risques liés à de petites pièces, à l’ingestion d’éléments, ou à une mauvaise utilisation. Les jouets chimiques ou avec
        des aimants par exemple, nécessitent une attention particulière.
      </p>

      <p>
        <strong>Lisez les avertissements et instructions</strong> : Ceux-ci doivent préciser :
      </p>

      <ul>
        <li>
          <p>Les dangers éventuels (étouffement, intoxication, etc.).</p>
        </li>
        <li>
          <p>
            Les recommandations pour une utilisation sous la surveillance d’un adulte, surtout pour les jouets aquatiques,
            chimiques ou électroniques.
          </p>
        </li>
      </ul>

      <p>
        <strong>Choisissez un</strong>{' '}
        <Link
          href="https://www.economie.gouv.fr/particuliers/acheter-en-ligne-en-toute-securite"
          target="_blank"
          rel="noopener"
        >
          <strong>site de confiance</strong>
        </Link>{' '}
        : <strong>si vous effectuez vos achats de jouets en ligne</strong>, privilégiez un site connu.
      </p>

      <p>
        Si vous identifiez un jouet dangereux ou non conforme, faites un signalement sur la plateforme <strong>Signal Conso</strong>.
      </p>

      <p>
        Pour en savoir plus et passer de bonnes fêtes de fin d’année, consultez notre{' '}
        <Link
          href="https://www.economie.gouv.fr/particuliers/choix-conseil-achat-jouets-securite-enfants"
          target="_blank"
          rel="noopener"
        >
          Guide sur la sécurité des jouets
        </Link>
        .
      </p>
    </div>
  );
}

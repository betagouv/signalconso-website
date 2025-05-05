import imgDPE from '@/img/actualites/dpe.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleArnaqueRenoEnergetique() {
  return (
    <div className="sc-article">
      <Image
        src={imgDPE}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        La rénovation énergétique séduit de plus en plus de foyers grâce aux aides publiques comme <strong>MaPrimeRénov’</strong>,
        les <strong>Certificats d’économies d’énergie (CEE)</strong> ou l’<strong>éco-prêt à taux zéro</strong>. Ces dispositifs,
        bien que précieux, sont parfois détournés par des entreprises peu scrupuleuses. Si vous avez été victime d’une{' '}
        <strong>arnaque liée à une aide à la rénovation</strong> ou si vous suspectez un <strong>abus de confiance</strong>, voici
        tout ce que vous devez savoir pour <strong>vous protéger</strong>.
      </p>
      <h2 className="text-2xl">Quels sont les risques d’arnaques avec les primes à la rénovation ?</h2>
      <p>
        Depuis la mise en place des aides comme{' '}
        <strong>
          <Link href="https://www.maprimerenov.gouv.fr" target="_blank" rel="noopener">
            MaPrimeRénov’
          </Link>
        </strong>
        , les signalements de fraudes se multiplient. Certaines entreprises ou démarcheurs peu honnêtes exploitent la
        méconnaissance des consommateurs. Les arnaques les plus fréquentes incluent :
      </p>
      <ul>
        <li>
          <strong>Promesses d’aides gonflées ou inexistantes</strong> ;
        </li>
        <li>
          <strong>Démarchage téléphonique interdit mais toujours pratiqué</strong> ;
        </li>
        <li>
          <strong>Contrats signés sous pression avec clause abusive</strong> ;
        </li>
        <li>
          <strong>Création frauduleuse de comptes MaPrimeRénov’ à votre nom</strong> ;
        </li>
        <li>
          <strong>Travaux non réalisés malgré un acompte versé</strong>.
        </li>
      </ul>
      <p>
        Pour vérifier les aides disponibles et éviter les intermédiaires douteux, consultez toujours le site officiel{' '}
        <Link href="https://mesaidesreno.beta.gouv.fr/aides" target="_blank" rel="noopener">
          MesAidesReno
        </Link>
        .
      </p>
      <h2 className="text-2xl">Vos droits en tant que consommateur</h2>
      <p>
        Quand vous entreprenez des <strong>travaux de rénovation énergétique</strong>, la loi vous protège. Voici vos principaux
        droits :
      </p>
      <h3 className="fr-h3">1. Droit à une information claire</h3>
      <p>
        L’entreprise doit vous informer en toute transparence sur les prix, les aides disponibles, les délais et les conditions de
        réalisation.
      </p>
      <h3 className="fr-h3">2. Droit de rétractation</h3>
      <p>
        Tout contrat signé à domicile ou hors établissement vous donne droit à <strong>14 jours pour vous rétracter</strong>.
      </p>
      <h3 className="fr-h3">3. Libre choix du professionnel</h3>
      <p>
        Aucune entreprise ne peut vous imposer un artisan ou vous faire croire que vous devez passer par elle pour bénéficier des
        aides.
      </p>
      <h3 className="fr-h3">4. Refus du démarchage téléphonique</h3>
      <p>
        Depuis 2020, <strong>le démarchage commercial pour la rénovation énergétique est interdit</strong>, sauf si vous avez
        expressément donné votre accord.
      </p>
      <h2 className="text-2xl">Comment éviter les pièges ?</h2>
      <p>
        Avant de signer ou de payer, adoptez ces <strong>bons réflexes</strong> :
      </p>
      <ul>
        <li>
          Vérifiez que l’entreprise est <strong>certifiée RGE</strong> (Reconnu Garant de l’Environnement) ;
        </li>
        <li>
          Comparez plusieurs devis via des sources sûres comme{' '}
          <Link href="https://france-renov.gouv.fr" target="_blank" rel="noopener">
            France Rénov’
          </Link>{' '}
          ;
        </li>
        <li>
          Ne donnez jamais vos <strong>identifiants fiscaux</strong> par téléphone ;
        </li>
        <li>
          Créez vous-même vos comptes pour les aides comme{' '}
          <Link href="https://www.maprimerenov.gouv.fr" target="_blank" rel="noopener">
            MaPrimeRénov’
          </Link>{' '}
          ;
        </li>
        <li>Lisez attentivement les contrats, notamment les petites lignes.</li>
      </ul>
      <p>
        Les aides à la rénovation énergétique sont un vrai coup de pouce… à condition d’être bien informé. Ne signez jamais dans
        la précipitation, méfiez-vous des promesses trop belles pour être vraies, et utilisez les sites officiels pour vérifier
        chaque étape. <strong>En cas de doute, signalez sur SignalConso.</strong>
      </p>
      <p>
        💡{' '}
        <strong>
          Vous avez un doute ? Consultez{' '}
          <Link href="https://france-renov.gouv.fr" target="_blank" rel="noopener">
            France Rénov’
          </Link>{' '}
          ou utilisez{' '}
          <Link href="https://mesaidesreno.beta.gouv.fr/aides" target="_blank" rel="noopener">
            MesAidesReno
          </Link>{' '}
          pour estimer vos droits en toute sécurité.
        </strong>
      </p>
    </div>
  )
}

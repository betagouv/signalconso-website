import imgJustice from '@/img/actualites/justice.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleCondamnationIndexia() {
  return (
    <div className="sc-article">
      <Image
        src={imgJustice}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Après un procès hors norme qui a duré sept jours, avec pas moins de 63 tomes de plaintes et plus de 2 500 victimes
        recensées, le tribunal judiciaire de Paris a condamné six sociétés du groupe INDEXIA pour pratiques commerciales
        trompeuses et obstacle à la justice.
      </p>
      <p>
        Les amendes infligées varient entre 150 000 et 1,5 million d’euros. L’ancien PDG du groupe, Sadri Fegaier, déclaré
        coupable des mêmes faits, a quant à lui été condamné à deux ans de prison dont 16 mois fermes et 300 000 euros d’amende.
      </p>
      <h2 className="fr-h2">Des pratiques abusives dans le viseur depuis 2018</h2>
      <p>
        Tout commence en 2018, lorsque les services de la DGCCRF (Direction générale de la concurrence, de la consommation et de
        la répression des fraudes) reçoivent des centaines de signalements de consommateurs victimes des pratiques d’INDEXIA. Une
        enquête approfondie est alors menée par le service national des enquêtes : perquisitions, auditions, et analyses pointent
        rapidement une stratégie déloyale bien rodée.
      </p>
      <p>
        Le groupe INDEXIA proposait, par exemple, des assurances liées à des téléphones ou appareils multimédia, souvent sans que
        les consommateurs en aient conscience ou qu’ils aient donné leur accord éclairé. Ces pratiques avaient déjà valu au
        groupe, en 2019, une amende de 10 millions d’euros, une obligation de rembourser les montants indûment prélevés et une
        communication publique sur les sanctions.
      </p>
      <p>
        Malgré cette première sanction, les pratiques du groupe ont continué, entraînant dès 2019 une nouvelle vague massive de
        signalements auprès de la DGCCRF, des associations de consommateurs, mais aussi des forces de l’ordre.
      </p>
      <p>
        La nouvelle enquête a révélé que les demandes de résiliation ou de remboursement des consommateurs étaient volontairement
        ignorées. Pire, les commerciaux faisaient croire aux clients que leurs requêtes étaient prises en charge, alors qu’il n’en
        était rien. Selon la présidente du tribunal correctionnel, l’objectif était clair : épuiser les consommateurs pour qu’ils
        finissent par abandonner leurs démarches.
      </p>
      <h2 className="fr-h2">Une stratégie commerciale déloyale orchestrée au plus haut niveau</h2>
      <p>
        Le tribunal a conclu que ces abus ne relevaient pas de simples erreurs individuelles, mais bien d’une stratégie globale
        orchestrée par le groupe. Sadri Fegaier, ancien PDG et figure centrale d’INDEXIA, a été désigné comme le principal
        responsable de ces pratiques.
      </p>
      <p>
        Les témoignages des victimes, très variés (étudiants, cadres, retraités, médecins…), ont souligné les conséquences
        catastrophiques de ces agissements : pertes financières importantes – parfois plusieurs milliers d’euros – et préjudices
        moraux durables.
      </p>
      <h2 className="fr-h2">Les sanctions</h2>
      <p>
        En plus de la condamnation de Sadri Fegaier, les six entreprises INDEXIA concernées (SFK Group, SFAM Celside Insurance,
        Foriou, Cyrana, Hubside, Serena) devront payer des amendes allant jusqu’à 1,5 million d’euros. Certaines d’entre elles
        font également face à :
      </p>
      <ul>
        <li>Une interdiction de démarcher ou de vendre des contrats d’abonnement pendant 5 ans,</li>
        <li>Une interdiction de gérer ou de prendre des participations dans d’autres entreprises sur la même période,</li>
        <li>La fermeture des établissements du groupe à Romans-sur-Isère.</li>
      </ul>
      <p>
        Cette affaire souligne l’importance pour chaque consommateur de connaître et d’exercer ses droits face aux pratiques
        abusives.
      </p>
      <p>
        Restez vigilant et <strong>pensez à signaler toute pratique suspecte ou irrégulière</strong> afin de protéger les autres
        consommateurs. <strong>Vos signalements sont une force essentielle</strong> pour améliorer les pratiques des entreprises.
      </p>
      <p>
        Pour en savoir plus, rendez-vous sur la fiche pratique
        <br />
        <Link
          href="https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/prelevements-bancaires-comment-vous-opposer-des-prelevements-indus"
          target="_blank"
          rel="noopener"
        >
          Prélèvements bancaires : comment vous opposer à des prélèvements indus ou frauduleux et obtenir un remboursement de
          votre banque ?
        </Link>
      </p>
    </div>
  )
}

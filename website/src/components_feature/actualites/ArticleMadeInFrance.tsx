import imgMadeInFrance from '@/img/actualites/madeInFrance.png'
import Image from 'next/image'
import Link from 'next/link'

export function ArticleMadeInFrance() {
  return (
    <div className="sc-article">
      <Image
        src={imgMadeInFrance}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        alt=""
      />

      <p>
        Avec l’engouement des consommateurs pour le “Made in France”, de nombreux professionnels valorisent l’origine nationale,
        régionale ou locale de leurs produits. Cependant, une enquête menée en 2023 par la DGCCRF révèle que certaines mentions
        d’origine sont trompeuses ou injustifiées, portant atteinte aux consommateurs et aux entreprises respectueuses des règles.
      </p>
      <h2 className="fr-h2">Une enquête approfondie sur 1 499 professionnels</h2>
      <p>
        En 2023, la DGCCRF a inspecté 1 499 professionnels, incluant des fabricants, importateurs et distributeurs, afin de
        contrôler l’usage des mentions d’origine des produits non alimentaires. Parmi les 1 499 professionnels inspectés, 239
        présentaient des irrégularités, soit un taux d’anomalie de 16 %.
      </p>
      <h2 className="fr-h2">Les infractions relevées concernent principalement :</h2>
      <ul>
        <li>L’utilisation de mentions d’origine injustifiées ou trompeuses,</li>
        <li>La présence de symboles induisant les consommateurs en erreur (drapeaux, logos tricolores, emblèmes nationaux),</li>
        <li>L’usage de labels ou marques commerciales sans autorisation.</li>
      </ul>
      <h2 className="fr-h2">Des secteurs particulièrement surveillés</h2>
      <p>
        Les contrôles ont porté sur des secteurs à forte production nationale ou relocalisée, notamment l’ameublement, les jouets,
        la literie, les cosmétiques et le textile. Une attention particulière a été accordée aux produits associés aux Jeux
        Olympiques et Paralympiques 2024.
      </p>
      <h2 className="fr-h2">Les sanctions appliquées</h2>
      <p>
        Face aux infractions constatées, la DGCCRF a pris des mesures fermes :<br />
        • 95 avertissements,
        <br />
        • 96 injonctions,
        <br />
        • 27 procès-verbaux pénaux,
        <br />
        • 1 procès-verbal administratif.
        <br />
        Ces sanctions ont souvent conduit les entreprises concernées à se mettre en conformité, notamment en modifiant ou
        supprimant les mentions et symboles trompeurs.
      </p>
      <h2 className="fr-h2">Comment réagir face à une mention trompeuse ?</h2>
      <p>
        Les consommateurs et professionnels soucieux du respect des règles peuvent jouer un rôle essentiel en signalant toute
        infraction constatée. Cette démarche permet aux autorités d’intervenir pour protéger les consommateurs et garantir une
        concurrence loyale entre les entreprises.
        <br />
        Si vous suspectez une mention trompeuse sur un produit, faites un signalement sur{' '}
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank" rel="noopener">
          SignalConso
        </Link>{' '}
        !
      </p>
    </div>
  )
}

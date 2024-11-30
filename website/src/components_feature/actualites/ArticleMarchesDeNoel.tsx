import Image from 'next/image'
import Link from 'next/link'
import marcheNoel from "@/img/actualites/marcheNoel.jpg";

export function ArticleMarchesDeNoel() {
  return (
    <div className="sc-article">
      <Image
        src={marcheNoel}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
          marginBottom : 5
        }}
        alt=""
      />

        <p>
          Les marchés de Noël regorgent de trésors : produits du terroir, artisanat local, créations made in France.
          Parcourir ces
          allées illuminées est un plaisir pour dénicher des cadeaux originaux ou se régaler. Mais comment faire des choix
          éclairés
          parmi ces étals ? Quels points méritent une attention particulière pour éviter les mauvaises surprises ? Voici
          quelques
          conseils pratiques pour acheter en toute confiance sur les marchés de Noël et profiter pleinement de cette
          tradition.
        </p>

      <p>
        Les marchés de Noël regorgent de trésors : produits du terroir, artisanat local, créations made in France.
        Parcourir ces
        allées illuminées est un plaisir pour dénicher des cadeaux originaux ou se régaler. Mais comment faire des choix
        éclairés
        parmi ces étals ? Quels points méritent une attention particulière pour éviter les mauvaises surprises ? Voici
        quelques
        conseils pratiques pour acheter en toute confiance sur les marchés de Noël et profiter pleinement de cette
        tradition.
      </p>

      <h3 id="Réglementation-des-marchés-de-Noël--Ce-qu’il-faut-savoir">
        Réglementation des marchés de Noël : Ce qu’il faut savoir
      </h3>

      <p>
        Les marchés de Noël sont soumis à des réglementations strictes pour garantir la sécurité des consommateurs et le
        respect
        des lois en vigueur. Voici ce qu’il faut retenir.
      </p>

      <p>
        <strong>Origine des produits</strong> : Pour les denrées alimentaires comme le miel ou l’huile d’olive,
        l’indication de
        l’origine est obligatoire. Pour les autres denrées, elle l’est seulement si son omission est de nature à créer
        une
        confusion dans l’esprit de l’acheteur.
      </p>

      <p>
        <strong>Labels et mentions</strong> : Pour éviter toute déconvenue, préférez les produits avec mention “Fabriqué
        en
        France” ou “Made in France” ou ceux bénéficiant de labels de qualité tels que AOP (Appellation d’Origine
        Protégée) ou
        AOC (Appellation d’Origine Contrôlée). Ces mentions garantissent un savoir-faire spécifique et une origine
        locale.
      </p>

      <p>
        <strong>Transparence</strong> : Les prix doivent être affichés clairement et l’origine des produits indiquée
        pour éviter
        les tromperies sur l’artisanat ou le caractère local des articles.
      </p>

      <p>
        <strong>Droit de rétractation</strong> : Sur les marchés de Noël, le droit de rétractation ne s’applique
        généralement pas
        pour les achats physiques. Les commerçants doivent toutefois informer les clients de cette règle via une
        pancarte.
      </p>

      <p>
        Si vous avez rencontré un problème avec un commerçant sur un stand de marché, vous pouvez faire un signalement
        sur{' '}
        <Link href="https://signal.conso.gouv.fr/" target="_blank" rel="noopener">
          SignalConso
        </Link>
        .
      </p>

      <p>
        Profitez des marchés de Noël sans mauvaises surprises et faites valoir vos droits en cas de problème !
      </p>
    </div>
  )
}
import {MemberCard} from 'components_feature/MemberCard/MemberCard'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {pageDefinitions} from 'core/pageDefinition'
import {team} from 'core/team'
import Head from 'next/head'
import Link from 'next/link'

// Avatars générés sur face.co

export const QuiSommesNous = () => {
  return (
    <>
      <Head>
        <title>{pageDefinitions.quiSommesNous.title}</title>
        <meta name="description" content={pageDefinitions.quiSommesNous.description} />
      </Head>
      <ContentPageContainer>
        <h1>Qui sommes-nous ?</h1>
        <div>
          <div>
            <h2>Notre structure</h2>
            <p>
              Nous sommes ce qu’on appelle une «&nbsp;Startup d’État&nbsp;». Il s’agit d’une petite équipe qui crée un service
              public numérique pour répondre à un problème qui touche les citoyens. Elle n’a pas pour objectif de faire du profit,
              mais de maximiser son impact social en répondant aux besoins des utilisateurs.
            </p>
            <p>
              Notre Startup d’État est rattachée à la{' '}
              <Link target="_blank" href="https://www.economie.gouv.fr/dgccrf">
                Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes
              </Link>{' '}
              (la DGCCRF, plus connue du grand public sous le terme «la répression des fraudes») dont la mission s'articule autour
              de trois axes :
            </p>
            <ul className="list-inside pl-6">
              <li>la régulation concurrentielle des marchés&nbsp;;</li>
              <li>la protection économique des consommateurs&nbsp;;</li>
              <li>la sécurité des consommateurs.</li>
            </ul>
          </div>

          <div className="">
            <h2>Notre façon de travailler</h2>
            <p>
              Un seul crédo : être au plus près des besoins des usagers&nbsp;! Pour ce faire, nous basons notre travail sur
              l’expérimentation. Une idée&nbsp;? Nous la testons&nbsp;!
            </p>
            <p>
              C’est pourquoi notre produit n’est pas figé mais en perpétuelle évolution. Nous rencontrons régulièrement des
              consommateurs pour tester l’ergonomie, le vocabulaire utilisé ou les réponses apportées.
            </p>

            <blockquote className="text-gray-500 pl-4 border-l-2 border-gray-300">
              <p>
                «&nbsp;Je n’ai pas échoué, j’ai juste trouvé 10.000 moyens qui ne fonctionnent pas.&nbsp;»
                <br />
                <span>— Thomas Edison</span>
              </p>
            </blockquote>
          </div>
          <h2>Notre équipe</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 fr-pb-4w">
            {team.current.map(_ => (
              <MemberCard key={_.avatar} member={_} />
            ))}
          </div>
          <h2>Anciens membres</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 fr-pb-4w">
            {team.former.map(_ => (
              <MemberCard key={_.avatar} member={_} disabled />
            ))}
          </div>
        </div>
      </ContentPageContainer>
    </>
  )
}

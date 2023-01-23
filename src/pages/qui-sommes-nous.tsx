import Head from 'next/head'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'components_simple/Page/Page'
import {MemberCard} from 'components_feature/MemberCard/MemberCard'
import {Grid} from '@mui/material'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import {team} from 'core/team'

// Avatars générés sur face.co

const QuiSommesNous = () => {
  return (
    <Page size="regular" className="blog">
      <Head>
        <title>{pageDefinitions.quiSommesNous.title}</title>
        <meta name="description" content={pageDefinitions.quiSommesNous.description} />
      </Head>
      <h1>Qui sommes-nous ?</h1>
      <Panel>
        <PanelBody>
          <h2>Notre structure</h2>
          <p>
            Nous sommes ce qu’on appelle une «&nbsp;<a href="https://beta.gouv.fr/apropos/">Startup d’État</a>&nbsp;». Il s’agit
            d’une petite équipe qui crée un service public numérique pour répondre à un problème qui touche les citoyens. Elle n’a
            pas pour objectif de faire du profit, mais de maximiser son impact social en répondant aux besoins des utilisateurs.
          </p>
          <p>
            Notre Startup d’État est rattachée à la{' '}
            <abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr> dont la
            mission s'articule autour de trois axes :
          </p>
          <ul>
            <li>la régulation concurrentielle des marchés&nbsp;;</li>
            <li>la protection économique des consommateurs&nbsp;;</li>
            <li>la sécurité des consommateurs.</li>
          </ul>

          <h2>Notre façon de travailler</h2>
          <p>
            Un seul crédo : être au plus près des besoins des usagers&nbsp;! Pour ce faire, nous basons notre travail sur
            l’expérimentation. Une idée&nbsp;? Nous la testons&nbsp;!
          </p>
          <p>
            C’est pourquoi notre produit n’est pas figé mais en perpétuelle évolution. Nous rencontrons régulièrement des
            consommateurs pour tester l’ergonomie, le vocabulaire utilisé ou les réponses apportées.
          </p>
          <blockquote>
            <p>
              «&nbsp;Je n’ai pas échoué, j’ai juste trouvé 10.000 moyens qui ne fonctionnent pas.&nbsp;»
              <br />
              <span>— Thomas Edison</span>
            </p>
          </blockquote>

          <h2>Notre équipe</h2>
          <div>
            <Grid container spacing={2}>
              {team.current.map(_ => (
                <Grid key={_.avatar} item xs={12} sm={6}>
                  <MemberCard key={_.avatar} member={_} />
                </Grid>
              ))}
              {team.former.map(_ => (
                <Grid key={_.avatar} item xs={12} sm={6}>
                  <MemberCard key={_.avatar} member={_} disabled />
                </Grid>
              ))}
            </Grid>
          </div>
        </PanelBody>
      </Panel>
    </Page>
  )
}

export default QuiSommesNous

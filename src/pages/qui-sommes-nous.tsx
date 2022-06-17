import Head from 'next/head'
import {Panel, PanelBody} from 'shared/Panel/Panel'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'
import {MemberCard} from 'feature/MemberCard/MemberCard'
import {Grid} from '@mui/material'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'

export interface Member {
  name: string
  role: string
  dgccrf?: boolean
  disabled?: boolean
  avatar: string
}

const members: Member[] = [
  {
    name: 'Guillaume Rossmann',
    role: 'Chef de produit',
    dgccrf: true,
    avatar: 'avatar-guillaumerossmann.png',
  },
  {
    name: 'Ingrid Godefroy',
    role: 'Chargée de déploiement',
    avatar: 'avatar-ingridgodefroy.png',
  },
  {
    name: 'Guillaume de Gérando',
    role: 'Chargé de déploiement',
    avatar: 'avatar-guillaumedegerando.png',
  },
  {
    name: 'Nathaniel Richand',
    role: "Coach Startup d'État",
    avatar: 'avatar-nathanielrichand.png',
  },
  {
    name: 'Saïd Sedoud',
    role: 'Développeur informatique',
    avatar: 'avatar-saidsedoud.png',
  },
  {
    name: 'Alexandre Annic',
    role: 'Développeur informatique',
    avatar: 'avatar-alexandreannic.png',
  },
  {
    name: 'Quentin Kurtz',
    role: 'Chargé de déploiement',
    avatar: 'avatar-quentinkurtz.png',
    disabled: true,
  },
  {
    name: 'Jérôme Rivals',
    role: 'Développeur informatique',
    avatar: 'avatar-jerome.png',
    disabled: true,
  },
  {
    name: 'Julien Rayneau',
    role: "Coach Startup d'État",
    avatar: 'avatar-julien.png',
    disabled: true,
  },
  {
    name: 'Magali Marcel',
    role: 'Chef de produit',
    dgccrf: true,
    disabled: true,
    avatar: 'avatar-magali.png',
  },
  {
    name: 'Valentine Michaud',
    role: 'Chargée de déploiement',
    avatar: 'avatar-valentine.png',
    disabled: true,
  },
  {
    name: 'Jules Garavelli',
    role: 'Chargé de déploiement',
    avatar: 'avatar-jules.png',
    disabled: true,
  },
  {
    name: 'Grégoire Aubert',
    role: 'Chargé de déploiement',
    avatar: 'avatar-gregoire.png',
    disabled: true,
  },
  {
    name: 'Agnès Mayanobe',
    role: 'Chargé de déploiement',
    avatar: 'avatar-agnes.png',
    dgccrf: true,
    disabled: true,
  },
  {
    name: 'Thomas Chaumeny',
    role: 'Développeur informatique',
    avatar: 'avatar-thomas.png',
    disabled: true,
  },
  {
    name: 'Pierre-Olivier Mauguet',
    role: 'Développeur informatique',
    avatar: 'avatar-pierre-olivier.png',
    disabled: true,
  },
  {
    name: 'Franck Coufourier',
    role: 'Développeur informatique',
    avatar: 'avatar-franck.png',
    disabled: true,
  },
  {
    name: 'Alexandre Michel',
    role: 'Chargé de déploiement',
    avatar: 'avatar-alexandre.png',
    disabled: true,
  },
]

const QuiSommesNous = () => {
  return (
    <Page size="small" className="blog">
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
              {members.map(_ => (
                <Grid key={_.avatar} item xs={12} sm={6}>
                  <MemberCard key={_.avatar} member={_} />
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

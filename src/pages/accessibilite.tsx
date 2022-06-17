import {Panel, PanelBody} from 'shared/Panel/Panel'
import {Page} from 'shared/Page/Page'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {externalLinks} from 'core/externalLinks'

const Accessibilite = () => {
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.accessibilite.title}</title>
        <meta name="description" content={pageDefinitions.accessibilite.description} />
      </Head>
      <h1>Déclaration d'accessibilité</h1>
      <Panel>
        <PanelBody>
          <p>
            Le ministère de l'Economie, des Finances et de la Relance s’engage à rendre son service accessible, conformément à
            l’article 47 de la loi n° 2005-102 du 11 février 2005.
          </p>
          <p>Cette déclaration d’accessibilité s’applique à SignalConso.</p>
          <h2>État de conformité</h2>
          <p>
            SignalConso est <b>partiellement conforme avec le RGAA 4.0</b>. Partiellement conforme veut dire que certaines
            sections du contenu ne sont pas entièrement conformes aux standards d'accessibilités.
          </p>
          <h2>Résultats des tests</h2>
          <p>L’audit de conformité réalisé par évaluation externe révèle que 78% des critères RGAA sont respectés.</p>
          <h2>Contenus non accessibles</h2>
          <p>Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes.</p>
          <h3>Non conformité</h3>
          Malgré nos efforts, certains contenus sont inaccessibles. Vous trouverez ci-dessous une liste des limitations connues et
          des solutions potentielles :
          <ul>
            <li>Statistiques mensuelles</li>
          </ul>
          <h3>Dérogations pour charge disproportionnée</h3>
          <p>
            La validité HTML ne peut être garantie sur l'ensemble des pages néanmoins à notre connaissance cela ne provoque aucun
            dysfonctionnement des aides techniques. La reprise et la vérification de toutes les pages du site représenteraient une
            charge de travail disproportionnée par rapport au gain attendu.
          </p>
          <p>
            Les vidéos n'ont pas d'audio description, sous-titres ou transcription textuelle. La cellule ayant en charge la mise
            en ligne de ces animations n'est pas en mesure actuellement de fournir ces éléments pour l'ensemble de ces vidéos.
          </p>
          <h2>Établissement de cette déclaration d'accessibilité</h2>
          <p>Cette déclaration a été établie le 4 Septembre 2020.</p>
          <h3>Technologies utilisées</h3>
          <p>L'accessibilité de SignalConso s'appuie sur les technologies suivantes :</p>
          <ul>
            <li>HTML</li>
            <li>WAI-ARIA</li>
            <li>JavaScript</li>
          </ul>
          <h3>Agents utilisateurs, technologies d’assistance et outils utilisés pour vérifier l’accessibilité</h3>
          <p>Les tests des pages web ont été effectués avec les combinaisons de navigateurs web et lecteurs d’écran suivants :</p>
          <ul>
            <li>Internet Explorer 11 et JAWS 2018</li>
            <li>Safari et VoiceOver sur Iphone</li>
          </ul>
          <h2>Pages du site ayant fait l'objet de la vérification de conformité</h2>
          <ol>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href={siteMap.quiSommesNous}>Qui sommes-nous ?</Link>
            </li>
            <li>
              <Link href={siteMap.commentCaMarche}>Comment ça marche ?</Link>
            </li>
            <li>
              <Link href={siteMap.stats}>Statistiques</Link>
            </li>
            <li>
              <Link href={siteMap.centreAide}>Centre d'aide</Link>
            </li>
            <li>Étape 1 - Le problème</li>
            <li>Étape 2 - La description</li>
            <li>Étape 3 - Le commerçant</li>
            <li>Étape 4 - Le consommateur</li>
            <li>Étape 5 - Confirmation</li>
            <li>
              <Link href={siteMap.connexion}>Connexion à l'espace pro</Link>
            </li>
            <li>Espace pro - Suivi des signalements</li>
            <li>Espace pro - Détail du signalements</li>
            <li>Espace pro - Mes entreprises</li>
            <li>Espace pro - Gestion des accès</li>
          </ol>
          <h2>Amélioration et contact</h2>
          <p>
            Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable de SignalConso pour
            être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
          </p>
          <ul>
            <li>E-mail : support@signal.conso.gouv.fr</li>
          </ul>
          <h2>Voie de recours</h2>
          <p>
            Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut
            d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de
            réponse satisfaisante.
          </p>
          <p>Vous pouvez :</p>
          <ul>
            <li>
              Écrire un message au <a href={externalLinks.defenseurDesDroits}>Défenseur des droits</a>
            </li>
            <li>
              Contacter <a href={externalLinks.defenseurDesDroitsDelegue}>le délégué du Défenseur des droits dans votre région</a>
            </li>
            <li>
              Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
              <br />
              Défenseur des droits
              <br />
              Libre réponse
              <br />
              71120 75342 Paris CEDEX 07
            </li>
          </ul>
        </PanelBody>
      </Panel>
    </Page>
  )
}

export default Accessibilite

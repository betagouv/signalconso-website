import Head from 'next/head'
import {pageDefinitions} from '../core/pageDefinition'
import {Page} from '../shared/Page/Page'
import {Alert} from 'mui-extension'

const Contact = () => {
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.contact.title}</title>
        <meta name="description" content={pageDefinitions.contact.description}/>
      </Head>

      <Alert type="info">Avant de nous écrire, vérifiez que vous utilisez le bon contact !</Alert>

      <h3>Vous avez rencontré un problème avec une entreprise et vous souhaitez le signaler ?</h3>
      <p>
        SignalConso est là pour ça ! Naviguez sur notre site et répondez simplement aux questions.
        <br/>
        <b>Ne nous envoyez pas votre signalement par email. Nous ne prenons aucun signalement par email ;).</b>
      </p>

      <h3>Vous avez une question sur vos droits en tant que consommateur ?</h3>

      <ul>
        <li>
          Retrouvez l’ensemble des&nbsp;
          <a
            href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques-de-la-concurrence-et-de-la-consom"
            target="_blank" rel="noreferrer">
            fiches pratiques
          </a>&nbsp;et&nbsp;
          <a href="https://www.economie.gouv.fr/dgccrf/foire-aux-questions-0" target="_blank" rel="noreferrer">foire aux questions</a>
          &nbsp;de la répression des fraudes (DGCCRF)
        </li>
        <li>Contactez la répression des fraudes (DGCCRF) :
          <ul>
            <li>
              <p>
                Appeler le service Allo Service Publique au 3939.
              </p>
              <p>
                Ce service est disponible du lundi au vendredi de 8h45 à 17h30 heures de métropole (0.15€ la minute +
                prix de l’appel).
              </p>
            </li>
            <li>
              <p>
                Vous êtes consommateur, vous rencontrez une difficulté suite à un acte d'achat ou vous avez une
                interrogation sur un point de droit avant d'acheter ou commander: vous pouvez obtenir une réponse par
                un agent de la DGCCRF en contactant le 0 809 540 550 DGCCRF-RéponseConso. Ce numéro d'appel est non
                surtaxé.
              </p>
              <p>
                Horaires d'ouverture du service :
              </p>
              <p>
                Les lundis de 8h30 à 12h30 et de 13h15 à 17h15 <br/>
                Les mardis de 8h30 à 12h30 et de 13h15 à 17h15<br/>
                Les mercredis de 13h15 à 17h15 <br/>
                Les jeudis de 8h30 à 12h30 <br/>
                Les vendredis de 8h30 à 16h. <br/>
              </p>
            </li>
          </ul>
        </li>
      </ul>

      <h3>Votre question concerne un problème technique rencontré sur SignalConso ?</h3>

      <p>
        Exemple : vous ne trouvez pas le SIRET de l’entreprise que vous voulez signaler, vous rencontrez un bug lors
        de la navigation sur le site, vous ne trouvez pas la bonne catégorie pour votre problème...
      </p>
      <p>
        Ecrivez-nous à&nbsp;
        <a
          href="mailto:support@signal.conso.gouv.fr?subject=incident"
          rel="noreferrer"
          target="_blank"
          title="Vous rencontrez un problème technique avec notre site ? Contactez-nous (ouverture de la messagerie par défaut)."
        >
          support@signal.conso.gouv.fr
        </a>.
        <br/>
        Notre équipe technique essayera de vous répondre le plus vite possible !
      </p>
    </Page>
  )
}

export default Contact

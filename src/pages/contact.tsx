import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'
import {Alert} from '../alexlibs/mui-extension'

const Contact = () => {
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.contact.title}</title>
        <meta name="description" content={pageDefinitions.contact.description} />
      </Head>

      <h1>Contact</h1>
      <Alert type="info">Avant de nous écrire, vérifiez que vous utilisez le bon contact !</Alert>

      <h3>Vous avez rencontré un problème avec une entreprise et vous souhaitez le signaler ?</h3>
      <p>
        SignalConso est là pour ça ! Naviguez sur notre site et répondez simplement aux questions.
        <br />
        <b>Ne nous envoyez pas votre signalement par email. Nous ne prenons aucun signalement par email ;).</b>
      </p>

      <h3>Votre question concerne un problème technique rencontré sur SignalConso ?</h3>

      <p>
        Exemple : vous ne trouvez pas le SIRET de l’entreprise que vous voulez signaler, vous rencontrez un bug lors de la
        navigation sur le site, vous ne trouvez pas la bonne catégorie pour votre problème...
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
        </a>
        .
        <br />
        <br />
        Cette adresse courriel n'est pas destinée au dépôt de votre signalement qui ne pourra alors être exploité. Tout
        signalement doit exclusivement être déposé en vous rendant sur la page d'accueil du site.
      </p>
    </Page>
  )
}

export default Contact

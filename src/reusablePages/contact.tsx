import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {titleAndDescriptions} from 'core/titleAndDescriptions'
import Head from 'next/head'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import Link from 'next/link'
import {BigReportButton} from 'components_simple/Buttons'

export const Contact = () => {
  return (
    <>
      <Head>
        <title>{titleAndDescriptions.contact.title}</title>
        <meta name="description" content={titleAndDescriptions.contact.description} />
      </Head>
      <ContentPageContainer>
        <h1>Contact</h1>
        <h2 className="fr-h4">Vous avez rencontré un problème avec une entreprise et vous souhaitez le signaler ?</h2>
        <p>SignalConso est là pour ça ! Cliquez sur ce bouton pour commencer, et répondez simplement aux questions :</p>
        <div className="text-center mb-6">
          <BigReportButton />
        </div>
        <h2 className="fr-h4">Votre question concerne un problème technique rencontré sur SignalConso ?</h2>

        <div>
          Par exemple :
          <ul>
            <li>Vous ne trouvez pas le SIRET de l’entreprise que vous voulez signaler</li>
            <li>Vous rencontrez un bug lors de la navigation sur le site</li>
            <li>Vous ne trouvez pas la bonne catégorie pour votre problème</li>
          </ul>
        </div>
        <div>
          Dans ce cas écrivez-nous par email à&nbsp;
          <Link
            href="mailto:support@signal.conso.gouv.fr?subject=incident"
            rel="noreferrer"
            title="Vous rencontrez un problème technique avec notre site ? Contactez-nous (ouverture de la messagerie par défaut)."
          >
            support@signal.conso.gouv.fr
          </Link>
          <Alert
            className="fr-mt-4w"
            severity="warning"
            description={
              <>
                Cette adresse courriel n'est pas destinée au dépôt de votre signalement, qui ne pourra alors être exploité. Tout
                signalement doit exclusivement être déposé en suivant le bouton "Je signale un problème" ci-dessus.
              </>
            }
            title="Ne nous envoyez pas votre signalement par email... il ne sera pas lu."
          />
        </div>
      </ContentPageContainer>
    </>
  )
}

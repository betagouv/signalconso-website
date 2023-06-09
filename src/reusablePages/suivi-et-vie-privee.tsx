import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {titleAndDescriptions} from 'core/titleAndDescriptions'
import {pagesDefs} from 'core/pagesDefinitions'
import Head from 'next/head'
import Link from 'next/link'
import {useI18n} from '../i18n/I18n'

export const SuiviEtViePrivee = () => {
  const {m} = useI18n()

  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.suiviEtViePrivee.title}</title>
        <meta name="description" content={m.titleAndDescriptions.suiviEtViePrivee.description} />
      </Head>
      <ContentPageContainer>
        <h1>{m.suiviEtViePrivee.suiviAudienceViePrivee}</h1>
        <h2 className="fr-h4">{m.suiviEtViePrivee.donneesPersonnelles}</h2>
        <p>
          {m.suiviEtViePrivee.infoRecueillies}
          <br />
          {m.suiviEtViePrivee.infoDemandees}
          <br />
          {m.suiviEtViePrivee.infoSignalement}
        </p>
        <p>
          {m.suiviEtViePrivee.declarationsObjetRetraitement}
          <a target="_blank" href="https://data.economie.gouv.fr">
            https://data.economie.gouv.fr
          </a>{' '}
          {m.suiviEtViePrivee.aFrequenceReguliere}
        </p>
        <p>
          {m.suiviEtViePrivee.utilisateurDroitAcces}
          <a
            href="mailto:support@signal.conso.gouv.fr"
            title="support@signal.conso.gouv.fr (ouverture de la messagerie par défaut)"
          >
            {m.suiviEtViePrivee.parEmail}
          </a>
        </p>
        <p>{m.suiviEtViePrivee.consultezInterfaceCnil}</p>

        <h2 className="fr-h4">{m.suiviEtViePrivee.droitAccesDonnees}</h2>
        <p>{m.suiviEtViePrivee.conformementRGPD}</p>
        <p>
          {m.suiviEtViePrivee.utilisateurDroitAccesEmail}
          <a href="mailto:support@signal.conso.gouv.fr">support@signal.conso.gouv.fr</a>.
        </p>
        <p>{m.suiviEtViePrivee.exercerDroitsQuestionTraitement}</p>
        <ul className="pl-8">
          <li>
            {m.suiviEtViePrivee.voiePostale}
            <br />
            <cite>
              {m.suiviEtViePrivee.referentProtectionDonnees1}
              <br />
              {m.suiviEtViePrivee.referentProtectionDonnees2}
              <br />
              {m.suiviEtViePrivee.referentProtectionDonnees3}
            </cite>
          </li>
          <li>
            {m.suiviEtViePrivee.voieElectronique}{' '}
            <a href="mailto:referent-pod@dgccrf.finances.gouv.fr">referent-pod@dgccrf.finances.gouv.fr</a>
          </li>
        </ul>
        <p>
          {m.suiviEtViePrivee.droitLimitationTraitement1}
          <a target="_blank" href="https://www.cnil.fr/">
            https://www.cnil.fr
          </a>
          {m.suiviEtViePrivee.droitLimitationTraitement2}
        </p>
        <p>
          {m.suiviEtViePrivee.droitIntroduireReclamation}
          <br />
          <cite>
            {m.suiviEtViePrivee.commissionNationaleInformatiqueLibertes1}
            <br />
            {m.suiviEtViePrivee.commissionNationaleInformatiqueLibertes2}
            <br />
            {m.suiviEtViePrivee.commissionNationaleInformatiqueLibertes3}
            <br />
          </cite>
        </p>
        <h2 className="fr-h4">{m.suiviEtViePrivee.cookiesDeposesOptOut}</h2>
        <p>{m.suiviEtViePrivee.interfaceEnLigneDeposeCookie}</p>

        <iframe
          className="optout"
          src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=#212529&fontSize=16px&fontFamily=Source%20Sans%20Pro"
        />
        <p>
          {m.suiviEtViePrivee.plusInfosGestionCookies}{' '}
          <Link href={pagesDefs.cookies.urlRelative}>{m.suiviEtViePrivee.gestionCookies}</Link>
        </p>
      </ContentPageContainer>
    </>
  )
}

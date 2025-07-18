import {ContentPageContainer} from '@/components_simple/PageContainers'
import {internalPageDefs, pagesDefs} from '@/core/pagesDefinitions'
import Head from 'next/head'
import Link from 'next/link'
import {useI18n} from '../i18n/I18n'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'
import {AppLang} from '../i18n/localization/AppLangs'

export function getMetadata(lang: AppLang): Metadata {
  const {messages: m} = getI18n(lang)

  return {
    title: m.titleAndDescriptions.suiviEtViePrivee.title,
    description: m.titleAndDescriptions.suiviEtViePrivee.description,
  }
}

export const SuiviEtViePrivee = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)

  return (
    <ContentPageContainer>
      <h1>{m.suiviEtViePrivee.suiviAudienceViePrivee}</h1>
      <h2 className="fr-h4">{m.suiviEtViePrivee.donneesPersonnellesTitre}</h2>
      <p>
        {m.suiviEtViePrivee.donneesPersonnelles1}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles2}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles3}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles4}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles5}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles6}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles7}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles8}
        <br />
        {m.suiviEtViePrivee.donneesPersonnelles9}
      </p>
      <p>
        {m.suiviEtViePrivee.declarationsObjetRetraitement}
        <a target="_blank" rel="noreferrer" href="https://data.economie.gouv.fr">
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
      <p>
        {m.suiviEtViePrivee.consultezInterfaceCnil1}
        <a target="_blank" rel="noreferrer" href="https://cnil.fr">
          cnil.fr
        </a>
        {m.suiviEtViePrivee.consultezInterfaceCnil2}
      </p>

      <h2 className="fr-h4">{m.suiviEtViePrivee.enqueteSatisfaction}</h2>
      <p>
        {m.suiviEtViePrivee.enqueteSatisfaction1}{' '}
        <a href={`/${params.lang}${internalPageDefs.consentementEnqueteSatisfaction.url}`} rel="noreferrer">
          {m.suiviEtViePrivee.enqueteSatisfaction2bis}
        </a>
        <br />
        <br />
        {m.suiviEtViePrivee.enqueteSatisfaction3}
        <br />
      </p>
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
        <a target="_blank" rel="noreferrer" href={`https://www.cnil.fr/${params.lang}`}>
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
        src={`https://stats.beta.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=${params.lang}&backgroundColor=&fontColor=#212529&fontSize=16px&fontFamily=Source%20Sans%20Pro`}
      />
      <p>
        {m.suiviEtViePrivee.plusInfosGestionCookies}{' '}
        <Link href={pagesDefs.cookies.urlRelative}>{m.suiviEtViePrivee.gestionCookies}</Link>
      </p>
    </ContentPageContainer>
  )
}

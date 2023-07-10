import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import Link from 'next/link'
import {pagesDefs} from '../core/pagesDefinitions'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'

export function getMetadata(): Metadata {
  const {messages: m} = getI18n('fr')

  return {
    title: m.titleAndDescriptions.cookies.title,
    description: m.titleAndDescriptions.cookies.description,
  }
}

export const Cookies = () => {
  const {messages: m} = getI18n('fr')

  return (
    <ContentPageContainer>
      <h1>{m.cookies.gestionTitre}</h1>
      <h2 className="fr-h4">{m.cookies.banniereTitre}</h2>
      <p>{m.cookies.banniereContenu}</p>
      <p>{m.cookies.respectLoiContenu}</p>
      {m.cookies.cookiesTechniquesTitre}
      <br />
      <p>{m.cookies.cookiesTechniquesContenu}</p>
      <h2 className="fr-h4">{m.cookies.definitionTitre}</h2>
      <p>{m.cookies.definition}</p>
      <h3 className="fr-h6">{m.cookies.natureTitre}</h3>
      <p>{m.cookies.natureContenu}</p>
      <h3 className="fr-h6">{m.cookies.listeTitre}</h3>
      <p>{m.cookies.listeDescription}</p>
      <table className="fr-table">
        <thead>
          <tr>
            <th>{m.cookies.nomCookie}</th>
            <th>{m.cookies.finalite}</th>
            <th>{m.cookies.dureeConservation}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>etuix</td>
            <td>{m.cookies.finaliteEulerian}</td>
            <td>{m.cookies.dureeConservationEulerian}</td>
          </tr>
          <tr>
            <td>_Pk_id</td>
            <td>{m.cookies.finaliteMatomo}</td>
            <td>{m.cookies.dureeConservationMatomo1}</td>
          </tr>
          <tr>
            <td>_Pk_ref</td>
            <td>{m.cookies.finaliteMatomo}</td>
            <td>{m.cookies.dureeConservationMatomo2}</td>
          </tr>
          <tr>
            <td>_Pk_session</td>
            <td>{m.cookies.finaliteMatomo}</td>
            <td>{m.cookies.dureeConservationMatomo3}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>{m.cookies.mieuxServirContenu}</p>
      <p>{m.cookies.donneesCollecteesContenu}</p>
      <p>
        {m.cookies.outilEulerian}(
        <Link target="_blank" href="https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience">
          {m.cookies.outilEulerianLink}
        </Link>
        ).
      </p>
      <p>{m.cookies.anonymisation}</p>
      <p>{m.cookies.cookiesEulerian}</p>
      <p>{m.cookies.outilMatomo}</p>
      <p>{m.cookies.cookiesMatomo}</p>
      <p>
        {m.cookies.renseignementsSuiviAudience}
        <Link href={pagesDefs.suiviEtViePrivee.urlRelative}>{m.cookies.renseignementsSuiviAudienceLink}</Link>
      </p>
      <h3 className="fr-h6">{m.cookies.accepterRefuserTitre}</h3>
      <p>{m.cookies.parametrerNavigateurContenu1}</p>
      <p>{m.cookies.parametrerNavigateurContenu2}</p>
      <ul>
        <li>
          <Link
            target="_blank"
            href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies"
          >
            {m.cookies.internetExplorer}
          </Link>
          <p>{m.cookies.internetExplorerInstructions}</p>
        </li>
        <li>
          <Link target="_blank" href="https://privacy.microsoft.com/fr-FR/windows-10-microsoft-edge-and-privacy">
            {m.cookies.edge}
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://support.google.com/chrome/answer/95647?hl=fr">
            {m.cookies.chrome}
          </Link>
          <p>{m.cookies.chromeInstructions}</p>
        </li>
        <li>
          <Link href="https://support.mozilla.org/fr/kb/empecher-sites-enregistrer-preferences?esab=a&s=blocking+cookies&r=2&as=s">
            {m.cookies.firefox}
          </Link>
          <p>{m.cookies.firefoxInstructions}</p>
        </li>
        <li>
          <Link target="_blank" href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac">
            {m.cookies.safari}
          </Link>
          <p>{m.cookies.safariInstructions}</p>
        </li>
      </ul>
      <p>
        {m.cookies.plusRenseignementsCNIL}
        <Link target="_blank" href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser">
          {m.cookies.plusRenseignementsCNILLink}
        </Link>
      </p>
    </ContentPageContainer>
  )
}

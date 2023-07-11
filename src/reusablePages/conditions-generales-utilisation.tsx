import {useState} from 'react'
import Head from 'next/head'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {useI18n} from '../i18n/I18n'

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const ConditionsGeneralesUtilisation = () => {
  const [activeTab, setActiveTab] = useState(0)
  const {m} = useI18n()
  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.conditionsGeneralesUtilisation.title}</title>
        <meta name="description" content={m.titleAndDescriptions.conditionsGeneralesUtilisation.description} />
      </Head>
      <ContentPageContainer>
        <h1>Conditions générales d'utilisation de l'interface en ligne SignalConso</h1>
        <Tabs
          tabs={[
            {label: 'Consommateur', iconId: 'fr-icon-user-line', content: <ConditionsGeneralesUtilisationConso />},
            {label: 'Professionnel', iconId: 'fr-icon-briefcase-line', content: <ConditionsGeneralesUtilisationPro />},
          ]}
        />
      </ContentPageContainer>
    </>
  )
}

function ConditionsGeneralesUtilisationConso() {
  const {m} = useI18n()
  return (
    <div>
      <p>{m.conditionsgeneralesconso.description}</p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.signalConsoTitle}</h2>
      <p>
        {m.conditionsgeneralesconso.signalConsoDescriptionPart1}
        <br />
        {m.conditionsgeneralesconso.signalConsoDescriptionPart2}
        <b>{m.conditionsgeneralesconso.appelUrgence}</b>
      </p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.servicePayantTitle}</h2>
      <p>{m.conditionsgeneralesconso.servicePayantDescription}</p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.signalerTitle}</h2>
      <p>{m.conditionsgeneralesconso.signalerDescription}</p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.traiteSignalementsTitle}</h2>
      <p>{m.conditionsgeneralesconso.traiteSignalementsDescription}</p>
      {m.conditionsgeneralesconso.signalementsVisibles}
      <ul>
        <li>{m.conditionsgeneralesconso.signalementsVisibleEntreprise}</li>
        <li>{m.conditionsgeneralesconso.signalementsVisibleDGCCRF}</li>
      </ul>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.anonymatTitle}</h2>
      <p>
        {m.conditionsgeneralesconso.anonymatDescriptionPart1}
        <br />
        {m.conditionsgeneralesconso.anonymatDescriptionPart2}
      </p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.suiviDossierTitle}</h2>
      <p>{m.conditionsgeneralesconso.suiviDossierDescription}</p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.risqueDenonciationTitle}</h2>
      <p>
        {m.conditionsgeneralesconso.risqueDenonciationDescription1}
        <br />
        {m.conditionsgeneralesconso.risqueDenonciationDescription2}
      </p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.traitementSignalementsAbusifsTitle}</h2>
      <p>{m.conditionsgeneralesconso.traitementSignalementsAbusifsDescription}</p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.mentionsLegalesTitle}</h2>
      <p>
        {m.conditionsgeneralesconso.mentionsLegalesDescriptionPart1}
        <br />
        {m.conditionsgeneralesconso.mentionsLegalesDescriptionPart2}
      </p>
      <h2 className="fr-h4">{m.conditionsgeneralesconso.proprieteIntellectuelleTitle}</h2>
      <p>{m.conditionsgeneralesconso.proprieteIntellectuelleDescription}</p>
    </div>
  )
}

function ConditionsGeneralesUtilisationPro() {
  const {m} = useI18n()
  return (
    <div>
      <p>{m.conditionsGeneralesUtilisationPro.intro}</p>

      <h2 className="fr-h4">{m.conditionsGeneralesUtilisationPro.gratuiteTitle}</h2>
      <p>
        {m.conditionsGeneralesUtilisationPro.gratuiteContent}
        <br />
        {m.conditionsGeneralesUtilisationPro.reclamationsContent1}
        <br />
        {m.conditionsGeneralesUtilisationPro.reclamationsContent2}&nbsp;
        <a
          href="https://www.economie.gouv.fr/dgccrf/coordonnees-des-DDPP-et-DDCSPP"
          target="_blank"
          rel="noreferrer"
          title={m.conditionsGeneralesUtilisationPro.coordonneesTitle}
        >
          {m.conditionsGeneralesUtilisationPro.coordonneesLink}
        </a>
      </p>

      <h2 className="fr-h4">{m.conditionsGeneralesUtilisationPro.objectionsTitle}</h2>
      <p>
        {m.conditionsGeneralesUtilisationPro.objectionsContent1}
        <br />
        {m.conditionsGeneralesUtilisationPro.objectionsContent2}
        <br />
        <b>{m.conditionsGeneralesUtilisationPro.objectionsReminder}</b>
      </p>

      <h2 className="fr-h4">{m.conditionsGeneralesUtilisationPro.contactTitle}</h2>
      <p>
        {m.conditionsGeneralesUtilisationPro.contactContent}
        <br />
        <b>
          {' '}
          {m.conditionsGeneralesUtilisationPro.contactProhibitions1}
          <br />
          {m.conditionsGeneralesUtilisationPro.contactProhibitions2}
        </b>
        <br />
        {m.conditionsGeneralesUtilisationPro.contactAbuse}
      </p>

      <h2 className="fr-h4">{m.conditionsGeneralesUtilisationPro.denonciationTitle}</h2>
      <p>
        {m.conditionsGeneralesUtilisationPro.denonciationContent}
        <br />
        <b>{m.conditionsGeneralesUtilisationPro.denonciationPunishment}</b>
      </p>

      <h2 className="fr-h4">{m.conditionsGeneralesUtilisationPro.mentionsLegalesTitle}</h2>
      <p>
        {m.conditionsGeneralesUtilisationPro.mentionsLegalesContent}
        <br />
        {m.conditionsGeneralesUtilisationPro.mentionsLegalesHebergeur}
      </p>

      <h2 className="fr-h4">{m.conditionsGeneralesUtilisationPro.proprieteIntellectuelleTitle}</h2>
      <p>{m.conditionsGeneralesUtilisationPro.proprieteIntellectuelleContent}</p>
    </div>
  )
}

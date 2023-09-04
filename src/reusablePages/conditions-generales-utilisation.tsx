import Head from 'next/head'
import {ContentPageContainer} from 'components_simple/PageContainers'
import {Tabs} from '@codegouvfr/react-dsfr/Tabs'
import {getI18n} from '../i18n/I18nDictionnary'
import {Metadata} from 'next'
import {AppLang} from '../i18n/localization/AppLangs'

export function getMetadata(lang: AppLang): Metadata {
  const {messages} = getI18n(lang)

  return {
    title: messages.titleAndDescriptions.conditionsGeneralesUtilisation.title,
    description: messages.titleAndDescriptions.conditionsGeneralesUtilisation.description,
    robots: {
      index: false,
    },
  }
}

export const ConditionsGeneralesUtilisation = ({params}: any) => {
  const {messages} = getI18n(params.lang)
  return (
    <ContentPageContainer>
      <h1>{messages.titleAndDescriptions.conditionsGeneralesUtilisation.title}</h1>
      <Tabs
        tabs={[
          {
            label: (
              <>
                <span className="max-md:hidden">{messages.centreaide.tab1}</span>
                <span className="md:hidden">{messages.centreaide.tab1}</span>
              </>
            ),
            iconId: 'fr-icon-user-line',
            content: <ConditionsGeneralesUtilisationConso lang={params.lang} />,
          },
          {
            label: (
              <>
                <span className="max-md:hidden">{messages.centreaide.tab2}</span>
                <span className="md:hidden">Pro</span>
              </>
            ),
            iconId: 'fr-icon-briefcase-line',
            content: <ConditionsGeneralesUtilisationPro lang={params.lang} />,
          },
        ]}
      />
    </ContentPageContainer>
  )
}

function ConditionsGeneralesUtilisationConso(params: any) {
  const {messages: m} = getI18n(params.lang)
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

function ConditionsGeneralesUtilisationPro(params: any) {
  const {messages: m} = getI18n(params.lang)
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

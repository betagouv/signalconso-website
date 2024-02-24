import {ContentPageContainer} from '@/components_simple/PageContainers'
import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import {ReactNode} from 'react'
import {getI18n} from '../i18n/I18nDictionnary'
import {ScAlert} from '@/components_simple/ScAlert'

function Accordions({children}: {children: ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export const RefundTelecom = ({params}: any) => {
  const {messages: m} = getI18n(params.lang)

  return (
    <ContentPageContainer>
      <h1>{m.refundTelecom.demarcheTitle}</h1>
      <Accordions>
        {/* Step 1 */}
        <Accordion label={m.refundTelecom.step1Title}>
          <h3 className="fr-h6">{m.refundTelecom.step1When}</h3>
          <p>
            {m.refundTelecom.step1WhenDesc1}
            <br />
            {m.refundTelecom.step1WhenDesc2}
          </p>

          <h3 className="fr-h6">{m.refundTelecom.step1ToWhom}</h3>
          <p>
            {m.refundTelecom.step1ToWhomDesc1}
            <br />
            {m.refundTelecom.step1ToWhomDesc2}
          </p>

          <h3 className="fr-h6">{m.refundTelecom.step1How}</h3>
          <p>{m.refundTelecom.step1HowDesc}</p>
          <ul>
            <li>
              <a
                href={`/${params.lang}/docs/ModeleLettreLitige.txt`}
                rel="noreferrer"
                target="_blank"
                title={m.litige.step1.downloadTitle}
                download="ModeleLettreLitige.txt"
              >
                {m.litige.step1.templateText}
              </a>
            </li>
            <li>{m.refundTelecom.step1Attachment2}</li>
          </ul>
          <p>{m.refundTelecom.step1KeepCopy}</p>

          <h3 className="fr-h6">{m.refundTelecom.step1Why}</h3>
          <p>{m.refundTelecom.step1WhyDesc}</p>
        </Accordion>

        {/* Step 2 */}
        <Accordion label={m.refundTelecom.step2Title}>
          <h3 className="fr-h6">{m.refundTelecom.step2When}</h3>
          <div className={'mb-4'}>
            {m.refundTelecom.step2WhenDesc}
            <br />
            <br />
            <ScAlert type="warning">
              <div className="mb-0">{m.refundTelecom.step2WhenDescWarn}</div>
            </ScAlert>
          </div>

          <h3 className="fr-h6">{m.refundTelecom.step2Who}</h3>
          <p>{m.refundTelecom.step2WhoDesc}</p>
          <p>{m.refundTelecom.step2WhoDesc2}</p>
          <p>{m.refundTelecom.step2WhoDesc3}</p>

          <h3 className="fr-h6">{m.refundTelecom.step2How}</h3>
          <div>
            {m.refundTelecom.step2HowDesc}
            <a href="https://www.mediation-telecom.org/saisir-le-mediateur" target="_blank" rel="noreferrer">
              https://www.mediation-telecom.org/saisir-le-mediateur
            </a>
            <br />
            <br />
            {m.refundTelecom.step2OrDesc}
            <br />
            <br />
            <div className="flex flex-col items-center font-bold">
              Médiatrice des Communications Électroniques
              <br />
              CS 30 342
              <br />
              94257 GENTILLY Cedex
            </div>
          </div>

          <h3 className="fr-h6">{m.refundTelecom.step2Why}</h3>
          <p>{m.refundTelecom.step2WhyDesc}</p>

          <h3 className="fr-h6">{m.refundTelecom.step2Cost}</h3>
          <p>{m.refundTelecom.step2CostDesc}</p>

          <h3 className="fr-h6">{m.refundTelecom.step2NoMediatorFound}</h3>
          <p>
            {m.refundTelecom.step2NoMediatorFoundDesc}
            <a href="https://conciliateurs.fr" target="_blank" rel="noreferrer">
              conciliateurs.fr
            </a>
            <br />
            {m.refundTelecom.step2NoMediatorFoundDesc2}
          </p>
        </Accordion>
      </Accordions>
      {/* Additional CallOut can be added here if needed */}
    </ContentPageContainer>
  )
}

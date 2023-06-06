import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import {Icon} from '@mui/material'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {externalLinks} from 'core/externalLinks'
import Head from 'next/head'
import {ReactNode} from 'react'
import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import {useI18n} from '../i18n/I18n'

function Accordions({children}: {children: ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export const Litige = () => {
  const {m} = useI18n()

  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.contractualDispute.title}</title>
        <meta name="description" content={m.titleAndDescriptions.contractualDispute.description} />
      </Head>
      <ContentPageContainer>
        <h1>{m.litige.title}</h1>
        <Accordions>
          <Accordion label={m.litige.step1.label}>
            <h3 className="fr-h6">{m.litige.step1.when}</h3>
            <p>
              {m.litige.step1.whenDescription1}
              <br />
              {m.litige.step1.whenDescription2}
            </p>

            <h3 className="fr-h6">{m.litige.step1.toWhom}</h3>
            <p>
              {m.litige.step1.toWhomDescription1}
              <br />
              {m.litige.step1.toWhomDescription2}
            </p>

            <h3 className="fr-h6">{m.litige.step1.how}</h3>
            <p>{m.litige.step1.howDescription}</p>
            <ul>
              <li>
                <a
                  href="/docs/ModeleLettreLitige.txt"
                  rel="noreferrer"
                  target="_blank"
                  title={m.litige.step1.downloadTitle}
                  download="ModeleLettreLitige.txt"
                >
                  <Icon fontSize="small" sx={{verticalAlign: 'middle', mr: 1}}>
                    download
                  </Icon>
                  {m.litige.step1.templateText}
                </a>
              </li>
              <li>{m.litige.step1.signalementText}</li>
            </ul>
            <p>{m.litige.step1.keepCopy}</p>

            <h3 className="fr-h6">{m.litige.step1.why}</h3>
            <p>{m.litige.step1.whyDescription}</p>
          </Accordion>
          <Accordion label={m.litige.step2.label}>
            <h3 className="fr-h6">{m.litige.step2.when}</h3>
            <p>{m.litige.step2.whenDescription}</p>

            <h3 className="fr-h6">{m.litige.step2.who}</h3>
            <p>{m.litige.step2.whoDescription}</p>

            <h3 className="fr-h6">{m.litige.step2.how}</h3>
            <p>{m.litige.step2.howDescription}</p>

            <h3 className="fr-h6">{m.litige.step2.why}</h3>
            <p>{m.litige.step2.whyDescription}</p>

            <h3 className="fr-h6">{m.litige.step2.cost}</h3>
            <p>{m.litige.step2.costDescription}</p>

            <h3 className="fr-h6">{m.litige.step2.whatIfNoMediator}</h3>
            <p>
              {m.litige.step2.whatIfNoMediatorDescription1}
              <br />
              {m.litige.step2.whatIfNoMediatorDescription2}
              <a href={externalLinks.conciliateur} target="_blank" rel="noreferrer" title={m.litige.step2.newWindow}>
                conciliateurs.fr
              </a>
              .
              <br />
              {m.litige.step2.whatIfNoMediatorDescription3}
              <br />
              {m.litige.step2.whatIfNoMediatorDescription4}
            </p>
          </Accordion>
          <Accordion label={m.litige.step3.label}>
            <Alert small className="fr-mt-1w fr-mb-2w" severity="warning" description={m.litige.step3.warning} />

            <h3 className="fr-h6">{m.litige.step3.when}</h3>
            <p>{m.litige.step3.whenDescription}</p>

            <h3 className="fr-h6">{m.litige.step3.how}</h3>
            <div>
              <p>
                {m.litige.step3.howConsultPage}
                <a href={externalLinks.vosDroits} target="_blank" rel="noreferrer" title={m.litige.step3.newWindow}>
                  {externalLinks.vosDroits}
                </a>
              </p>
            </div>

            <h3 className="fr-h6">{m.litige.step3.why}</h3>
            <p>{m.litige.step3.whyDescription}</p>

            <h3 className="fr-h6">{m.litige.step3.cost}</h3>
            <p>{m.litige.step3.costDescription}</p>
          </Accordion>
        </Accordions>
        <CallOut className="fr-mt-4w fr-mb-4w" iconId="ri-information-line" title={m.litige.callOut.associationCallOutTitle}>
          <>
            {m.litige.callOut.associationCallOutDescription1}
            <br />
            <br /> {m.litige.callOut.associationCallOutDescription2}
            <br />
            <br />
            {m.litige.callOut.associationListTitle}
            <a href={externalLinks.associationConso} target="_blank" rel="noreferrer">
              {externalLinks.associationConso}
            </a>
          </>
        </CallOut>
      </ContentPageContainer>
    </>
  )
}

export default Litige

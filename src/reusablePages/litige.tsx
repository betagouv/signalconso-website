import {ContentPageContainer} from '@/components_simple/PageContainers'
import {ScAlert} from '@/components_simple/ScAlert'
import {externalLinks} from '@/core/externalLinks'
import {PageComponentProps} from '@/core/metadatas'
import {pagesDefs} from '@/core/pagesDefinitions'
import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import Link from 'next/link'
import {ReactNode} from 'react'
import {getI18n} from '../i18n/I18nDictionnary'

function Accordions({children}: {children: ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export function Litige(props: PageComponentProps) {
  return <LitigeCommon {...props} variant="regular" />
}

export function LitigeTelecom(props: PageComponentProps) {
  return <LitigeCommon {...props} variant="telecom" />
}

const urlMediateurTelecom = 'https://www.mediation-telecom.org/saisir-le-mediateur'

function LitigeCommon(props: PageComponentProps & {variant: 'telecom' | 'regular'}) {
  const {variant} = props
  const {lang} = props.params
  const {messages: m} = getI18n(lang)
  const isTelecom = variant === 'telecom'
  return (
    <ContentPageContainer>
      {isTelecom ? (
        <>
          <h1 className="mb-2">{m.litige.title}</h1>
          <p className="!text-scbluefrance fr-h4">{m.litige.subtitle}</p>
          <div className="block mb-6 lg:mb-0 lg:grid grid-cols-5 gap-4 ">
            <div className="col-span-3">
              <p>{m.litige.leadText1Telecom}</p>
              <p>{m.litige.leadText2}</p>
            </div>
            <div className="col-span-2">
              <ScAlert type="info">
                <p className="mb-0">
                  {m.litige.wrongPageHelpTelecom.text1}
                  <Link href={`/${lang}${pagesDefs.litige.url}`}>{m.litige.wrongPageHelpTelecom.link}</Link>
                  {m.litige.wrongPageHelpTelecom.text2}
                </p>
              </ScAlert>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>{m.litige.title}</h1>
          <div className="block mb-6 lg:mb-0 lg:grid grid-cols-5 gap-4 ">
            <div className="col-span-3">
              <p>{m.litige.leadText1}</p>
              <p>{m.litige.leadText2}</p>
            </div>
            <div className="col-span-2">
              <ScAlert type="info">
                <p className="mb-0">
                  <>
                    {m.litige.wrongPageHelp.text1}
                    <Link href={`/${lang}${pagesDefs.litigeTelecom.url}`}>{m.litige.wrongPageHelp.link}</Link>.
                  </>
                </p>
              </ScAlert>
            </div>
          </div>
        </>
      )}

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
                href={`/${lang}/docs/ModeleLettreLitige.txt`}
                rel="noreferrer"
                target="_blank"
                title={m.litige.step1.downloadTitle}
                download="ModeleLettreLitige.txt"
              >
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
          <p>{isTelecom ? m.litige.step2.whenDescriptionTelecom : m.litige.step2.whenDescription}</p>
          <h3 className="fr-h6">{m.litige.step2.who}</h3>
          <p>{m.litige.step2.whoDescription}</p>
          {isTelecom && <p dangerouslySetInnerHTML={{__html: m.litige.step2.whoDescriptionTelecom}} />}
          <h3 className="fr-h6">{m.litige.step2.how}</h3>

          {isTelecom ? (
            <>
              <p>
                {m.litige.step2.howDescriptionTelecom.text1}
                <Link href={urlMediateurTelecom} target="_blank">
                  {urlMediateurTelecom}
                </Link>
              </p>
              <p>{m.litige.step2.howDescriptionTelecom.text2}</p>
              <p className="flex flex-col items-center font-bold">
                {' '}
                Médiatrice des Communications Électroniques
                <br />
                CS 30 342
                <br />
                94257 GENTILLY Cedex
              </p>
            </>
          ) : (
            <>
              <p>{m.litige.step2.howDescription}</p>
            </>
          )}
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
  )
}

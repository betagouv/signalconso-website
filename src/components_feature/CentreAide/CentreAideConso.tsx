import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import {Box, BoxProps} from '@mui/material'
import {externalLinks} from 'core/externalLinks'
import {pagesDefs} from 'core/pagesDefinitions'
import Link from 'next/link'
import {ReactNode} from 'react'
import {useI18n} from '../../i18n/I18n'

function Title({children}: {children: ReactNode}) {
  return <h2 className="mb-4 mt-8 font-normal text-2xl">{children}</h2>
}

function Accordions({children}: {children: ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export const CentreAideConso = (props: BoxProps) => {
  const {m} = useI18n()

  return (
    <Box {...props}>
      <Title>{m.centreaideconso.generalTitle}</Title>
      <Accordions>
        <Accordion label={m.centreaideconso.howSignalConsoWorks}>
          {m.centreaideconso.howSignalConsoWorksContent}
          <Link href={pagesDefs.commentCaMarche.urlRelative}>{m.centreaideconso.howSignalConsoWorksLink}</Link>.
        </Accordion>
      </Accordions>

      <Title>{m.centreaideconso.reportIssueTitle}</Title>
      <Accordions>
        <Accordion label={m.centreaideconso.wrongCategory}>
          {m.centreaideconso.wrongCategoryContent1}
          <br />
          {m.centreaideconso.wrongCategoryContent2}
        </Accordion>
        <Accordion label={m.centreaideconso.difficultyCompletingForm}>
          {m.centreaideconso.difficultyCompletingFormContent1}
          <br /> {m.centreaideconso.difficultyCompletingFormContent2}
          <ul className="space-y-2 pl-0">
            <li className="list-none">
              <b>{m.centreaideconso.difficultyCompletingFormContent3}</b>
              <br />
              {m.centreaideconso.difficultyCompletingFormContent4}
              <br />
              {m.centreaideconso.difficultyCompletingFormContent5}
            </li>
            <li className="list-none">
              <b>{m.centreaideconso.difficultyCompletingFormContent6}</b>
              <br />
              {m.centreaideconso.difficultyCompletingFormContent7}
              <br />
              {m.centreaideconso.difficultyCompletingFormContent8}
              <br />
              <a href={externalLinks.dgccrfCoordonnees} target="_blank" rel="noreferrer">
                {externalLinks.dgccrfCoordonnees}
              </a>
            </li>
            <li className="list-none">
              <b>{m.centreaideconso.difficultyCompletingFormContent9}</b>
              <br />
              {m.centreaideconso.difficultyCompletingFormContent10}
              <br />
              {m.centreaideconso.difficultyCompletingFormContent11}
            </li>
          </ul>
        </Accordion>
        <Accordion label={m.centreaideconso.errorOnSendOrNext}>
          <ul>
            <li> {m.centreaideconso.errorOnSendOrNextContent1}</li>
            <li> {m.centreaideconso.errorOnSendOrNextContent2}</li>
          </ul>
          <p> {m.centreaideconso.errorOnSendOrNextContent3}</p>
        </Accordion>
      </Accordions>

      <Title>{m.centreaideconso.reportedIssueTitle}</Title>
      <Accordions>
        <Accordion label={m.centreaideconso.noUpdateSinceReport}>
          <p dangerouslySetInnerHTML={{__html: m.centreaideconso.noUpdateSinceReportContent1}} />
          <p>{m.centreaideconso.noUpdateSinceReportContent2}</p>
          <ul>
            <li>{m.centreaideconso.noUpdateSinceReportContent3}</li>
            <li>{m.centreaideconso.noUpdateSinceReportContent4}</li>
            <li> {m.centreaideconso.noUpdateSinceReportContent5}</li>
          </ul>
          <p>
            {m.centreaideconso.noUpdateSinceReportContent6}
            <br />
            {m.centreaideconso.noUpdateSinceReportContent7}
          </p>
          <p>{m.centreaideconso.noUpdateSinceReportContent8}</p>
        </Accordion>
        <Accordion label={m.centreaideconso.howToGetRefund}>
          <p>
            {m.centreaideconso.howToGetRefundContent1}
            <br />
            {m.centreaideconso.howToGetRefundContent2}
          </p>
          <p>
            {m.centreaideconso.howToGetRefundContent3}
            <br />
            {m.centreaideconso.howToGetRefundContent4}
            <br /> {m.centreaideconso.howToGetRefundContent5}
            <Link href={pagesDefs.litige.urlRelative} rel="noreferrer">
              {m.centreaideconso.howToGetRefundContent6}
            </Link>
          </p>
        </Accordion>
        <Accordion label={m.centreaideconso.modifyOrDeleteReport}>
          <p>
            {m.centreaideconso.modifyOrDeleteReportContent1}
            <Link href={pagesDefs.contact.urlRelative}>{m.centreaideconso.modifyOrDeleteReportContent2}</Link>.
          </p>
        </Accordion>
      </Accordions>

      <Title>{m.centreaideconso.askQuestionToFraudRepression}</Title>
      <Accordions>
        <Accordion label={m.centreaideconso.cantFindWhereToAsk}>
          <p>{m.centreaideconso.cantFindWhereToAskContent1}</p>
          <img
            src="/image/reponse_conso_button.png"
            alt="Bouton question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
          <p>{m.centreaideconso.cantFindWhereToAskContent2}</p>
        </Accordion>
        <Accordion label={m.centreaideconso.whereToEnterQuestion}>
          <p>{m.centreaideconso.whereToEnterQuestionContent}</p>
          <img
            src="/image/reponse_conso_question.png"
            alt="Question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
        </Accordion>
        <Accordion label={m.centreaideconso.errorOnSendOrNextQuestion}>
          <ul>
            <li>{m.centreaideconso.errorOnSendOrNextQuestionContent1}</li>
            <li>{m.centreaideconso.errorOnSendOrNextQuestionContent2}</li>
          </ul>
          <p>{m.centreaideconso.errorOnSendOrNextQuestionContent3}</p>
        </Accordion>
      </Accordions>

      <Title>{m.centreaideconso.askedQuestionToFraudRepression}</Title>
      <Accordions>
        <Accordion label={m.centreaideconso.noResponseReceived}>
          <p>{m.centreaideconso.noResponseReceivedContent}</p>
        </Accordion>
        <Accordion label={m.centreaideconso.urgentRequest}>
          <p>{m.centreaideconso.urgentRequestContent}</p>
        </Accordion>
        <Accordion label={m.centreaideconso.foundAnswerAndWantToCancel}>
          <p>{m.centreaideconso.foundAnswerAndWantToCancelContent}</p>
        </Accordion>
      </Accordions>
    </Box>
  )
}

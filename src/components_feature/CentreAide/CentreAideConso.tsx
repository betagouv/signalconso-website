'use client'

import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import {Box, BoxProps} from '@mui/material'
import {externalLinks} from 'core/externalLinks'
import {pagesDefs} from 'core/pagesDefinitions'
import Link from 'next/link'
import {ReactNode} from 'react'
import {getI18n} from '../../i18n/I18nDictionnary'
import {useI18n} from '../../i18n/I18n'

function Title({children}: {children: ReactNode}) {
  return <h2 className="mb-4 mt-8 font-normal text-2xl">{children}</h2>
}

function Accordions({children}: {children: ReactNode}) {
  return <div className="fr-accordions-group">{children}</div>
}

export const CentreAideConso = (props: BoxProps) => {
  const {m: messages} = useI18n()

  return (
    <Box {...props}>
      <Title>{messages.centreaideconso.generalTitle}</Title>
      <Accordions>
        <Accordion label={messages.centreaideconso.howSignalConsoWorks}>
          {messages.centreaideconso.howSignalConsoWorksContent}
          <Link href={pagesDefs.commentCaMarche.urlRelative}>{messages.centreaideconso.howSignalConsoWorksLink}</Link>.
        </Accordion>
      </Accordions>

      <Title>{messages.centreaideconso.reportIssueTitle}</Title>
      <Accordions>
        <Accordion label={messages.centreaideconso.wrongCategory}>
          {messages.centreaideconso.wrongCategoryContent1}
          <br />
          {messages.centreaideconso.wrongCategoryContent2}
        </Accordion>
        <Accordion label={messages.centreaideconso.difficultyCompletingForm}>
          {messages.centreaideconso.difficultyCompletingFormContent1}
          <br /> {messages.centreaideconso.difficultyCompletingFormContent2}
          <ul className="space-y-2 pl-0">
            <li className="list-none">
              <b>{messages.centreaideconso.difficultyCompletingFormContent3}</b>
              <br />
              {messages.centreaideconso.difficultyCompletingFormContent4}
              <br />
              {messages.centreaideconso.difficultyCompletingFormContent5}
            </li>
            <li className="list-none">
              <b>{messages.centreaideconso.difficultyCompletingFormContent6}</b>
              <br />
              {messages.centreaideconso.difficultyCompletingFormContent7}
              <br />
              {messages.centreaideconso.difficultyCompletingFormContent8}
              <br />
              <a href={externalLinks.dgccrfCoordonnees} target="_blank" rel="noreferrer">
                {externalLinks.dgccrfCoordonnees}
              </a>
            </li>
            <li className="list-none">
              <b>{messages.centreaideconso.difficultyCompletingFormContent9}</b>
              <br />
              {messages.centreaideconso.difficultyCompletingFormContent10}
              <br />
              {messages.centreaideconso.difficultyCompletingFormContent11}
            </li>
          </ul>
        </Accordion>
        <Accordion label={messages.centreaideconso.errorOnSendOrNext}>
          <ul>
            <li> {messages.centreaideconso.errorOnSendOrNextContent1}</li>
            <li> {messages.centreaideconso.errorOnSendOrNextContent2}</li>
          </ul>
          <p> {messages.centreaideconso.errorOnSendOrNextContent3}</p>
        </Accordion>
      </Accordions>

      <Title>{messages.centreaideconso.reportedIssueTitle}</Title>
      <Accordions>
        <Accordion label={messages.centreaideconso.noUpdateSinceReport}>
          <p dangerouslySetInnerHTML={{__html: messages.centreaideconso.noUpdateSinceReportContent1}} />
          <p>{messages.centreaideconso.noUpdateSinceReportContent2}</p>
          <ul>
            <li>{messages.centreaideconso.noUpdateSinceReportContent3}</li>
            <li>{messages.centreaideconso.noUpdateSinceReportContent4}</li>
            <li> {messages.centreaideconso.noUpdateSinceReportContent5}</li>
          </ul>
          <p>
            {messages.centreaideconso.noUpdateSinceReportContent6}
            <br />
            {messages.centreaideconso.noUpdateSinceReportContent7}
          </p>
          <p>{messages.centreaideconso.noUpdateSinceReportContent8}</p>
        </Accordion>
        <Accordion label={messages.centreaideconso.howToGetRefund}>
          <p>
            {messages.centreaideconso.howToGetRefundContent1}
            <br />
            {messages.centreaideconso.howToGetRefundContent2}
          </p>
          <p>
            {messages.centreaideconso.howToGetRefundContent3}
            <br />
            {messages.centreaideconso.howToGetRefundContent4}
            <br /> {messages.centreaideconso.howToGetRefundContent5}
            <Link href={pagesDefs.litige.urlRelative} rel="noreferrer">
              {messages.centreaideconso.howToGetRefundContent6}
            </Link>
          </p>
        </Accordion>
        <Accordion label={messages.centreaideconso.modifyOrDeleteReport}>
          <p>
            {messages.centreaideconso.modifyOrDeleteReportContent1}
            <Link href={pagesDefs.contact.urlRelative}>{messages.centreaideconso.modifyOrDeleteReportContent2}</Link>.
          </p>
        </Accordion>
      </Accordions>

      <Title>{messages.centreaideconso.askQuestionToFraudRepression}</Title>
      <Accordions>
        <Accordion label={messages.centreaideconso.cantFindWhereToAsk}>
          <p>{messages.centreaideconso.cantFindWhereToAskContent1}</p>
          <img
            src="/image/reponse_conso_button.png"
            alt="Bouton question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
          <p>{messages.centreaideconso.cantFindWhereToAskContent2}</p>
        </Accordion>
        <Accordion label={messages.centreaideconso.whereToEnterQuestion}>
          <p>{messages.centreaideconso.whereToEnterQuestionContent}</p>
          <img
            src="/image/reponse_conso_question.png"
            alt="Question DGCCRF"
            style={{width: '100%', marginTop: 4, marginBottom: 4}}
          />
        </Accordion>
        <Accordion label={messages.centreaideconso.errorOnSendOrNextQuestion}>
          <ul>
            <li>{messages.centreaideconso.errorOnSendOrNextQuestionContent1}</li>
            <li>{messages.centreaideconso.errorOnSendOrNextQuestionContent2}</li>
          </ul>
          <p>{messages.centreaideconso.errorOnSendOrNextQuestionContent3}</p>
        </Accordion>
      </Accordions>

      <Title>{messages.centreaideconso.askedQuestionToFraudRepression}</Title>
      <Accordions>
        <Accordion label={messages.centreaideconso.noResponseReceived}>
          <p>{messages.centreaideconso.noResponseReceivedContent}</p>
        </Accordion>
        <Accordion label={messages.centreaideconso.urgentRequest}>
          <p>{messages.centreaideconso.urgentRequestContent}</p>
        </Accordion>
        <Accordion label={messages.centreaideconso.foundAnswerAndWantToCancel}>
          <p>{messages.centreaideconso.foundAnswerAndWantToCancelContent}</p>
        </Accordion>
      </Accordions>
    </Box>
  )
}

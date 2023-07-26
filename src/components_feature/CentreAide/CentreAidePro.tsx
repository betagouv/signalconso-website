'use client'
import {Accordion} from '@codegouvfr/react-dsfr/Accordion'
import {Box, BoxProps} from '@mui/material'
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

export const CentreAidePro = (props: BoxProps) => {
  const {m} = useI18n()

  return (
    <Box {...props}>
      <Title>{m.centreaidepro.generalitesTitle}</Title>
      <Accordions>
        <Accordion label={m.centreaidepro.gratuitLabel}>
          <p>
            {m.centreaidepro.gratuitText1}
            <br />
            {m.centreaidepro.gratuitText2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.accesLabel}>
          <p>
            {m.centreaidepro.accesText1}
            <br />
            {m.centreaidepro.accesText2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.entrepriseSignaleeLabel}>
          <p>
            {m.centreaidepro.entrepriseSignaleeText1}
            <br />
            {m.centreaidepro.entrepriseSignaleeText2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.espaceProfessionnelLabel}>
          <p>{m.centreaidepro.espaceProfessionnelText}</p>
        </Accordion>
        <Accordion label={m.centreaidepro.consulterRepondreLabel}>
          <p>
            {m.centreaidepro.consulterRepondreText1}
            <br />
            {m.centreaidepro.consulterRepondreText2}
          </p>
        </Accordion>
      </Accordions>
      <Title>{m.centreaidepro.entrepriseSignaleeTitle}</Title>
      <Accordions>
        <Accordion label={m.centreaidepro.queFaireLabel}>
          <p>
            {m.centreaidepro.courrierSignalConsoText1}
            <Link href={pagesDefs.index.url}>https://signal.conso.gouv.fr</Link>
            {m.centreaidepro.courrierSignalConsoText2}
            <Link href={pagesDefs.connexion.url}>{pagesDefs.connexion.url}</Link>
          </p>
          {m.centreaidepro.courrierSignalConsoText3}
          <ul>
            <li>{m.centreaidepro.courrierSignalConsoText4}</li>
            <li>{m.centreaidepro.courrierSignalConsoText5}</li>
            <li>{m.centreaidepro.courrierSignalConsoText6}</li>
          </ul>
          <p>{m.centreaidepro.courrierSignalConsoText7}</p>
          <p style={{textAlign: 'center'}}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/iQLmRZW8SIk"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
          <p>
            <b>{m.centreaidepro.courrierSignalConsoText8}</b>
          </p>
          <p>
            {m.centreaidepro.courrierSignalConsoText9}"
            <Link href={pagesDefs.connexion.url}>{m.centreaidepro.courrierSignalConsoText10}</Link>"
          </p>
          {m.centreaidepro.consulterSignalementsText}
          <ul>
            <li>{m.centreaidepro.prendreMesuresText}</li>
            <li>{m.centreaidepro.contacterConsommateurText}</li>
          </ul>
          <p className="text-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Zohajsmkz1I"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
          <p className="text-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/up9Elzn-P7o"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.motDePasseOublieLabel}>
          <p>
            {m.centreaidepro.motDePasseOublieText1}
            <Link href={pagesDefs.lostPassword.url}>{m.centreaidepro.motDePasseOublieText2}</Link>
            {m.centreaidepro.motDePasseOublieText3}
            <a
              href="mailto:support@signal.conso.gouv.fr"
              target="_blank"
              rel="noreferrer"
              title="support@signal.conso.gouv.fr (ouverture de la messagerie par défaut)"
            >
              support@signal.conso.gouv.fr
            </a>
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.controleSuiteSignalementLabel}>
          <p>
            {m.centreaidepro.controleSuiteSignalementText1}
            <br />
            {m.centreaidepro.controleSuiteSignalementText2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.communicationConsommateurLabel}>
          <p>
            {m.centreaidepro.communicationConsommateurText1}
            <br />
            {m.centreaidepro.communicationConsommateurText2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.detailsActionsCorrectivesLabel}>
          <p>{m.centreaidepro.detailsActionsCorrectivesText}</p>
        </Accordion>
        <Accordion label={m.centreaidepro.informationsSignalementLabel}>
          <p>{m.centreaidepro.informationsSignalementText1}</p>
          <ul>
            <li>
              <strong>{m.centreaidepro.typeSignalementLabel}</strong>
              <div>{m.centreaidepro.typeSignalementText}</div>
            </li>
            <li>
              <strong>{m.centreaidepro.detailsLabel}</strong>
              <div>{m.centreaidepro.detailsText}</div>
            </li>
            <li>
              <strong>{m.centreaidepro.consommateurLabel}</strong>
              <div>{m.centreaidepro.consommateurText}</div>
            </li>
          </ul>
        </Accordion>
        <Accordion label={m.centreaidepro.statutsSignalement}>
          <p>{m.centreaidepro.statutsSignalementDescription}</p>
          <ul>
            <li>
              <strong>{m.centreaidepro.nonConsulte}:</strong> {m.centreaidepro.nonConsulteDescription}
            </li>
            <li>
              <strong>{m.centreaidepro.aRepondre}:</strong> {m.centreaidepro.aRepondreDescription}
            </li>
            <li>
              <strong>{m.centreaidepro.cloture}:</strong> {m.centreaidepro.clotureDescription}
            </li>
          </ul>
          <p>{m.centreaidepro.filtrerListe}</p>
        </Accordion>
        <Accordion label={m.centreaidepro.reponsePossible}>
          <p>{m.centreaidepro.reponsePossibleDescription}</p>
          <ul>
            <li>{m.centreaidepro.prendreEnCompte}</li>
            <li>{m.centreaidepro.estimeInfonde}</li>
            <li>{m.centreaidepro.estimeNonConcerne}</li>
          </ul>
          <p>
            {m.centreaidepro.explicationReponse1}
            <br />
            {m.centreaidepro.explicationReponse2}
          </p>
          <p>{m.centreaidepro.explicationReponse3}</p>
        </Accordion>
        <Accordion label={m.centreaidepro.courrierPendantConges}>
          <p>{m.centreaidepro.courrierPendantCongesDescription}</p>
          <ul>
            <li>
              <strong>{m.centreaidepro.relanceCourrier}:</strong> {m.centreaidepro.relanceCourrierDescription1}
              <br />
              {m.centreaidepro.relanceCourrierDescription2}
            </li>
            <li>
              <strong>{m.centreaidepro.relanceMail}:</strong> {m.centreaidepro.relanceMailDescription}
            </li>
          </ul>
        </Accordion>
        <Accordion label={m.centreaidepro.signalementCloture}>
          <p>
            {m.centreaidepro.signalementClotureDescription1}
            <br />
            {m.centreaidepro.signalementClotureDescription2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.plusieursAcces}>
          <p>
            {m.centreaidepro.plusieursAccesDescription1}
            <br />
            {m.centreaidepro.plusieursAccesDescription2}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.suiviSignalements}>
          <p>{m.centreaidepro.suiviSignalementsDescription}</p>
          <p className="text-center">
            <iframe
              src="https://www.youtube-nocookie.com/embed/tEzRx6eU474"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </p>
          <p>
            <b>{m.centreaidepro.nouvelleFonctionnaliteTitle}</b>
            <br />
            {m.centreaidepro.nouvelleFonctionnalite}
          </p>
        </Accordion>
        <Accordion label={m.centreaidepro.gererNotifications}>
          {m.centreaidepro.gererNotificationsDescription1}
          <br />
          <br />
          {m.centreaidepro.gererNotificationsDescription2}
          <br />
          <br />
          {m.centreaidepro.gererNotificationsDescription3}
        </Accordion>
      </Accordions>
    </Box>
  )
}

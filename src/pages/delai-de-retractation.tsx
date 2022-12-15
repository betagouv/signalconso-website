import {Icon} from '@mui/material'
import {Txt} from 'alexlibs/mui-extension/Txt/Txt'
import {dateToFrenchFormat} from 'utils/utils'
import {pageDefinitions} from 'core/pageDefinition'
import {COLOR_DARK_BLUE, COLOR_LIGHT_BLUE} from 'core/theme'
import Head from 'next/head'
import {ReactNode, useMemo, useState} from 'react'
import {SimpleDatepicker} from 'components_simple/Datepicker/SimpleDatepicker'
import {Page} from 'components_simple/Page/Page'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'

const closingDays = [
  {day: 1, month: 0},
  {day: 1, month: 4},
  {day: 8, month: 4},
  {day: 14, month: 6},
  {day: 15, month: 7},
  {day: 1, month: 10},
  {day: 11, month: 10},
  {day: 25, month: 11},
]

function calculRetractationDeadline(contractDate: Date) {
  let deadline = new Date()
  deadline.setDate(contractDate.getDate() + 14)
  while (isClosingDate(deadline)) {
    deadline.setDate(deadline.getDate() + 1)
  }
  return deadline
}

function isClosingDate(date: Date) {
  const isSunday = date.getDay() === 6
  const isSaturday = date.getDay() === 0
  const isClosingDay = closingDays.find(_ => _.day === date.getDate() && _.month === date.getMonth()) !== undefined
  return isSunday || isSaturday || isClosingDay
}

// This page needs to OK lookin, but the H1/H2 in the theme can't be touched without breaking other pages in various ways
const NiceH1 = ({children}: {children: ReactNode}) => (
  <h1 style={{fontWeight: 'bold', color: COLOR_DARK_BLUE, fontSize: '3rem'}}>{children}</h1>
)

const NiceH2 = ({children}: {children: ReactNode}) => <h2 style={{fontWeight: 'bold', color: COLOR_LIGHT_BLUE}}>{children}</h2>

const DelaiDeRetractation = () => {
  const [contractDate, setContractDate] = useState<Date | undefined>()
  const deadlineDate = useMemo(() => (contractDate ? calculRetractationDeadline(contractDate) : undefined), [contractDate])
  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.delaiRetractation.title}</title>
        <meta name="description" content={pageDefinitions.delaiRetractation.description} />
      </Head>
      <NiceH1>Délai de rétractation</NiceH1>
      <Panel>
        <PanelBody>
          <NiceH2>Calculez votre date limite de rétractation</NiceH2>
          <p>Date de départ :</p>
          <SimpleDatepicker value={contractDate} onChange={setContractDate} limited />
          {deadlineDate && (
            <div style={{marginTop: '20px', textAlign: 'left'}}>
              <Icon color="secondary" sx={{verticalAlign: 'middle', fontSize: '2rem', lineHeight: '26px'}}>
                arrow_forward
              </Icon>
              <span style={{marginLeft: '4px', fontSize: '1.2rem'}}>
                Vous avez jusqu'au <span style={{fontWeight: 'bold'}}>{dateToFrenchFormat(deadlineDate)}</span> pour changer
                d'avis.
              </span>
            </div>
          )}

          <NiceH2>Quelle est la date de départ à prendre en compte ?</NiceH2>
          <table>
            <thead>
              <tr>
                <th>Type de contrat</th>
                <th>Date à prendre en compte</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contrat de prestation de services</td>
                <td>Date de conclusion du contrat</td>
              </tr>
              <tr>
                <td>Contrats portant sur la fourniture d'eau, de gaz ou d'électricité</td>
                <td>Date de conclusion du contrat</td>
              </tr>
              <tr>
                <td>Produits livrés</td>
                <td>Date de livraison</td>
              </tr>
              <tr>
                <td>Produits livrés en plusieurs paquets</td>
                <td>Date de réception du dernier bien, lot ou pièce reçu</td>
              </tr>
            </tbody>
          </table>
          <NiceH2>Vous avez 14 jours pour changer d'avis</NiceH2>
          <p>Vous n'avez pas à vous justifier auprès de l'entreprise</p>
          <p>
            Il faut renvoyer{' '}
            <Txt bolder span>
              par lettre recommandée avec accusé de réception
            </Txt>{' '}
            le formulaire de rétractation ou une lettre écrite dans un délai de 14 jours. <br />
            Vous pouvez aussi le faire en ligne lorsque le vendeur dispose d'un site internet et qu'il a prévu cette possibilité
            (vous ne devez pas renvoyer seulement le colis).
            <br />
            Un signalement sur notre site ne suffit pas pour demander la rétractation.
          </p>
          <p>
            Vous devez conserver toutes les pièces justifiant que vous avez fait les démarches dans les délais.
            <br />
            C'est pourquoi il est important de préférer un courrier avec accusé de réception.
          </p>
          <p>
            Si le vendeur ne vous a pas informé de votre droit de rétractation, le délai est prolongé de 12 mois à partir de la
            fin du délai initial de rétractation.
            <br />
            Mais si cette information vous est fournie pendant cette prolongation, le délai est de nouveau de 14 jours. Il
            commence à la date où vous recevez l'information.
          </p>
        </PanelBody>
      </Panel>
    </Page>
  )
}

export default DelaiDeRetractation

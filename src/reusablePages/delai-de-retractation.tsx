import {Icon} from '@mui/material'
import {Txt} from 'alexlibs/mui-extension/Txt/Txt'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {SimpleDatepicker} from 'components_simple/Datepicker/SimpleDatepicker'
import {titleAndDescriptions} from 'core/titleAndDescriptions'
import Head from 'next/head'
import {useMemo, useState} from 'react'
import {dateToFrenchFormat} from 'utils/utils'

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

const DelaiDeRetractation = () => {
  const [contractDate, setContractDate] = useState<Date | undefined>()
  const deadlineDate = useMemo(() => (contractDate ? calculRetractationDeadline(contractDate) : undefined), [contractDate])
  return (
    <>
      <Head>
        <title>{titleAndDescriptions.delaiRetractation.title}</title>
        <meta name="description" content={titleAndDescriptions.delaiRetractation.description} />
      </Head>
      <ContentPageContainer>
        <h1>Délai de rétractation</h1>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">Calculez votre date limite de rétractation</h2>
          <span>Date de départ :</span>
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
        </section>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">Quelle est la date de départ à prendre en compte ?</h2>
          <table className="fr-table">
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
        </section>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">Vous avez 14 jours pour changer d'avis</h2>
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
        </section>
      </ContentPageContainer>
    </>
  )
}

export default DelaiDeRetractation

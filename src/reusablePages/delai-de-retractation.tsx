import {Icon} from '@mui/material'
import {Txt} from 'alexlibs/mui-extension/Txt/Txt'
import {ContentPageContainer} from 'components_simple/ContentPageContainer'
import {SimpleDatepicker} from 'components_simple/Datepicker/SimpleDatepicker'
import Head from 'next/head'
import {useMemo, useState} from 'react'
import {dateToFrenchFormat} from 'utils/utils'
import {useI18n} from '../i18n/I18n'

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
  const {m} = useI18n()

  return (
    <>
      <Head>
        <title>{m.titleAndDescriptions.delaiRetractation.title}</title>
        <meta name="description" content={m.titleAndDescriptions.delaiRetractation.description} />
      </Head>
      <ContentPageContainer>
        <h1>{m.delaiRetractation.pageTitle}</h1>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">{m.delaiRetractation.calculationSectionTitle}</h2>
          <span>{m.delaiRetractation.startDateLabel}</span>
          <SimpleDatepicker value={contractDate} onChange={setContractDate} limited />
          {deadlineDate && (
            <div style={{marginTop: '20px', textAlign: 'left'}}>
              <Icon color="secondary" sx={{verticalAlign: 'middle', fontSize: '2rem', lineHeight: '26px'}}>
                arrow_forward
              </Icon>
              <span style={{marginLeft: '4px', fontSize: '1.2rem'}}>
                {m.delaiRetractation.deadlineMessagePrefix}{' '}
                <span style={{fontWeight: 'bold'}}>{dateToFrenchFormat(deadlineDate)}</span>{' '}
                {m.delaiRetractation.deadlineMessageSuffix}
              </span>
            </div>
          )}
        </section>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">{m.delaiRetractation.startDateExplanationTitle}</h2>
          <table className="fr-table">
            <thead>
              <tr>
                <th>{m.delaiRetractation.contractTypeHeader}</th>
                <th>{m.delaiRetractation.dateToConsiderHeader}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{m.delaiRetractation.serviceContract}</td>
                <td>{m.delaiRetractation.contractConclusionDate}</td>
              </tr>
              <tr>
                <td>{m.delaiRetractation.waterGasElectricityContract}</td>
                <td>{m.delaiRetractation.contractConclusionDate}</td>
              </tr>
              <tr>
                <td>{m.delaiRetractation.deliveredProducts}</td>
                <td>{m.delaiRetractation.deliveryDate}</td>
              </tr>
              <tr>
                <td>{m.delaiRetractation.deliveredProductsMultiplePackages}</td>
                <td>{m.delaiRetractation.receptionDateLastItem}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="fr-pb-4w">
          <h2 className="fr-h4">{m.delaiRetractation.changeOfMindTitle}</h2>
          <p>{m.delaiRetractation.justificationNotRequired}</p>
          <p>
            {m.delaiRetractation.returnFormOrLetter}{' '}
            <Txt bolder span>
              {m.delaiRetractation.recommendedLetterWithAcknowledgment}
            </Txt>{' '}
            {m.delaiRetractation.withinFourteenDays}.
            <br />
            {m.delaiRetractation.canAlsoDoItOnline} {m.delaiRetractation.websiteRequirement}.
            <br />
            {m.delaiRetractation.reportingOnWebsiteNotSufficient}
          </p>
          <p>
            {m.delaiRetractation.keepDocumentation1}
            <br />
            {m.delaiRetractation.keepDocumentation2}
          </p>
          <p>
            {m.delaiRetractation.ifSellerDidNotInform}.
            <br />
            {m.delaiRetractation.extensionOfTwelveMonths}.
          </p>
        </section>
      </ContentPageContainer>
    </>
  )
}

export default DelaiDeRetractation

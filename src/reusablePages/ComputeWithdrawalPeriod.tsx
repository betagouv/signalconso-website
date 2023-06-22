'use client'

import {Icon} from '@mui/material'
import {SimpleDatepicker} from 'components_simple/Datepicker/SimpleDatepicker'
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

const ComputeWithdrawalPeriod = () => {
  const [contractDate, setContractDate] = useState<Date | undefined>()
  const deadlineDate = useMemo(() => (contractDate ? calculRetractationDeadline(contractDate) : undefined), [contractDate])
  const {m} = useI18n()

  return (
    <>
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
    </>
  )
}

export default ComputeWithdrawalPeriod

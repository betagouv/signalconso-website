'use client'

import {ScDatepicker} from '@/components_simple/formInputs/ScDatepicker'
import {dateToFrenchFormat} from '@/utils/utils'
import {useForm} from 'react-hook-form'
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
  const deadline = new Date(contractDate.getTime())
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

type Form = {
  contractDate: string | undefined
}

const ComputeWithdrawalPeriod = () => {
  const {
    register,
    watch,
    formState: {errors},
  } = useForm<Form>()
  const {m} = useI18n()
  const contractDateStr = watch('contractDate')
  const contractDate = contractDateStr && contractDateStr.length > 0 ? new Date(contractDateStr) : undefined
  const deadlineDate = contractDate ? calculRetractationDeadline(contractDate) : undefined
  return (
    <>
      <h2 className="fr-h4">{m.delaiRetractation.calculationSectionTitle}</h2>
      <ScDatepicker
        {...register('contractDate')}
        label={m.delaiRetractation.startDateLabel}
        min={'1970-01-01'}
        max={'2050-01-01'}
        error={!!errors.contractDate}
        required={false}
      />
      {deadlineDate && (
        <div className="mt-7">
          <i className="ri-arrow-right-line text-scbluefrance" />
          <span style={{marginLeft: '4px', fontSize: '1.2rem'}}>
            {m.delaiRetractation.deadlineMessagePrefix}{' '}
            <span className="font-bold text-scbluefrance">{dateToFrenchFormat(deadlineDate)}</span>{' '}
            {m.delaiRetractation.deadlineMessageSuffix}
          </span>
        </div>
      )}
    </>
  )
}

export default ComputeWithdrawalPeriod

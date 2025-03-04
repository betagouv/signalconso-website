import {getWipCompanyKindFromSelected, hasStep0, hasSubcategoryIndexes} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useEffect} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemSelect} from './ProblemSelect'

export function ProblemEmployeeConsumer({children}: {children: ReactNode}) {
  const {m} = useI18n()
  const {report: r, setEmployeeConsumer} = useReportFlowContext()
  if (!hasStep0(r) || !hasSubcategoryIndexes(r)) {
    throw new Error('Draft is not ready to ask for employeeConsumer')
  }
  const companyKind = getWipCompanyKindFromSelected(r)
  const predeterminedEmployeeConsumer = companyKind === 'SOCIAL' ? false : undefined
  const skipQuestion = useApplyPredeterminedValue({
    predeterminedEmployeeConsumer,
    setEmployeeConsumer,
  })
  const isDone = r.step1?.employeeConsumer !== undefined
  return (
    <>
      {!skipQuestion && (
        <>
          <ProblemSelect
            id="select-employeeconsumer"
            title={m.problemDoYouWorkInCompany}
            value={r.step1?.employeeConsumer}
            onChange={setEmployeeConsumer}
            options={[
              {
                title: m.problemDoYouWorkInCompanyNo,
                value: false,
              },
              {
                title: m.yes,
                value: true,
              },
            ]}
          />
        </>
      )}
      {isDone && children}
    </>
  )
}

function useApplyPredeterminedValue({
  predeterminedEmployeeConsumer,
  setEmployeeConsumer,
}: {
  predeterminedEmployeeConsumer: boolean | undefined
  setEmployeeConsumer: (_: boolean) => void
}) {
  useEffect(() => {
    if (predeterminedEmployeeConsumer !== undefined) {
      setEmployeeConsumer(predeterminedEmployeeConsumer)
    }
  }, [setEmployeeConsumer, predeterminedEmployeeConsumer])
  const shouldSkipQuestion = predeterminedEmployeeConsumer !== undefined
  return shouldSkipQuestion
}

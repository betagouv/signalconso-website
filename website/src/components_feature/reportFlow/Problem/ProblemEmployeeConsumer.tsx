import {hasStep0, hasSubcategoryIndexes, shouldAskIfEmployeeConsumer} from '@/feature/reportUtils'
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
  const shouldAsk = shouldAskIfEmployeeConsumer(r)
  useEffect(() => {
    if (!shouldAsk) {
      setEmployeeConsumer(false)
    }
  }, [shouldAsk, setEmployeeConsumer])
  const isDone = r.step1?.employeeConsumer !== undefined
  return (
    <>
      {shouldAsk && (
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

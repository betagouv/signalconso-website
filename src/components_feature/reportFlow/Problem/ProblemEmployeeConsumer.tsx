import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {getWipCompanyKindFromSelected, hasStep0} from '@/feature/reportDraftUtils'
import {useI18n} from '@/i18n/I18n'
import {ReactNode, useEffect} from 'react'
import {SetReportDraft, useReportFlowContext} from '../ReportFlowContext'
import {ProblemSelect} from './ProblemSelect'

export function ProblemEmployeeConsumer({children}: {children: () => ReactNode}) {
  const {m} = useI18n()
  const {reportDraft: r, setReportDraft} = useReportFlowContext()
  if (!hasStep0(r)) {
    throw new Error('Draft is not ready to ask for employeeConsumer')
  }
  const companyKind = getWipCompanyKindFromSelected(r)
  const predeterminedEmployeeConsumer = companyKind === 'SOCIAL' ? false : undefined
  const skipQuestion = useApplyPredeterminedValue({predeterminedEmployeeConsumer, setReportDraft})
  const isDone = r.employeeConsumer !== undefined
  return (
    <>
      {!skipQuestion && (
        <>
          <ProblemSelect
            id="select-employeeconsumer"
            title={m.problemDoYouWorkInCompany}
            value={r.employeeConsumer}
            onChange={employeeConsumer => setReportDraft(_ => ({..._, employeeConsumer}))}
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
          {r.employeeConsumer && (
            <FriendlyHelpText>
              <p className="mb-0" dangerouslySetInnerHTML={{__html: m.employeeConsumerInformation}} />
            </FriendlyHelpText>
          )}
        </>
      )}
      {isDone && children()}
    </>
  )
}

function useApplyPredeterminedValue({
  predeterminedEmployeeConsumer,
  setReportDraft,
}: {
  predeterminedEmployeeConsumer: boolean | undefined
  setReportDraft: SetReportDraft
}) {
  useEffect(() => {
    if (predeterminedEmployeeConsumer !== undefined) {
      setReportDraft(_ => ({
        ..._,
        employeeConsumer: predeterminedEmployeeConsumer,
      }))
    }
  }, [setReportDraft, predeterminedEmployeeConsumer])
  const shouldSkipQuestion = predeterminedEmployeeConsumer !== undefined
  return shouldSkipQuestion
}

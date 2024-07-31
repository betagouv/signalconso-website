import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {useI18n} from '@/i18n/I18n'
import {ReactNode} from 'react'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemSelect} from './ProblemSelect'

export function ProblemEmployeeConsumer({
  children,
  predeterminedEmployeeConsumer,
}: {
  predeterminedEmployeeConsumer: boolean | undefined
  children: () => ReactNode
}) {
  const {m} = useI18n()
  const {reportDraft, setReportDraft} = useReportFlowContext()
  const hidden = predeterminedEmployeeConsumer !== undefined
  const isDone = hidden || reportDraft.employeeConsumer !== undefined
  return (
    <>
      {!hidden && (
        <>
          <ProblemSelect
            id="select-employeeconsumer"
            title={m.problemDoYouWorkInCompany}
            value={reportDraft.employeeConsumer}
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
          {reportDraft.employeeConsumer && (
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

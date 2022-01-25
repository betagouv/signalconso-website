import {useReportFlowContext} from '../ReportFlowContext'
import {useI18n} from '../../../core/i18n'
import {Alert, Txt} from 'mui-extension'
import {ReportDraft} from '../../../../../signalconso-api-sdk-js'
import {ConfirmationStep, ConfirmationStepper} from './ConfirmationStepper'
import {Animate} from '../../../shared/Animate/Animate'

interface Props {

}

export const Confirmation = ({}: Props) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft as ReportDraft
  console.log(draft)
  const {m} = useI18n()
  return (
    <Animate autoScrollTo={true} animate={true}>
      <div>
        <Txt sx={{mb: 2}} block size="title">{m.confirmationTitle}</Txt>
        <Alert type="warning">
          {ReportDraft.isTransmittableToPro(draft) ? m.confirmationAlertTransmittable : m.confirmationAlert}
        </Alert>

        <ConfirmationStepper>
          <ConfirmationStep title={m.step_problem}>
            {draft.category}
            {/*{draft.subcategories.map(_ => _.title)}*/}
          </ConfirmationStep>
          <ConfirmationStep title={m.step_description}>
          </ConfirmationStep>
          <ConfirmationStep title={m.step_company}>
          </ConfirmationStep>
          <ConfirmationStep title={m.step_consumer}>
          </ConfirmationStep>
        </ConfirmationStepper>
      </div>
    </Animate>
  )
}

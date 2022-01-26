import {ReportDraft2, useReportFlowContext} from '../ReportFlowContext'
import {useI18n} from '../../../core/i18n'
import {Alert, Txt} from 'mui-extension'
import {ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {ConfirmationStep, ConfirmationStepper} from './ConfirmationStepper'
import {Animate} from '../../../shared/Animate/Animate'
import {Box, BoxProps, Icon} from '@mui/material'
import {AnomalyImage} from '../../../shared/AnomalyCard/AnomalyImage'
import {AddressComponent} from '../../../shared/Address/Address'
import {StepperActions} from '../../../shared/Stepper/StepperActions'

interface Props {

}

const Row = ({icon, dense, children, ...props}: {dense?: boolean, icon: string} & BoxProps) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', mb: dense ? 1 : 2}} {...props}>
      <Icon sx={{mr: dense ? 1 : 2, color: t => t.palette.text.disabled}}>{icon}</Icon>
      {children}
    </Box>
  )
}

export const Confirmation = ({}: Props) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft as ReportDraft2
  console.log(draft)
  const {m} = useI18n()
  return (
    <Animate autoScrollTo={true} animate={true}>
      <div>
        <Txt sx={{mb: 2}} block size="title">{m.confirmationTitle}</Txt>
        <Alert type="warning" sx={{mb: 2}}>
          {ReportDraft.isTransmittableToPro(draft) ? m.confirmationAlertTransmittable : m.confirmationAlert}
        </Alert>

        <ConfirmationStepper>
          <ConfirmationStep title={m.step_problem}>
            <Box sx={{display: 'flex'}}>
              <AnomalyImage anomaly={draft.anomaly} size={70}/>
              <Box>
                <Txt block size="big" bold sx={{mb: 1}}>{draft.category}</Txt>
                {draft.subcategories.map(_ =>
                  <Row dense icon="subdirectory_arrow_right" key={_.title}>{_.title}</Row>
                )}
              </Box>
            </Box>
          </ConfirmationStep>
          <ConfirmationStep title={m.step_description}>
            {draft.detailInputValues.map(({label, value}) =>
              <Box sx={{mb: 1}}>
                <Txt bold sx={{mr: 1}}>{label}</Txt>
                <Txt color="hint">{JSON.stringify(value)}</Txt>
              </Box>
            )}
          </ConfirmationStep>
          <ConfirmationStep title={m.step_company}>
            <Txt size="big" bold block>{draft.companyDraft.name}</Txt>
            <Txt color="hint" block sx={{mb: .5}}>
              <Txt>SIRET:&nbsp;</Txt>
              <Txt bold>{draft.companyDraft.siret}</Txt>
            </Txt>
            <Row icon="location_on">
              <Txt color="hint">
                <AddressComponent address={draft.companyDraft.address}/>
              </Txt>
            </Row>
          </ConfirmationStep>
          <ConfirmationStep title={m.step_consumer}>
            <Row icon="person">
              {draft.consumer.firstName}{' '}
              {draft.consumer.lastName}
            </Row>
            <Row icon="email">
              {draft.consumer.email}
            </Row>
            {draft.consumer.phone && (
              <Row icon="phone">
                {draft.consumer.phone}
              </Row>
            )}
            <Row icon="https">
              {m.contactAgreement}:&nbsp;
              <Txt bold>{draft.contactAgreement ? m.yes : m.no}</Txt>
            </Row>
          </ConfirmationStep>
        </ConfirmationStepper>
        <StepperActions/>
      </div>
    </Animate>
  )
}

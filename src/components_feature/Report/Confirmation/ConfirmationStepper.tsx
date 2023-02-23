import {Box} from '@mui/material'
import {ScButton} from 'components_simple/Button/Button'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {useI18n} from 'i18n/I18n'
import {indexToStep, indexToStepOrDone, ReportStep} from 'model/ReportStep'
import React, {ReactElement, ReactNode} from 'react'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'

interface ConfirmationStepperProps {
  children: Array<ReactElement<ConfirmationStepProps>>
}

interface ConfirmationStepProps {
  title?: ReactNode
  children?: ReactNode
  index?: number
  goToStep: (step: ReportStep) => void
}

export const ConfirmationStepper = ({children}: ConfirmationStepperProps) => {
  return <>{children.map((child, index) => React.cloneElement(child, {...child.props, key: index, index}))}</>
}

export const ConfirmationStep = ({title, children, index, goToStep}: ConfirmationStepProps) => {
  const {m} = useI18n()
  return (
    <Panel
      title={
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Txt color="hint" sx={{mr: 1}}>
            {index! + 1}.
          </Txt>
          <Txt>{title}</Txt>
          <ScButton
            sx={{marginLeft: 'auto'}}
            size="small"
            variant="outlined"
            icon="edit"
            color="primary"
            onClick={() => {
              goToStep(indexToStep(index! + 1))
            }}
          >
            {m.edit}
          </ScButton>
        </Box>
      }
    >
      <PanelBody>{children}</PanelBody>
    </Panel>
  )
}

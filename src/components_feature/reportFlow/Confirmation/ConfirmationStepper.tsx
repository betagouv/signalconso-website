import {Button} from '@codegouvfr/react-dsfr/Button'
import {Box} from '@mui/material'
import {Panel, PanelBody} from 'components_simple/Panel'
import {useI18n} from 'i18n/I18n'
import {ReportStep, indexToStep} from 'model/ReportStep'
import React, {ReactElement, ReactNode} from 'react'
import {Txt} from '../../../alexlibs/Txt'

interface ConfirmationStepperProps {
  children: Array<ReactElement<ConfirmationStepProps> | undefined>
}

interface ConfirmationStepProps {
  title?: ReactNode
  children?: ReactNode
  index?: number
  goToStep: (step: ReportStep) => void
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false
  const testDummy: TValue = value
  return true
}
export const ConfirmationStepper = ({children}: ConfirmationStepperProps) => {
  return (
    <>
      {children.filter(notEmpty).map((child, index) => {
        return React.cloneElement(child, {...child.props, key: index, index})
      })}
    </>
  )
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
          <Button
            className="ml-4"
            size="small"
            priority="secondary"
            iconId={'fr-icon-pencil-line'}
            onClick={() => {
              goToStep(indexToStep(index! + 1))
            }}
          >
            {m.edit}
          </Button>
        </Box>
      }
    >
      <PanelBody>{children}</PanelBody>
    </Panel>
  )
}

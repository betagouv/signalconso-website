import {useI18n} from '@/i18n/I18n'
import {ReportStep, indexToStep} from '@/model/ReportStep'
import {Button} from '@codegouvfr/react-dsfr/Button'
import React, {ReactElement, ReactNode} from 'react'

interface ConfirmationStepperProps {
  children: Array<ReactElement<ConfirmationStepProps> | undefined>
}

interface ConfirmationStepProps {
  title?: ReactNode
  children?: ReactNode
  index: number
  goToStep: (step: ReportStep) => void
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false
  const testDummy: TValue = value
  return true
}
export const ConfirmationStepper = ({children}: ConfirmationStepperProps) => {
  return (
    <div className="space-y-8">
      {children.filter(notEmpty).map((child, index) => {
        return React.cloneElement(child, {...child.props, key: index, index})
      })}
    </div>
  )
}

export const ConfirmationStep = ({title, children, index, goToStep}: ConfirmationStepProps) => {
  const {m} = useI18n()
  return (
    <div className="">
      <h2 className="fr-h4 !mb-2 md:w-fit bg-sclightpurple flex gap-4 items-end md:justify-start justify-between p-1 md:flex-row-reverse md:pr-3">
        <span>
          <span className="text-scpurplepop">{title}</span>
        </span>
        <Button
          className="!bg-white"
          size="small"
          priority="secondary"
          iconId={'fr-icon-pencil-line'}
          onClick={() => {
            goToStep(indexToStep(index! + 1))
          }}
        >
          {m.edit}
        </Button>
      </h2>
      <div className="md:pl-4">{children}</div>
    </div>
  )
}

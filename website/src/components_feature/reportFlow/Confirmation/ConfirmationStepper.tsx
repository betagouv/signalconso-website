import {useI18n} from '@/i18n/I18n'
import {ReportStep, indexToStep} from '@/model/ReportStep'
import {Button} from '@codegouvfr/react-dsfr/Button'
import React, {ReactElement, ReactNode, useId} from 'react'

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
    <div className="space-y-8 mb-6">
      {children.filter(notEmpty).map((child, index) => {
        return React.cloneElement(child, {...child.props, key: index, index})
      })}
    </div>
  )
}

export const ConfirmationStep = ({title, children, index, goToStep}: ConfirmationStepProps) => {
  const {m} = useI18n()
  const titleId = useId()
  return (
    <div role="region" aria-labelledby={titleId}>
      <h2 className="fr-h4 !mb-2 md:w-fit bg-sclightpurple flex gap-4 items-end md:justify-start justify-between p-1 md:flex-row-reverse md:pr-3">
        <span>
          <span id={titleId} className="text-scpurplepop">{title}</span>
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
      <div
        tabIndex={0}
        className="md:pl-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scbluefrance"
      >
        {children}
      </div>
    </div>
  )
}

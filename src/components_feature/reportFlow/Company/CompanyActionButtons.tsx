import {BtnNext} from '@/components_simple/buttons/Buttons'
import {useI18n} from '@/i18n/I18n'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'

export function CompanyActionButtons({onClear, stepNavigation}: {onClear: () => void; stepNavigation: StepNavigation}) {
  const {m} = useI18n()
  return (
    <div className="flex items-center justify-end gap-2">
      <Button iconId={'fr-icon-pencil-line'} onClick={onClear} priority="secondary">
        {m.edit}
      </Button>
      <BtnNext onClick={stepNavigation.next} />
    </div>
  )
}

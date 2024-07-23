import {CompanyRecapFromStep2} from '@/components_simple/CompanyRecap/CompanyRecap'
import {useI18n} from '@/i18n/I18n'
import {ReportDraft2} from '@/model/ReportDraft2'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyActionButtons} from './CompanyActionButtons'

export const CompanyFilled = ({
  draft,
  onClear,
  stepNavigation,
}: {
  draft: Pick<ReportDraft2, 'step2' | 'tags'>
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  return (
    <div>
      <h2 className="fr-h6">{m.companyIdentifiedTitle}</h2>
      <div className="mb-2">
        <CompanyRecapFromStep2 draft={draft} />
      </div>
      <CompanyActionButtons {...{onClear, stepNavigation}} />
    </div>
  )
}

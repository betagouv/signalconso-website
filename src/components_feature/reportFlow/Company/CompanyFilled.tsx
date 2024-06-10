import {CompanyRecapWithProduct} from '@/components_simple/CompanyRecap/CompanyRecap'
import {useI18n} from '@/i18n/I18n'
import {ReportDraft2} from '@/model/ReportDraft2'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyActionButtons} from './CompanyActionButtons'

export const CompanyFilled = ({
  draft,
  onClear,
  stepNavigation,
}: {
  draft: Partial<ReportDraft2>
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  if (!draft.companyDraft) {
    throw new Error(`companyDraft should be defined ${JSON.stringify(draft)}`)
  }
  return (
    <div>
      <h2 className="fr-h6">{m.companyIdentifiedTitle}</h2>
      <div className="mb-2">
        <CompanyRecapWithProduct company={draft.companyDraft} barcodeProduct={draft.barcodeProduct} />
      </div>
      <CompanyActionButtons {...{onClear, stepNavigation}} />
    </div>
  )
}

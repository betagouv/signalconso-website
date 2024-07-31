import {Step2Recap} from '@/components_simple/CompanyRecap/Step2Recap'
import {getTags} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {Report} from '@/model/Report'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyActionButtons} from './CompanyActionButtons'

export const CompanyFilled = ({
  draft,
  onClear,
  stepNavigation,
}: {
  draft: Pick<Report, 'step2' | 'step0' | 'subcategoriesIndexes'>
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  return (
    <div>
      <h2 className="fr-h6">{m.companyIdentifiedTitle}</h2>
      <div className="mb-2">
        <Step2Recap step2={draft.step2} tags={getTags(draft)} />
      </div>
      <CompanyActionButtons {...{onClear, stepNavigation}} />
    </div>
  )
}

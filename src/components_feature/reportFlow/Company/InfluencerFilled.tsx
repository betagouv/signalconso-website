import {SocialNetworkRow} from '@/components_simple/SocialNetworkRow'
import {useI18n} from '@/i18n/I18n'
import {Step2Model} from '@/model/Step2Model'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyActionButtons} from './CompanyActionButtons'

export const InfluencerFilled = ({
  step2,
  onClear,
  stepNavigation,
}: {
  step2: Step2Model & {
    kind: 'influencer' | 'influencerOtherSocialNetwork'
  }
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  return (
    <div>
      <h2 className="fr-h6">{m.influencerIdentifiedTitle}</h2>
      {step2.kind === 'influencerOtherSocialNetwork' ? (
        <div className="flex">
          <SocialNetworkRow socialNetwork={step2.socialNetwork} gray className="mb-2" />
          <span className="text-gray-500 font-bold"> : {step2.otherSocialNetwork}</span>
        </div>
      ) : (
        <SocialNetworkRow socialNetwork={step2.socialNetwork} gray className="mb-2" />
      )}
      <div className="flex gap-2 pl-1">
        <i className="ri-account-box-line" />
        <span className="text-schint">{step2.influencerName}</span>
      </div>
      <CompanyActionButtons {...{onClear, stepNavigation}} />
    </div>
  )
}

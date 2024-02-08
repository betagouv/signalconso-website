import {useI18n} from '@/i18n/I18n'
import {ReportDraft2} from '@/model/ReportDraft2'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyActionButtons} from './CompanyActionButtons'
import {SocialNetworkRow} from '@/components_simple/SocialNetworkRow'

export const InfluencerFilled = ({
  draft,
  onClear,
  stepNavigation,
}: {
  draft: Partial<ReportDraft2>
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  if (!draft.influencer) {
    throw new Error(`influencer should be defined ${JSON.stringify(draft)}`)
  }

  return (
    <div>
      <h2 className="fr-h6">{m.influencerIdentifiedTitle}</h2>
      {draft.influencer.otherSocialNetwork ? (
        <div className="flex">
          <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} gray className="mb-2" />
          <span className="text-gray-500 font-bold"> : {draft.influencer.otherSocialNetwork}</span>
        </div>
      ) : (
        <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} gray className="mb-2" />
      )}
      <div className="flex gap-2 pl-1">
        <i className="ri-account-box-line" />
        <span className="text-schint">{draft.influencer.name}</span>
      </div>
      <CompanyActionButtons {...{onClear, stepNavigation}} />
    </div>
  )
}

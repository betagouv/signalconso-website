import {ReportTag} from '@/anomalies/Anomaly'
import {useI18n} from '@/i18n/I18n'
import {Step2Model} from '@/model/Step2Model'
import {CompanyRecapFromStep2} from './CompanyRecap'

export function Step2Recap({step2, tags}: {step2: Step2Model; tags: ReportTag[]}) {
  const {m} = useI18n()
  switch (step2.kind) {
    case 'basic':
    case 'phone':
    case 'website':
    case 'product':
      return <CompanyRecapFromStep2 draft={{step2, tags}} />
    case 'train': {
      const {train, nightTrain, ter} = step2.train
      return (
        <div>
          <p className="mb-0">
            <strong>Train :</strong> {m.Train[train]}
            {nightTrain && <> ({m.NightTrain[nightTrain]})</>}
            {ter && <> ({m.Ter[ter]})</>}
          </p>
        </div>
      )
    }
    case 'station': {
      const {station} = step2
      return (
        <div>
          <p className="mb-0">
            <strong>{m.trainStation}</strong> : {station}
          </p>
        </div>
      )
    }
    case 'influencer':
    case 'influencerOtherSocialNetwork':
      // currently we never fall into these cases
      // because we test the influencer cases earlier
      // but we could add them in the future
      return null
  }
}

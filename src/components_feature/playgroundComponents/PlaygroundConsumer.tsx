import {ConsumerInner} from '../reportFlow/Consumer/Consumer'
import {dummyStepNavigation} from './PlaygroundConfirmation'

export const PlaygroundConsumer = () => {
  return (
    <>
      <ConsumerInner
        draft={{
          companyKind: 'LOCATION',
        }}
        onSubmit={x => alert(JSON.stringify(x))}
        stepNavigation={dummyStepNavigation}
      />
    </>
  )
}

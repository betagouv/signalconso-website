import {ConsumerInner} from '../reportFlow/Consumer/Consumer'
import {dummyStepNavigation} from './PlaygroundConfirmation'

export const PlaygroundConsumer = () => {
  return (
    <>
      <ConsumerInner
        draft={{
          step0: {
            category: 'DemoCategory',
            lang: 'fr',
          },
          subcategoriesIndexes: [0],
          companyKind: 'LOCATION',
        }}
        onSubmit={x => alert(JSON.stringify(x))}
        stepNavigation={dummyStepNavigation}
      />
    </>
  )
}

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
          step1: {subcategoriesIndexes: [0], employeeConsumer: false, consumerWish: 'companyImprovement'},
          step2: {
            kind: 'basic',
            companyIdentification: {
              kind: 'consumerLocation',
              consumerPostalCode: '13002',
            },
          },
        }}
        onSubmit={x => alert(JSON.stringify(x))}
        stepNavigation={dummyStepNavigation}
      />
    </>
  )
}

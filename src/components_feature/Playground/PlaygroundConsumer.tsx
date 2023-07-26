import {Card, CardContent} from '@mui/material'
import {ConsumerInner} from '../Report/Consumer/Consumer'
import {dummyStepNavigation} from './PlaygroundConfirmation'

export const PlaygroundConsumer = () => {
  return (
    <>
      <Card elevation={2}>
        <CardContent>
          <ConsumerInner
            draft={{
              companyKind: 'LOCATION',
            }}
            onSubmit={x => alert(JSON.stringify(x))}
            stepNavigation={dummyStepNavigation}
          />
        </CardContent>
      </Card>
    </>
  )
}

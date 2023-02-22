import {Card, CardContent} from '@mui/material'
import {_Consumer} from '../Report/Consumer/Consumer'
import {dummyStepNavigation} from './PlaygroundConfirmation'

export const PlaygroundConsumer = () => {
  return (
    <>
      <Card elevation={2}>
        <CardContent>
          <_Consumer
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

import {CompanyKinds} from '@signal-conso/signalconso-api-sdk-js'
import {_Consumer} from '../Report/Consumer/Consumer'
import {Card, CardContent} from '@mui/material'

export const PlaygroundConsumer = () => {
  return (
    <>
      <Card elevation={2}>
        <CardContent>
          <_Consumer
            draft={{
              companyKind: CompanyKinds.LOCATION,
            }}
            onSubmit={x => alert(JSON.stringify(x))}
          />
        </CardContent>
      </Card>
    </>
  )
}

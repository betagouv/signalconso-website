import {CompanyKinds} from '@signal-conso/signalconso-api-sdk-js'
import {_Consumer} from '../Report/Consumer/Consumer'

export const PlaygroundConsumer = () => {
  return (
    <>
      <_Consumer
        draft={{
          companyKind: CompanyKinds.LOCATION
        }}
        onSubmit={x => alert(JSON.stringify(x))}
      />
    </>
  )
}

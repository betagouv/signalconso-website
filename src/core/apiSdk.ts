import {appConfig} from '../conf/appConfig'
import {SignalConsoPublicSdk} from '../client/SignalConsoPublicSdk'
import {ApiClient} from '../client/ApiClient'

export const apiSdk = new SignalConsoPublicSdk(
  new ApiClient({
    baseUrl: appConfig.apiBaseUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
)

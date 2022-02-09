import {ApiClient, SignalConsoPublicSdk} from '@signal-conso/signalconso-api-sdk-js'
import {appConfig} from '../conf/appConfig'

export const apiSdk = new SignalConsoPublicSdk(new ApiClient({
  baseUrl: appConfig.apiBaseUrl + '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}))

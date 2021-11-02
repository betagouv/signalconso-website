import {ApiClient, SignalConsoPublicSdk} from '@signal-conso/signalconso-api-sdk-js'
import {config} from '../conf/config'

export const apiSdk = new SignalConsoPublicSdk(new ApiClient({
  baseUrl: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}))

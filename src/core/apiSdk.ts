import {appConfig} from '../conf/appConfig'
import {SignalConsoPublicSdk} from '../client/SignalConsoPublicSdk'
import {ApiClient} from '../client/ApiClient'
import {CompanyPublicSdk} from '../client/CompanyPublicSdk'

export const apiSdk = new SignalConsoPublicSdk(
  new ApiClient({
    baseUrl: appConfig.apiBaseUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
)

export const companyApiSdk = new CompanyPublicSdk(
  new ApiClient({
    baseUrl: appConfig.apiCompanyUrl + '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
)

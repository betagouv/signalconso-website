import {ApiClientApi} from '../ApiClient'
import {ConsumerEmailResult} from './ConsumerEmailValidation'

export class PublicConsumerEmailValidationClient {
  constructor(private client: ApiClientApi) {}

  readonly check = (email: string) => {
    return this.client.post<{valid: boolean}>('/email-validation/check', {body: {email}})
  }

  readonly checkAndValidate = (email: string, confirmationCode: string) => {
    return this.client.post<ConsumerEmailResult>('/email-validation/check-and-validate', {body: {email, confirmationCode}})
  }
}

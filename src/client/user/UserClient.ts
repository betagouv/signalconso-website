import {User, UserEdit, UserPending} from './User'
import {ApiClientApi} from '../ApiClient'
import {Id} from '../../model'

export class UserClient {
  constructor(private client: ApiClientApi) {}

  readonly fetchConnectedUser = () => {
    return this.client.get<User>(`/account`)
  }

  readonly fetchPendingDGCCRF = () => {
    return this.client.get<UserPending[]>(`/account/dgccrf/pending`).then(_ =>
      _.map(_ => {
        _.tokenCreation = new Date(_.tokenCreation)
        _.tokenExpiration = new Date(_.tokenExpiration)
        return _
      }),
    )
  }

  readonly inviteDGCCRF = (email: string) => {
    return this.client.post<void>(`/account/dgccrf/invitation`, {body: {email}})
  }

  readonly changePassword = (oldPassword: string, newPassword: string) => {
    return this.client.post(`/account/password`, {body: {oldPassword, newPassword}})
  }

  readonly forceValidateEmail = (email: string) => {
    return this.client.post<void>(`/account/validate-email/${email}`, {})
  }

  readonly edit = (id: Id, body: UserEdit) => {
    return this.client.put<User>(`/account/${id}`, {body})
  }
}

import {ApiError} from 'clients/BaseApiClient'
import {useToastContext} from '../alexlibs/mui-extension/Toast/ToastContext'
import {useI18n} from '../i18n/I18n'

export const useToastError = () => {
  const toastContext = useToastContext()
  const {m} = useI18n()
  return (message?: string) => toastContext.toastError(message ?? m.anErrorOccurred)
}

export function getApiErrorId(e: unknown) {
  if (e instanceof ApiError) {
    const id = e.details.id
    if (id) {
      return id
    }
  }
  return undefined
}

import {useToast as useMuiToast} from 'mui-extension/lib/Toast/Toast'
import {ApiDetailedError, ApiError} from '@signal-conso/signalconso-api-sdk-js'
import {useI18n} from './i18n'

export const useToast = () => {
  const {toastError, ...toasts} = useMuiToast()
  const {m} = useI18n()

  const getErrorMessage = (err: Partial<ApiError>) => {
    if (err.id && (m.apiErrorsCode as any)[err.id]) {
      return (m.apiErrorsCode as any)[err.id]
    }
    if (err.message && err.message !== '') {
      return err.message
    }
    return m.anErrorOccurred
  }

  const getApiErrorMessage = (err: Partial<ApiDetailedError>) => {

    if (err.message && err.message.details !== '') {
      return err.message.details
    }
    return m.anErrorOccurred
  }

  return {
    toastError: (error: Partial<ApiError>) => toastError(getErrorMessage(error)),
    toastApiError: (error: Partial<ApiDetailedError>) => toastError(getApiErrorMessage(error)),
    ...toasts,
  }
}

import {useToast as useMuiToast} from 'mui-extension/lib/Toast/Toast'
import {ApiError} from '@signal-conso/signalconso-api-sdk-js'
import {useI18n} from './i18n'

export const useToast = () => {
  const {toastError, ...toasts} = useMuiToast()
  const {m} = useI18n()

  const getErrorMessage = (err: Partial<ApiError>) => {
    console.error(JSON.stringify(err.details))
    if (err.details?.id && (m.apiErrorsCode as any)[err.details.id]) {
      return (m.apiErrorsCode as any)[err.details.id]
    }
    if (err.message && err.message !== '') {
      return err.message
    }
    return m.anErrorOccurred
  }

  return {
    toastError: (error: Partial<ApiError>) => toastError(getErrorMessage(error)),
    ...toasts,
  }
}

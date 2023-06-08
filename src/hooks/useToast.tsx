import {useToastContext} from '../alexlibs/mui-extension/Toast/ToastContext'
import {useI18n} from '../i18n/I18n'
import {ApiError} from '../clients/BaseApiClient'

export const useToast = () => {
  const {toastError, ...toasts} = useToastContext()
  const {m} = useI18n()

  function getErrorMessage(err: unknown): string {
    console.error('Got error', err)
    if (typeof err === 'string') {
      return err
    }
    if (isApiError(err)) {
      if (err.details.id && (m.apiErrorsCode as any)[err.details.id]) {
        return (m.apiErrorsCode as any)[err.details.id]
      }
    }
    if (isError(err)) {
      return err.message
    }
    return m.anErrorOccurred
  }

  return {
    toastError: (error: unknown) => toastError(getErrorMessage(error)),
    ...toasts,
  }
}

function isApiError(err: unknown): err is ApiError {
  return (err as any).name === 'ApiError'
}

function isError(err: unknown): err is Error {
  return err instanceof Error
}

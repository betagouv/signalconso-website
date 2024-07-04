import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {ApiError} from '@/clients/BaseApiClient'
import {useI18n} from '@/i18n/I18n'
import * as React from 'react'
import {ReactNode, useContext, useState} from 'react'

const ToastContext = React.createContext<(message?: string) => void>({} as any)

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [message, setMessage] = useState<string | undefined>(undefined)
  const {m} = useI18n()

  function hide() {
    setMessage(undefined)
  }

  function toastError(err?: any) {
    let message: string

    if (err && err instanceof ApiError) {
      message = err.message
    } else if (err && typeof err === 'string') {
      message = err
    } else {
      message = m.anErrorOccurred
    }

    setMessage(message)
  }

  return (
    <ToastContext.Provider value={toastError}>
      {children}
      {message && (
        <div className="bg-white fixed z-50 bottom-8 right-8">
          <Alert closable description={message} onClose={hide} severity="warning" title={m.error} />
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToastError = () => useContext(ToastContext)

export function getApiErrorId(e: unknown) {
  if (e instanceof ApiError) {
    const id = e.details.id
    if (id) {
      return id
    }
  }
  return undefined
}

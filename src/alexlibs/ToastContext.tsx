import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {useI18n} from 'i18n/I18n'
import * as React from 'react'
import {ReactNode, useContext, useState} from 'react'

interface Toast {
  toastError: (m: string) => void
}
const ToastContext = React.createContext<Toast>({} as Toast)

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const {m} = useI18n()

  function hide() {
    setOpen(false)
  }

  const value = {
    toastError: (message: string) => {
      setMessage(message)
      setOpen(true)
    },
  }

  return (
    <ToastContext.Provider {...{value}}>
      {children}
      {message && open && (
        <div className="bg-white fixed z-50 bottom-8 right-8">
          <Alert closable description={message} onClose={hide} severity="warning" title={m.error} />
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => useContext(ToastContext)

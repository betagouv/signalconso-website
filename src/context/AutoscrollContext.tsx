import {ReactNode, createContext, useContext, useState} from 'react'

type AutoscrollContextShape = {
  autoscrollEnabled: boolean
  disableAutoscrollTemporarily: () => void
}

const autoscrollContext = createContext<AutoscrollContextShape>(null as any)

export function KeyboardNavProvider({children}: {children: ReactNode}) {
  const [autoscrollEnabled, setAutoscrollEnabled] = useState(true)

  function disableAutoscrollTemporarily() {
    // disable the autoscroll for a very short time
    // i.e. it disables the next autoscroll and that's it
    setAutoscrollEnabled(false)
    setTimeout(() => {
      setAutoscrollEnabled(true)
    }, 500)
  }

  return (
    <autoscrollContext.Provider value={{autoscrollEnabled, disableAutoscrollTemporarily}}>{children}</autoscrollContext.Provider>
  )
}

export function useAutoscrollContext() {
  return useContext(autoscrollContext)
}

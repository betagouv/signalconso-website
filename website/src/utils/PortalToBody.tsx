import {ReactNode, useEffect, useState} from 'react'
import {createPortal} from 'react-dom'

export function PortalToBody({children}: {children: ReactNode}) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (isClient) {
    return <>{createPortal(children, document.body)}</>
  }
  return null
}

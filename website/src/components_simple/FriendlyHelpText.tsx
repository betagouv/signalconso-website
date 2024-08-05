import {ReactNode} from 'react'

export function FriendlyHelpText({children, margins = true}: {children: ReactNode; margins?: boolean}) {
  return <div className={`py-4 px-8 ${margins ? `my-4` : ''} bg-sclightblueinfo text-scblueinfo`}>{children}</div>
}

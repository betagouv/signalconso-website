import {ReactNode} from 'react'

export function FriendlyHelpText({children, margins = true, tabIndex}: {children: ReactNode; margins?: boolean; tabIndex?: number}) {
  return (
    <div
      tabIndex={tabIndex}
      className={`py-4 px-8 ${margins ? `my-4` : ''} bg-sclightblueinfo text-scblueinfo space-y-2 rounded-sm${tabIndex !== undefined ? ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scbluefrance' : ''}`}
    >
      {children}
    </div>
  )
}

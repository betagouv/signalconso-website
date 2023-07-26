import {ReactNode} from 'react'
import {alertInfoBackgroundColor, alertInfoTextColor} from './Alert'

export function FriendlyHelpText({children}: {children: ReactNode}) {
  return (
    <div
      className="py-4 px-8 my-4"
      style={{
        background: alertInfoBackgroundColor,
        color: alertInfoTextColor,
        lineHeight: '1.3',
      }}
    >
      {children}
    </div>
  )
}

import {ReactNode} from 'react'

export function FriendlyHelpText({children}: {children: ReactNode}) {
  return <div className="py-4 px-8 my-4 bg-sclightblueinfo text-scblueinfo">{children}</div>
}

import {ReactNode} from 'react'

export function BlueBanner({children}: {children: ReactNode}) {
  return (
    <div className="py-4 px-8 mb-8 bg-sclightblueinfo text-scblueinfo border-y-[1px] border-0 border-solid border-scblueinfo">
      {children}
    </div>
  )
}

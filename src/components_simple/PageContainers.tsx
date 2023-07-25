import {ReactNode} from 'react'

export function ContentPageContainer({children}: {children: ReactNode}) {
  return (
    <div className="fr-container fr-pt-6w fr-pb-4w ">
      {children}
      {/* <div className="fr-grid-row ">
        <div className="fr-col-12  fr-col-lg-10 fr-col-xl-8 fr-col-offset-0 fr-col-offset-lg-1 fr-col-offset-xl-2">
          {children}
        </div>
      </div> */}
    </div>
  )
}

export function LimitedWidthPageContainer({children}: {children: ReactNode}) {
  return (
    <div className="fr-container fr-pt-6w fr-pb-4w ">
      <div className="fr-grid-row ">
        <div className="fr-col-12  fr-col-lg-10 fr-col-xl-8 fr-col-offset-0 fr-col-offset-lg-1 fr-col-offset-xl-2">
          {children}
        </div>
      </div>
    </div>
  )
}

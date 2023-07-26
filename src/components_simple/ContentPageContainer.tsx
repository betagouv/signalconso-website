import {ReactNode} from 'react'

export function ContentPageContainer({children}: {children: ReactNode}) {
  return (
    <div className="fr-container fr-pt-6w fr-pb-4w ">
      <div className="fr-grid-row ">
        <div className="fr-col-12  fr-col-lg-10 fr-col-xl-8 ">{children}</div>
      </div>
    </div>
  )
}

import {MaybeChildrenProps} from '@/utils/utils'
import {HTMLAttributes, ReactNode} from 'react'

type Props = {
  type: 'info' | 'error' | 'warning' | 'success'
  action?: ReactNode
  id?: string
  dangerouslySetInnerHTML?: HTMLAttributes<HTMLDivElement>['dangerouslySetInnerHTML']
} & MaybeChildrenProps

export const alertWarningBackgroundColor = 'rgba(255, 128, 0, .08)'
export const alertWarningTextColor = 'rgb(153, 76, 0)'

// An alert that looks different (softer, less catchy) of the Alert from DSFR
// note : you should wrap the content in <p> (one or several)
// accessibility audit recommends it
// and this component won't do it for you
export const ScAlert = ({type, action, children, dangerouslySetInnerHTML, id}: Props) => {
  function pickIcon() {
    switch (type) {
      case 'info':
        return 'ri-information-line'
      case 'error':
      case 'warning':
        return 'ri-error-warning-fill'
      case 'success':
        return 'ri-checkbox-circle-line'
    }
  }

  function pickColorsClasses() {
    switch (type) {
      case 'info':
        return `bg-sclightblueinfo text-scblueinfo`
      case 'error':
        return `bg-sclightrederror text-screderror`
      case 'warning':
        return `bg-sclightorangewarn text-scorangewarn`
      case 'success':
        return `bg-sclightgreensuccess text-scgreensuccess`
    }
  }

  function roleProp() {
    switch (type) {
      case 'warning':
      case 'error':
        return {role: 'alert'}
      default:
        return {}
    }
  }

  return (
    <div
      {...(id ? {id} : null)}
      {...roleProp()}
      className={`flex px-2 justify-between items-center mb-2 py-4 gap-2 ${pickColorsClasses()}`}
    >
      <div className="flex gap-2">
        <i className={`${pickIcon()}`} />
        <div {...{dangerouslySetInnerHTML}} className="space-y-2">
          {children}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

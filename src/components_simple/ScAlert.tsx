import {MaybeChildrenProps} from '@/utils/utils'
import {HTMLAttributes, ReactNode} from 'react'

type Props = {
  type: 'info' | 'error' | 'warning' | 'success'
  action?: ReactNode
  id?: string
  dangerouslySetInnerHTML?: HTMLAttributes<HTMLDivElement>['dangerouslySetInnerHTML']
} & MaybeChildrenProps

// same blue colors as FriendlyHelperText
const alertInfoBackgroundColor = '#e8edff'
const alertInfoTextColor = '#0063cb'

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
        return 'ri-error-warning-fill'
      case 'warning':
        return 'ri-error-warning-line'
      case 'success':
        return 'ri-checkbox-circle-line'
    }
  }

  function pickColors() {
    switch (type) {
      case 'info':
        return {
          background: alertInfoBackgroundColor,
          color: alertInfoTextColor,
        }
      case 'error':
        return {
          background: 'rgba(255, 0, 0, .08)', //'#ffdede',
          color: 'rgb(163, 11, 0)',
        }
      case 'warning':
        return {
          background: alertWarningBackgroundColor,
          color: alertWarningTextColor,
        }
      case 'success':
        return {
          background: 'rgba(50, 255, 150, .08)', //'#e1ffe1',
          color: 'rgb(11, 105, 49)',
        }
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
      style={{
        ...pickColors(),
      }}
      className="flex px-2 justify-between items-center mb-2 py-4 gap-2"
    >
      <div className="flex gap-2">
        <i className={`${pickIcon()}`} />
        <div {...{dangerouslySetInnerHTML}}>{children}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

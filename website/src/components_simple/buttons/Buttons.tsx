import {useI18n} from '@/i18n/I18n'
import {iconArrowRight} from '@/utils/utils'
import {FrIconClassName, RiIconClassName} from '@codegouvfr/react-dsfr'
import Button, {ButtonProps} from '@codegouvfr/react-dsfr/Button'
import {ReactNode} from 'react'

export function BtnNext({onClick}: {onClick: () => void}) {
  const {m} = useI18n()
  return (
    <Button iconId={iconArrowRight} {...{onClick}}>
      {m.next}
    </Button>
  )
}

export function BtnNextSubmit() {
  const {m} = useI18n()
  return (
    <Button iconId={iconArrowRight} type="submit">
      {m.next}
    </Button>
  )
}

// Wrapper for a DSFR button to add an optional loading indicator replacing the icon
export function ButtonWithLoader({
  loading,
  iconId,
  children,
  className = '',
  onClick,
  priority,
  size,
  disabled = false,
}: {
  loading: boolean
  iconId: FrIconClassName | RiIconClassName
  children: ReactNode
  className?: string
  onClick?: () => void
  size?: ButtonProps['size']
  priority?: ButtonProps['priority']
  disabled?: boolean
}) {
  return (
    <Button
      {...(onClick ? {onClick} : {type: 'submit'})}
      {...(loading
        ? {
            style: {
              paddingLeft: '14px',
            },
          }
        : {iconId})}
      disabled={disabled || loading}
      className={className}
      size={size}
      {...(priority ? {priority} : null)}
    >
      {loading && <div className="sc-loader w-4 h-4 mr-2"></div>}
      {children}
    </Button>
  )
}

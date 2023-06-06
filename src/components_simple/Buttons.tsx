import {FrIconClassName, RiIconClassName} from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import {buildLinkHomePickCategory} from 'core/pagesDefinitions'
import {useI18n} from 'i18n/I18n'
import {ReactNode} from 'react'
import {iconArrowRight, sendMessageToReactNative} from 'utils/utils'

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
}: {
  loading: boolean
  iconId: FrIconClassName | RiIconClassName
  children: ReactNode
}) {
  return (
    <Button
      type="submit"
      {...(loading
        ? {
            style: {
              paddingLeft: '14px',
            },
          }
        : {iconId})}
      disabled={loading}
    >
      {loading && <div className="sc-loader w-4 h-4 mr-2"></div>}
      {children}
    </Button>
  )
}

export function BigReportButton({
  className = '',
  text,
  onClick,
  isWebView,
}: {
  className?: string
  text?: string
  onClick?: () => void
  isWebView: boolean
}) {
  const {m} = useI18n()
  const finalText = text ?? m.landing.bigReportButton
  const props = {
    iconId: 'fr-icon-alarm-warning-line',
    className,
    size: 'large',
    children: finalText,
  } as const
  if (typeof onClick === 'function') {
    return <Button {...props} onClick={onClick} />
  }
  if (isWebView) {
    return <Button {...props} onClick={() => sendMessageToReactNative('home-start-report')} />
  }
  return (
    <Button
      {...props}
      linkProps={{
        href: buildLinkHomePickCategory(),
      }}
    />
  )
}

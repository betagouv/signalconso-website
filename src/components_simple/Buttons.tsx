import {FrIconClassName, RiIconClassName} from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import {Anomaly} from 'anomalies/Anomaly'
import {buildLinkStartReport, pagesDefs} from 'core/pagesDefinitions'
import {useI18n} from 'i18n/I18n'
import {START_REPORT_ANCHOR} from 'pages'
import {ReactNode} from 'react'
import {iconArrowRight} from 'utils/utils'

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
  target = 'home',
  text = 'Je signale un problème',
}: {
  className?: string
  target?: Anomaly | 'home' | (() => void)
  text?: string
}) {
  const props = {
    iconId: 'fr-icon-alarm-warning-line',
    className,
    size: 'large',
  } as const
  if (typeof target === 'function') {
    return (
      <Button {...props} onClick={target}>
        {text}
      </Button>
    )
  }
  return (
    <Button
      {...props}
      linkProps={{
        href: target === 'home' ? pagesDefs.index.url + `#${START_REPORT_ANCHOR}` : buildLinkStartReport(target),
      }}
    >
      {text}
    </Button>
  )
}

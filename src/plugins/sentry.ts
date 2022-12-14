import * as _Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'

export class Sentry {
  static readonly init = ({sentry_dns, sentry_traceRate}: {sentry_dns?: string; sentry_traceRate?: number}) => {
    if (sentry_dns) {
      _Sentry.init({
        dsn: sentry_dns,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: sentry_traceRate,
      })
    } else {
      console.warn(`Sentry not set.`)
    }
  }
}

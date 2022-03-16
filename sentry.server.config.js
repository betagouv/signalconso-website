// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import {appConfig} from './src/conf/appConfig'

if (appConfig.sentry_dns) {
  Sentry.init({
    dsn: appConfig.sentry_dns,
    tracesSampleRate: appConfig.sentry_traceRate ?? 1,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  })
} else {
  console.warn(`SENTRY_DSN not set.`)
}




'use client'

import {useI18n} from '../i18n/I18n'
import * as Sentry from '@sentry/nextjs'

export default async function GlobalError({error, reset}: {error: Error; reset: () => void}) {
  const {m} = useI18n()
  Sentry.captureException(error)
  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  await Sentry.flush(2000)

  return (
    <div className="fr-container my-32">
      <h1>{m.minimalErrorTitle}</h1>
      <p>{m.minimalErrorText}</p>
    </div>
  )
}

'use client'

import * as Sentry from '@sentry/nextjs'
import {useI18n} from '../../i18n/I18n'

export default function ErrorPage({error, reset}: {error: Error; reset: () => void}) {
  Sentry.captureException(error)
  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  Sentry.flush(2000)
  return <ErrorContent />
}

function ErrorContent() {
  const {m} = useI18n()
  return (
    <>
      <main role="main" id="main-content">
        <div className="fr-container">
          <div className="my-20 py-1 px-5 border-l-[10px] border-scorange border-solid border-0">
            <h1 className="text-scorange ">{m.minimalErrorTitle}</h1>
            <p>{m.minimalErrorText}</p>
          </div>
        </div>
      </main>
    </>
  )
}

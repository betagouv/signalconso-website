'use client'

import {ErrorPageContent} from '@/components_simple/ErrorPageContent'
import {DSFR_COLOR_SCHEME} from '@/core/theme'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import * as Sentry from '@sentry/nextjs'
import {usePathname} from 'next/navigation'
import '../globals.css'
import {AppLangs, getSupportedLang} from '../i18n/localization/AppLangs'
import MuiThemeSetup from './[lang]/MuiThemeSetup'

export default function GlobalError({error, reset}: {error: any; reset: any}) {
  Sentry.captureException(error)
  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  Sentry.flush(2000)
  return <ErrorContent />
}

// November 2023 : I can't seem to be able to display this error
// it might be a Next.js bug :
// https://github.com/intuita-inc/cal.com-demo/pull/24
// https://github.com/vercel/next.js/issues/50119
// https://github.com/vercel/next.js/issues/55462
// https://github.com/vercel/next.js/issues/46964
// etc.
// note for when this file is useful again :
// It is for very rare global errors, so I think we can afford to simplify it,
// not use i18n messages, maybe not DSFR or tailwind, etc.

function ErrorContent() {
  const pathname = usePathname()
  console.log(pathname)
  const currentPathLang = pathname ? pathname.toLowerCase().split('/')[1] : AppLangs.fr
  const lang = getSupportedLang(currentPathLang) ?? AppLangs.fr
  return (
    <html
      {...getHtmlAttributes({defaultColorScheme: DSFR_COLOR_SCHEME, lang: lang})}
      //NOTE: Scrollbar always visible to avoid layout shift when modal are opened
      style={{
        overflow: '-moz-scrollbars-vertical',
        overflowY: 'scroll',
      }}
      lang={lang}
    >
      <body>
        <MuiThemeSetup>
          <DsfrProvider lang={lang}>
            <ErrorPageContent lang={lang} />
          </DsfrProvider>
        </MuiThemeSetup>
      </body>
    </html>
  )
}

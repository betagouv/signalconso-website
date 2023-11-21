import React from 'react'
import '../globals.css'
import StartDsfr from './[lang]/StartDsfr'
import {DsfrHead} from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import Link from 'next/link'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import {DSFR_COLOR_SCHEME} from '@/core/theme'
import {AppLangs} from '@/i18n/localization/AppLangs'

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html {...getHtmlAttributes({defaultColorScheme: DSFR_COLOR_SCHEME, lang: AppLangs.fr})}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

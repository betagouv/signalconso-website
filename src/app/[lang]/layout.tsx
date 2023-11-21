import React from 'react'

import {layoutMetadatas} from '@/core/layoutMetadatas'
import {I18nProvider} from '@/i18n/I18n'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import {Metadata} from 'next'
import LayoutCore from './layoutCore'
import MuiThemeSetup from './MuiThemeSetup'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {DSFR_COLOR_SCHEME} from '@/core/theme'
import StartDsfr from '../../components_simple/StartDsfr'
import {DsfrHead} from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  return layoutMetadatas
}

const RootLayout = ({children, params}: {children: React.ReactNode; params: any}) => {
  const lang = params.lang
  return (
    <html
      {...getHtmlAttributes({defaultColorScheme: DSFR_COLOR_SCHEME, lang})}
      // Scrollbar always visible to avoid layout shift when modal are opened
      style={{
        overflow: '-moz-scrollbars-vertical',
        overflowY: 'scroll',
      }}
      {...{lang}}
    >
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} preloadFonts={['Marianne-Regular', 'Marianne-Medium', 'Marianne-Bold']} />
      </head>
      <body>
        <I18nProvider {...{lang}}>
          <MuiThemeSetup>
            <DsfrProvider {...{lang}}>
              <LayoutCore>{children}</LayoutCore>
            </DsfrProvider>
          </MuiThemeSetup>
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout

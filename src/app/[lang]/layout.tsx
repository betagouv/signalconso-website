import React from 'react'

import {layoutMetadatas} from '@/core/layoutMetadatas'
import {I18nProvider} from '@/i18n/I18n'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import {Metadata} from 'next'
import LayoutCore from './layoutCore'
import ThemeSetup from './ThemeSetup'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'

export function generateMetadata(): Metadata {
  return layoutMetadatas
}

const RootLayout = ({children, params}: {children: React.ReactNode; params: any}) => {
  return (
    <html
      {...getHtmlAttributes({defaultColorScheme: 'light', lang: params.lang})}
      // Scrollbar always visible to avoid layout shift when modal are opened
      style={{
        overflow: '-moz-scrollbars-vertical',
        overflowY: 'scroll',
      }}
      lang={params.lang}
    >
      <body>
        <I18nProvider lang={params.lang}>
          <ThemeSetup>
            <DsfrProvider lang={params.lang}>
              <LayoutCore>{children}</LayoutCore>
            </DsfrProvider>
          </ThemeSetup>
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout

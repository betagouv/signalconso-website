import React from 'react'

import {layoutMetadatas} from '@/core/layoutMetadatas'
import {DSFR_COLOR_SCHEME} from '@/core/theme'
import {I18nProvider} from '@/i18n/I18n'
import {DsfrHead} from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import {Metadata} from 'next'
import Link from 'next/link'
import StartDsfr from '../../components_simple/StartDsfr'
import LayoutCore from './layoutCore'

export function generateMetadata(): Metadata {
  return layoutMetadatas
}

const RootLayout = async (props: {children: React.ReactNode; params: Promise<any>}) => {
  const params = await props.params

  const {children} = props

  const lang = params.lang
  return (
    <html {...getHtmlAttributes({defaultColorScheme: DSFR_COLOR_SCHEME, lang})} {...{lang}}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} preloadFonts={['Marianne-Regular', 'Marianne-Medium', 'Marianne-Bold']} />
      </head>
      <body>
        <I18nProvider {...{lang}}>
          <DsfrProvider {...{lang}}>
            <LayoutCore>{children}</LayoutCore>
          </DsfrProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout

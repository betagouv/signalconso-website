import React from 'react'

import {layoutMetadatas} from '@/core/layoutMetadatas'
import {I18nProvider} from '@/i18n/I18n'
import {Metadata} from 'next'
import LayoutCore from './layoutCore'
import {DsfrHead, getHtmlAttributes} from '@/core/dsfr-bootstrap/server-only-index'
import {StartDsfrOnHydration} from '@codegouvfr/react-dsfr/next-app-router'
import {DsfrProvider} from '@/core/dsfr-bootstrap'

export function generateMetadata(): Metadata {
  return layoutMetadatas
}

const RootLayout = async (props: {children: React.ReactNode; params: Promise<any>}) => {
  const params = await props.params

  const {children} = props

  const lang = params.lang
  return (
    <html {...getHtmlAttributes({lang})} {...{lang}}>
      <head>
        <StartDsfrOnHydration />
        <DsfrHead preloadFonts={['Marianne-Regular', 'Marianne-Medium', 'Marianne-Bold']} />
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

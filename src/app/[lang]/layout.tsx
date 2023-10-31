import React from 'react'

import App from './app'
import MuiSetup from './MuiSetup'
import {I18nProvider} from '../../i18n/I18n'
import {Metadata} from 'next'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {appConfig} from 'core/appConfig'

export function generateMetadata(): Metadata {
  return {
    title: 'SignalConso',
    description:
      "Signalez un problème au commerçant (magasins, commerces de proximité, cafés et restaurants...) et à la répression des fraudes : pratique d'hygiène, nourriture / boissons, matériel / objet, prix / paiement, publicité, services associés à l'achat.",
    metadataBase: new URL(appConfig.websiteBaseUrl),
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    openGraph: {
      images: [
        {
          url: '/icons/screenshot.png',
          secureUrl: '/icons/screenshot.png',
          type: 'image/jpeg',
          width: '1602',
          height: '1598',
        },
      ],
      title: 'image/jpeg',
      url: appConfig.websiteBaseUrl,
      type: 'website',
      description: "Signaler un problème à l'entreprise en toute transparence avec la répression des fraudes",
      siteName: 'SignalConso',
    },
    twitter: {
      title: 'SignalConso',
      description: "Signaler un problème à l'entreprise en toute transparence avec la répression des fraudes",
      images: '/icons/screenshot.png',
      card: 'summary',
    },
    appleWebApp: {
      title: 'SignalConso',
    },
    icons: [
      {
        rel: 'icon',
        url: '/icons/favicon.ico',
        type: 'image/x-icon',
      },
      {
        rel: 'shortcut',
        url: '/icons/icon57.png',
      },
      {
        rel: 'apple-touch-icon',
        url: '/icons/icon57.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        url: '/icons/icon72.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        url: '/icons/icon114.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        url: '/icons/icon144.png',
      },
    ],
  }
}

const RootLayout = ({children, params}: {children: React.ReactNode; params: any}) => {
  return (
    <html
      {...getHtmlAttributes({defaultColorScheme: 'light', lang: params.lang})}
      //NOTE: Scrollbar always visible to avoid layout shift when modal are opened
      style={{
        overflow: '-moz-scrollbars-vertical',
        overflowY: 'scroll',
      }}
      lang={params.lang}
    >
      <body>
        <I18nProvider lang={params.lang}>
          <MuiSetup>
            <DsfrProvider lang={params.lang}>
              <App>{children}</App>
            </DsfrProvider>
          </MuiSetup>
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout

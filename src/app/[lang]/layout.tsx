import React from 'react'

import App from './app'
import MuiSetup from './MuiSetup'
import {I18nProvider} from '../../i18n/I18n'
import {Metadata} from 'next'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'

export function generateMetadata(): Metadata {
  return {
    title: 'SignalConso',
    description:
      "Signalez un problème au commerçant (magasins, commerces de proximité, cafés et restaurants...) et à la répression des fraudes : pratique d'hygiène, nourriture / boissons, matériel / objet, prix / paiement, publicité, services associés à l'achat.",
    metadataBase: new URL('https://signal.conso.gouv.fr/'),
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
      url: 'https://signal.conso.gouv.fr/',
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
      {...getHtmlAttributes({defaultColorScheme: 'light'})}
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
            <App>{children}</App>
          </MuiSetup>
        </I18nProvider>
      </body>
    </html>
  )
}

export default RootLayout

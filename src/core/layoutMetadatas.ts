import {Metadata} from 'next'
import {appConfig} from './appConfig'

export const layoutMetadatas: Metadata = {
  title: 'SignalConso',
  description:
    "Signalez un problème au commerçant (magasins, commerces de proximité, cafés et restaurants...) et à la répression des fraudes : pratique d'hygiène, nourriture / boissons, matériel / objet, prix / paiement, publicité, services associés à l'achat.",
  metadataBase: new URL(appConfig.websiteBaseUrl),
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

import * as React from 'react'
import {DocumentProps, Head, Html, Main, NextScript} from 'next/document'
import {augmentDocumentWithEmotionCache, dsfrDocumentApi} from './_app'

const {getColorSchemeHtmlAttributes, augmentDocumentForDsfr} = dsfrDocumentApi

export default function Document(props: DocumentProps) {
  return (
    <Html lang="fr" {...getColorSchemeHtmlAttributes(props)}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/icons/screenshot.png" />
        <meta property="og:image:url" content="/icons/screenshot.png" />
        <meta property="og:image:secure_url" content="/icons/screenshot.png" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1602" />
        <meta property="og:image:height" content="1598" />
        <meta property="og:title" content="SignalConso" />
        <meta property="og:url" content="https://signal.conso.gouv.fr/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Signaler un problème à l'entreprise en toute transparence avec la répression des fraudes"
        />
        <meta property="og:site_name" content="SignalConso" />
        <meta name="twitter:title" content="SignalConso " />
        <meta
          name="twitter:description"
          content="Signaler un problème à l'entreprise en toute transparence avec la répression des fraudes"
        />
        <meta name="twitter:image" content="/icons/screenshot.png" />
        <meta name="twitter:card" content="/icons/screenshot.png" />
        <meta name="apple-mobile-web-app-title" content="SignalConso" />
        <base href="/" />
        <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" />
        <link rel="shortcut" href="/icons/icon57.png" />
        <link rel="apple-touch-icon" href="/icons/icon57.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon72.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/icon114.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon144.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="globals.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

augmentDocumentForDsfr(Document)

augmentDocumentWithEmotionCache(Document)

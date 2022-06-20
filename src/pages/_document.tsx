// import {Head, Html, Main, NextScript,} from 'next/document'
//
// export default function Document() {
//   return (
//     <Html>
//       <Head>
//        </Head>
//       <body>
//       <Main/>
//       <NextScript/>
//       </body>
//     </Html>
//   )
// }

import * as React from 'react'
import Document, {Head, Html, Main, NextScript} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from 'core/createEmotionCache'
import {appConfig} from '../conf/appConfig'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
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
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
          {/*<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />*/}
          {/*<link rel="preload" href="/font/Evolventa/Evolventa-Regular.woff2" as="font"/>*/}
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const {extractCriticalToChunks} = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: style.css}}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}

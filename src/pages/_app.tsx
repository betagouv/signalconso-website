import {CacheProvider, EmotionCache} from '@emotion/react'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {StyledEngineProvider} from '@mui/styled-engine'
import {Analytic} from 'analytic/analytic'
import {AnalyticProvider} from 'analytic/AnalyticContext'
import {ReportCreateProvider} from 'components_feature/Report/ReportCreateContext'
import {ReportFlowProvider} from 'components_feature/Report/ReportFlowContext'
import {Footer} from 'components_simple/Footer'
import {Header, headerHeight} from 'components_simple/Header'
import {ProvidersChain} from 'components_simple/ProvidersChain/ProvidersChain'
import {ApiClientsProvider} from 'context/ApiClientsContext'
import {ConfigProvider, useConfig} from 'context/ConfigContext'
import createEmotionCache from 'core/createEmotionCache'
import {scTheme} from 'core/theme'
import {I18nProvider} from 'i18n/I18n'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import {Atinternet} from 'plugins/atinternet'
import {Matomo} from 'plugins/matomo'
import {Sentry} from 'plugins/sentry'
import {useEffect, useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ToastProvider} from '../alexlibs/mui-extension/Toast/Toast'
import {appConfig} from '../core/appConfig'

interface ScAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient()

const App = ({emotionCache = clientSideEmotionCache, ...props}: ScAppProps) => {
  useEffect(() => {
    Sentry.init(appConfig)
    const matomo = Matomo.init({siteId: appConfig.matomo_siteId, url: appConfig.matomo_url})
    const atInternet = Atinternet.init()
    setAnalytic(Analytic.init({appConfig, matomo, atInternet}))
  }, [])
  const [analytic, setAnalytic] = useState<Analytic | undefined>()
  return (
    <ProvidersChain
      providers={[
        _ => <QueryClientProvider client={queryClient} children={_} />,
        _ => <ConfigProvider config={appConfig} children={_} />,
        _ => <AnalyticProvider analytic={analytic} children={_} />,
        _ => <CacheProvider value={emotionCache} children={_} />,
        _ => <StyledEngineProvider children={_} />,
        _ => <ThemeProvider theme={scTheme} children={_} />,
        _ => <I18nProvider children={_} />,
        _ => <ApiClientsProvider children={_} />,
        _ => <CssBaseline children={_} />,
        _ => <ToastProvider horizontal="right" children={_} />,
        _ => <ReportCreateProvider children={_} />,
        _ => <ReportFlowProvider children={_} />,
      ]}
    >
      <_App {...props} />
    </ProvidersChain>
  )
}

const _App = ({Component, pageProps, router}: AppProps) => {
  const {config} = useConfig()

  const isWebView = router.pathname.startsWith('/webview/') ?? router.query.app_type === 'mobile'
  return (
    <>
      <Head>
        <link rel="canonical" href={config.appBaseUrl + router.asPath} />
      </Head>
      {config.atInternet_siteId && !isWebView && (
        <Script
          type="text/javascript"
          src={`https://tag.aticdn.net/${config.atInternet_siteId}/smarttag.js`}
          strategy="afterInteractive"
        />
      )}
      <div className="root">
        {isWebView ? (
          <Box sx={{mt: 1}}>
            <Component {...pageProps} />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flex: 1,
                marginTop: `${headerHeight.normal}px`,
              }}
            >
              <Component {...pageProps} />
            </Box>
            <Header />
            <Footer />
          </>
        )}
      </div>
    </>
  )
}

export default App

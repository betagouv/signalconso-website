import {CacheProvider, EmotionCache} from '@emotion/react'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {StyledEngineProvider} from '@mui/styled-engine'
import {Analytic} from 'analytic/analytic'
import {AnalyticProvider} from 'analytic/AnalyticContext'
import {ReportFlowProvider} from 'components_feature/Report/ReportFlowContext'
import {Footer} from 'components_simple/Footer'
import {Header, headerHeight} from 'components_simple/Header'
import {Provide} from 'components_simple/Provide/Provide'
import {ApiClientsProvider} from 'context/ApiClientsContext'
import {ConfigProvider, useConfig} from 'context/ConfigContext'
import {ConstantProvider} from 'context/ConstantContext'
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
import {ToastProvider} from '../alexlibs/mui-extension/Toast/Toast'
import {appConfig} from '../core/appConfig'

interface ScAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const App = ({emotionCache = clientSideEmotionCache, ...props}: ScAppProps) => {
  useEffect(() => {
    Sentry.init(appConfig)
    const matomo = Matomo.init({siteId: appConfig.matomo_siteId, url: appConfig.matomo_url})
    const atInternet = Atinternet.init()
    setAnalytic(Analytic.init({appConfig, matomo, atInternet}))
  }, [])
  const [analytic, setAnalytic] = useState<Analytic | undefined>()
  return (
    <Provide
      providers={[
        _ => <ConfigProvider config={appConfig} children={_} />,
        _ => <AnalyticProvider analytic={analytic} children={_} />,
        _ => <CacheProvider value={emotionCache} children={_} />,
        _ => <StyledEngineProvider children={_} />,
        _ => <ThemeProvider theme={scTheme} children={_} />,
        _ => <I18nProvider children={_} />,
        _ => <ApiClientsProvider children={_} />,
        _ => <CssBaseline children={_} />,
        _ => <ToastProvider horizontal="right" children={_} />,
        _ => <ReportFlowProvider children={_} />,
        _ => <ConstantProvider children={_} />,
      ]}
    >
      <_App {...props} />
    </Provide>
  )
}

type AppPropsWithMaybeWebview = AppProps & {
  Component: {
    isWebView?: boolean
  }
}

const _App = ({Component, pageProps, router}: AppPropsWithMaybeWebview) => {
  const {config} = useConfig()
  const isWebView = Component.isWebView ?? router.query.app_type === 'mobile'
  return (
    <>
      (
      <Head>
        <link rel="canonical" href={config.appBaseUrl + router.asPath} />
      </Head>
      )
      {config.atInternet_siteId && !isWebView && (
        <Script
          type="text/javascript"
          src={`https://tag.aticdn.net/${config.atInternet_siteId}/smarttag.js`}
          strategy="beforeInteractive"
        />
      )}
      <div className="root">
        {isWebView ? (
          <Component {...pageProps} />
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

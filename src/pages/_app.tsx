import type {AppProps} from 'next/app'
import {StyledEngineProvider} from '@mui/styled-engine'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {Header, headerHeight} from 'components_simple/Header'
import {scTheme} from 'core/theme'
import {Provide} from 'components_simple/Provide/Provide'
import {Footer} from 'components_simple/Footer'
import {I18nProvider} from 'i18n/I18n'
import {ApiClientsProvider} from 'context/ApiClientsContext'
import {CacheProvider, EmotionCache} from '@emotion/react'
import createEmotionCache from 'core/createEmotionCache'
import {ToastProvider} from '../alexlibs/mui-extension/Toast/Toast'
import {ReportFlowProvider} from 'components_feature/Report/ReportFlowContext'
import {ConstantProvider} from 'context/ConstantContext'
import {appConfig} from '../core/appConfig'
import Script from 'next/script'
import {AnalyticProvider} from 'analytic/AnalyticContext'
import {Matomo} from 'plugins/matomo'
import {Sentry} from 'plugins/sentry'
import {Atinternet} from 'plugins/atinternet'
import {Analytic} from 'analytic/analytic'
import {useEffect, useState} from 'react'
import {ConfigProvider, useConfig} from 'context/ConfigContext'
import Head from 'next/head'
import {App as CapacitorApp} from '@capacitor/app'
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

    CapacitorApp.addListener('backButton', () => {
      window.history.back()
    })
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

const _App = ({Component, pageProps, router}: AppProps) => {
  const {config} = useConfig()
  return (
    <>
      <Head>
        <link rel="canonical" href={config.appBaseUrl + router.asPath} />
      </Head>
      {config.atInternet_siteId && (
        <Script
          type="text/javascript"
          src={`https://tag.aticdn.net/${config.atInternet_siteId}/smarttag.js`}
          strategy="beforeInteractive"
        />
      )}
      <div className="root">
        {/*<Head>*/}
        {/*  <meta name="theme-color" content={theme.palette.primary.main}/>*/}
        {/*</Head>*/}
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
      </div>
    </>
  )
}

export default App

import {createNextDsfrIntegrationApi} from '@codegouvfr/react-dsfr/next-pagesdir'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {AnalyticProvider} from 'analytic/AnalyticContext'
import {Analytic} from 'analytic/analytic'
import {ReportCreateProvider} from 'components_feature/Report/ReportCreateContext'
import {ReportFlowProvider} from 'components_feature/Report/ReportFlowContext'
import {ProvidersChain} from 'components_simple/ProvidersChain/ProvidersChain'
import {ScFooter} from 'components_simple/ScFooter'
import {ScHeader} from 'components_simple/ScHeader'
import {ApiClientsProvider} from 'context/ApiClientsContext'
import {ConfigProvider, useConfig} from 'context/ConfigContext'
import {scTheme} from 'core/theme'
import {I18nProvider} from 'i18n/I18n'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import {Matomo} from 'plugins/matomo'
import {Sentry} from 'plugins/sentry'
import {useEffect, useState} from 'react'
import {createEmotionSsrAdvancedApproach} from 'tss-react/next'
import {ToastProvider} from '../alexlibs/mui-extension/Toast/Toast'
import {appConfig} from '../core/appConfig'
import '../globals.css'
import {Eularian} from '../plugins/eularian'

declare module '@codegouvfr/react-dsfr/next-pagesdir' {
  interface RegisterLink {
    Link: typeof Link
  }
}

const {withDsfr, dsfrDocumentApi} = createNextDsfrIntegrationApi({
  defaultColorScheme: 'light',
  Link,
})

const {withAppEmotionCache, augmentDocumentWithEmotionCache} = createEmotionSsrAdvancedApproach({key: 'css'})

// const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient()

const App = (props: AppProps) => {
  useEffect(() => {
    Sentry.init(appConfig)
    const matomo = Matomo.init({siteId: appConfig.matomo_siteId, url: appConfig.matomo_url})
    const eularian = Eularian.init()
    setAnalytic(Analytic.init({appConfig, matomo, eularian}))
  }, [])
  const [analytic, setAnalytic] = useState<Analytic | undefined>()
  return (
    <ProvidersChain
      providers={[
        _ => <QueryClientProvider client={queryClient} children={_} />,
        _ => <ConfigProvider config={appConfig} children={_} />,
        _ => <AnalyticProvider analytic={analytic} children={_} />,
        // _ => <CacheProvider value={emotionCache} children={_} />,
        // _ => <StyledEngineProvider children={_} />,
        _ => <ThemeProvider theme={scTheme} children={_} />,
        _ => <I18nProvider children={_} />,
        _ => <ApiClientsProvider children={_} />,
        _ => <CssBaseline children={_} />,
        _ => <ToastProvider horizontal="right" children={_} />,
        _ => <ReportCreateProvider children={_} />,
        _ => <ReportFlowProvider children={_} />,
      ]}
    >
      <AppBase {...props} />
    </ProvidersChain>
  )
}

const AppBase = ({Component, pageProps, router}: AppProps) => {
  const {config} = useConfig()

  const isWebView = router.pathname.startsWith('/webview/') ?? router.query.app_type === 'mobile'
  return (
    <>
      <Head>
        <link rel="canonical" href={config.appBaseUrl + router.asPath} />
      </Head>
      {!isWebView && !config.isDev && (
        <Script
          nonce="eYhD6rb8vLVwXsAmnbKl/Q=="
          id="eulerian-analytics"
          dangerouslySetInnerHTML={{
            __html: `(function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})('wykp.signal.conso.gouv.fr','EA_push');`,
          }}
        />
      )}
      {/* fr-raw-link permet de désactiver le underline automatique du DSFR */}
      <div className="root fr-raw-link">
        {isWebView ? (
          <Box sx={{mt: 1}}>
            <Component {...pageProps} />
          </Box>
        ) : (
          <>
            <ScHeader />
            <Component {...pageProps} />
            <ScFooter />
          </>
        )}
      </div>
    </>
  )
}

export {dsfrDocumentApi}
export {augmentDocumentWithEmotionCache}
export default withDsfr(withAppEmotionCache(App))

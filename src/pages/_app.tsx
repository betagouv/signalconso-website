import type {AppProps} from 'next/app'
import {StyledEngineProvider} from '@mui/styled-engine'
import {Box, CssBaseline, ThemeProvider} from '@mui/material'
import {Header, headerHeight} from 'core/component/Header'
import {muiTheme} from 'core/theme/theme'
import {Provide} from 'shared/Provide/Provide'
import {Footer} from 'core/component/Footer'
import {I18nProvider} from 'core/i18n'
import {ApiSdkProvider} from 'core/context/ApiSdk'
import {CacheProvider, EmotionCache} from '@emotion/react'
import createEmotionCache from 'core/createEmotionCache'
import {ToastProvider} from 'mui-extension'
import {ReportFlowProvider} from 'feature/Report/ReportFlowContext'
import {ConstantProvider} from 'core/context/ConstantContext'
import {useEffect} from 'react'
import {appConfig} from '../conf/appConfig'
import Script from 'next/script'
import {AnalyticProvider} from '../core/analytic/AnalyticContext'
import {Matomo} from '../core/plugins/matomo'
import {Sentry} from '../core/plugins/sentry'

interface ScAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

const App = ({emotionCache = clientSideEmotionCache, ...props}: ScAppProps) => {
  return (
    <Provide
      providers={[
        _ => <AnalyticProvider children={_}/>,
        _ => <CacheProvider value={emotionCache} children={_}/>,
        _ => <StyledEngineProvider children={_}/>,
        _ => <ThemeProvider theme={muiTheme()} children={_}/>,
        _ => <I18nProvider children={_}/>,
        _ => <ApiSdkProvider children={_}/>,
        _ => <CssBaseline children={_}/>,
        _ => <ToastProvider horizontal="right" children={_}/>,
        _ => <ReportFlowProvider children={_}/>,
        _ => <ConstantProvider children={_}/>,
      ]}
    >
      <_App {...props} />
    </Provide>
  )
}

const _App = ({Component, pageProps}: AppProps) => {
  useEffect(() => {
    Sentry.init(appConfig)
    const matomo = new Matomo({siteId: appConfig.matomo_siteId, url: appConfig.matomo_url})
  })
  return (
    <>
      <Script type="text/javascript" src="https://tag.aticdn.net/618165/smarttag.js"/>
      <div className="root">
        {/*<Head>*/}
        {/*  <meta name="theme-color" content={theme.palette.primary.main}/>*/}
        {/*</Head>*/}
        <Box sx={{
          flex: 1,
          marginTop: `${headerHeight.normal}px`
        }}>
          <Component {...pageProps} />
        </Box>
        <Header/>
        <Footer/>
      </div>
    </>
  )
}

export default App

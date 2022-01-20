import type {AppProps} from 'next/app'
import {createGenerateClassName, StylesProvider} from '@mui/styles'
import {StyledEngineProvider} from '@mui/styled-engine'
import {CssBaseline, Theme, ThemeProvider, useTheme} from '@mui/material'
import {Header, headerHeight} from '../core/component/Header'
import {muiTheme} from '../core/theme/theme'
import {Provide} from '../shared/Provide/Provide'
import {useGlobalCss} from '../core/theme/globalCss'
import {Footer} from '../core/component/Footer'
import makeStyles from '@mui/styles/makeStyles'
import {I18nProvider} from '../core/i18n'
import {ApiSdkProvider} from '../core/context/ApiSdk'
import {CacheProvider, EmotionCache} from '@emotion/react'
import createEmotionCache from '../core/createEmotionCache'
import {ToastProvider} from 'mui-extension'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  disableGlobal: true,
})

interface ScAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

export default ({emotionCache = clientSideEmotionCache, ...props}: ScAppProps) => {
  return (
    <Provide
      providers={[
        _ => <CacheProvider value={emotionCache} children={_}/>,
        _ => <StylesProvider generateClassName={generateClassName} children={_}/>,
        _ => <StyledEngineProvider children={_}/>,
        _ => <ThemeProvider theme={muiTheme()} children={_}/>,
        _ => <I18nProvider children={_}/>,
        _ => <ApiSdkProvider children={_}/>,
        _ => <CssBaseline children={_}/>,
        _ => <ToastProvider horizontal="right" children={_}/>,
      ]}
    >
      <App {...props} />
    </Provide>
  )
}

export const useCss = makeStyles((t: Theme) => ({
  main: {
    marginTop: headerHeight.normal,
    // paddingTop: t.spacing(2),
    // paddingBottom: t.spacing(2),
  }
}))

const App = ({Component, pageProps}: AppProps) => {
  useGlobalCss()
  const css = useCss()
  const theme = useTheme()
  return (
    <div className="root">
      {/*<Head>*/}
      {/*  <meta name="theme-color" content={theme.palette.primary.main}/>*/}
      {/*</Head>*/}
      <main className={css.main}>
        <Component {...pageProps} />
      </main>
      <Header/>
      <Footer/>
    </div>
  )
}

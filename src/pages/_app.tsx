import type {AppProps} from 'next/app'
import {createGenerateClassName, StylesProvider} from '@mui/styles'
import {StyledEngineProvider} from '@mui/styled-engine'
import {Theme, ThemeProvider} from '@mui/material'
import {Header, headerHeight} from '../core/component/Header'
import {muiTheme} from '../core/theme/theme'
import {Provide} from '../shared/Provide/Provide'
import {useGlobalCss} from '../core/theme/globalCss'
import {Footer} from '../core/component/Footer'
import makeStyles from '@mui/styles/makeStyles'
import {I18nProvider} from '../core/i18n'

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  disableGlobal: true,
})

export default (props: AppProps) => {
  return (
    <Provide
      providers={[
        _ => <StylesProvider generateClassName={generateClassName} children={_}/>,
        _ => <StyledEngineProvider injectFirst children={_}/>,
        _ => <ThemeProvider theme={muiTheme()} children={_}/>,
        _ => <I18nProvider children={_}/>,
      ]}
    >
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      {/*<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />*/}
      <link rel="preload" href="/font/Evolventa/Evolventa-Regular.woff2" as="font"/>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      <App {...props} />
    </Provide>
  )
}

export const useCss = makeStyles((t: Theme) => ({
  main: {
    marginTop: headerHeight.normal,
    paddingTop: t.spacing(2),
    paddingBottom: t.spacing(2),
  }
}))

const App = ({Component, pageProps}: AppProps) => {
  useGlobalCss()
  const css = useCss()
  return (
    <div className="root">
      <main className={css.main}>
        <Component {...pageProps} />
      </main>
      <Header/>
      <Footer/>
    </div>
  )
}

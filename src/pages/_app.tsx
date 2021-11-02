import type {AppProps} from 'next/app'
import {I18nProvider} from '../core/i18n'
import {AppLangs} from '../core/i18n/I18n'
import {createGenerateClassName, StylesProvider} from '@mui/styles'
import {StyledEngineProvider} from '@mui/styled-engine'
import {ThemeProvider} from '@mui/material'
import {Header} from '../core/component/Header'
import {muiTheme} from '../core/theme/theme'
import {Provide} from '../shared/Provide/Provide'
import {useGlobalCss} from '../core/theme/globalCss'
import {Footer} from '../core/component/Footer'

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
        _ => <I18nProvider lang={AppLangs.fr} children={_}/>,
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

const App = ({Component, pageProps}: AppProps) => {
  useGlobalCss()
  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}

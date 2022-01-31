import React from 'react'
import {render} from '@testing-library/react'
import {muiTheme} from '../core/theme/theme'
import {ThemeProvider} from '@mui/material'
import {I18nProvider} from '../core/i18n'
import {ReportFlowProvider} from '../feature/Report/ReportFlowContext'
import {Provide} from '../shared/Provide/Provide'
import {ApiSdkProvider} from '../core/context/ApiSdk'
import {SignalConsoPublicSdk} from '../../../signalconso-api-sdk-js'

const AllTheProviders = (apiSdkMock: Partial<SignalConsoPublicSdk> = {}) => ({children}: any) => {
  return (
    <Provide
      providers={[
        _ => <ApiSdkProvider children={_} apiSdk={apiSdkMock as any}/>,
        _ => <ThemeProvider theme={muiTheme()} children={_}/>,
        _ => <I18nProvider children={_}/>,
        _ => <ReportFlowProvider children={_}/>,
      ]}>
      {children}
    </Provide>
  )
}

interface Options {
  apiSdkMock?: Partial<SignalConsoPublicSdk>
}

const customRender = (ui: React.ReactElement, options?: Options) => {
  return render(ui, {wrapper: AllTheProviders(options?.apiSdkMock), ...options})
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}

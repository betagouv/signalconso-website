'use client'

import {createTheme, ThemeProvider} from '@mui/material'
import {ReactNode} from 'react'
import {NextAppDirEmotionCacheProvider} from 'tss-react/next/appDir'

type Props = {
  children: ReactNode
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#000091',
    },
  },
})

const MuiThemeSetup = ({children}: Props) => {
  return (
    <>
      {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental `app/` directory feature.
          I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
      <NextAppDirEmotionCacheProvider options={{key: 'css'}}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  )
}

export default MuiThemeSetup

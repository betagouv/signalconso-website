import {red} from '@mui/material/colors'
import {alpha, createTheme, Theme} from '@mui/material'
import {ThemeOptions} from '@mui/material/styles/createTheme'

export const styleUtils = (t: Theme) => ({
  defaultRadius: 4,
  gridSpacing: 3 as any,
  fontSize: {
    big: t.typography.fontSize * 1.15,
    normal: t.typography.fontSize,
    small: t.typography.fontSize * 0.85,
    title: t.typography.fontSize * 1.3,
    bigTitle: t.typography.fontSize * 1.6,
  },
  spacing: (...args: number[]) => {
    const [top = 0, right = 0, bottom = 0, left = 0] = args ?? [1, 1, 2, 1]
    return `${t.spacing(top)} ${t.spacing(right)} ${t.spacing(bottom)} ${t.spacing(left)}`
  },
  color: {
    success: '#00b79f',
    error: '#cf0040',
    warning: '#FFB900',
    info: '#0288d1',
  },
  truncate: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  } as any,
})

export const defaultSpacing = 8

export const muiTheme = (dark?: boolean): Theme => {
  const defaultTheme = createTheme()
  const fontFamily = '"Open Sans", sans-serif'
  const colorMain = {
    base: '#2b7c9f',
    light: '#6fd3ff',
    dark: '#1c536b',
    // base: '#407e99',
    // light: '#6697ad',
    // dark: '#2c586b',
  }
  const colorSecondary = {
    base: '#1e2b50',
    light: '#1e2b50',
    dark: '#1e2b50',
  }
  const theme: ThemeOptions = {
    spacing: defaultSpacing,
    palette: {
      primary: {
        light: colorMain.light,
        main: colorMain.base,
        dark: colorMain.dark,
      },
      secondary: {
        light: colorSecondary.light,
        main: colorSecondary.base,
        dark: colorSecondary.dark,
      },
      error: red,
      mode: dark ? 'dark' : 'light',
    },
    shape: {
      borderRadius: 6,
    },
    typography: {
      fontSize: 15,
      fontFamily,
      // fontFamily: 'Evolventa, sans-serif',
      fontWeightBold: 600,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          '.material-icons': {
            display: 'inherit',
          },
          html: {
            fontSize: defaultTheme.typography.fontSize,
            color: defaultTheme.palette.text.primary,
          },
          '.root': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
          body: {
            lineHeight: '1.5',
            fontFamily,
            background: defaultTheme.palette.background.paper,
            margin: 0,
            color: defaultTheme.palette.text.primary,
            boxSizing: 'border-box',
          },
          main: {
            flex: 1,
          },
          ul: {
            marginTop: '.5em',
          },
          h1: defaultTheme.typography.h4,
          h2: {
            ...defaultTheme.typography.h6,
            marginBottom: defaultTheme.spacing(2),
            marginTop: defaultTheme.spacing(3),
          },
          p: {
            ...defaultTheme.typography.body1,
            textAlign: 'justify',
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
          },
          ':focus': {
            outline: 0,
          },
        },
      },
      //   styleOverrides: `
      //   @font-face {
      //     font-family: 'Evolventa';
      //     font-display: auto;
      //     src: local('Evolventa-Regular'),
      //          url('fonts/Evolventa/Evolventa-Regular.woff2') format('woff2'),
      //          url('fonts/Evolventa/Evolventa-Regular.woff') format('woff'),
      //          url('fonts/Evolventa/Evolventa-Regular.ttf') format('truetype'),
      //          url('fonts/Evolventa/Evolventa-Regular.eot') format('truetype');
      //     }
      //   `
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
          outlinedPrimary: {
            borderColor: defaultTheme.palette.divider,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 0,
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 40,
            minWidth: '80px !important',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          outlined: {
            borderColor: defaultTheme.palette.divider,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            minHeight: 42,
            [defaultTheme.breakpoints.up('xs')]: {
              minHeight: 42,
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            paddingBottom: 8,
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          sizeSmall: {
            marginBottom: -4,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0,
            minHeight: 50,
            height: 50,
            paddingRight: 8,
            paddingLeft: 8,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: defaultTheme.typography.fontSize,
            fontWeight: 'normal',
          },
        },
      },
      MuiIcon: {
        styleOverrides: {
          root: {
            width: 'auto',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            spacing: 6,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover $notchedOutline': {
              borderColor: alpha(colorMain.base, 0.7),
            },
          },
          notchedOutline: {
            transition: 'border-color 140ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            background: 'rgba(0,0,0,.02)',
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  }
  return createTheme({
    ...theme,
    ...(dark ? {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: '#d9dce0',
          },
        },
      },
    } : {} as any),
  })
}

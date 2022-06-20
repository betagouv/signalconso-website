import {red} from '@mui/material/colors'
import {alpha, createTheme, Theme} from '@mui/material'
import {ThemeOptions} from '@mui/material/styles/createTheme'
import {carouselCss} from 'shared/IllustrationStepper/StepIllustrations'

export const styleUtils = (t: Theme) => ({
  gridSpacing: 3 as any,
  fontSize: {
    big: t.typography.fontSize * 1.15,
    normal: t.typography.fontSize,
    small: t.typography.fontSize * 0.9,
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
  const fontFamily = '"Open Sans", sans-serif'
  const fontSize = 16
  const colorPrimary = {
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
  const baseTheme = createTheme({
    spacing: defaultSpacing,
    palette: {
      primary: {
        light: colorPrimary.light,
        main: colorPrimary.base,
        dark: colorPrimary.dark,
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
      borderRadius: 10,
    },
    typography: {
      // fontSize,
      fontFamily,
      // fontFamily: 'Evolventa, sans-serif',
      fontWeightBold: 500,
    },
  })
  const theme: ThemeOptions = {
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
            fontFamily,
            fontSize,
            color: baseTheme.palette.text.primary,
          },
          '.blog': {
            // fontSize: 16,
            a: {
              color: colorPrimary.base,
            },
            'li + li': {
              marginTop: defaultSpacing * 2,
            },
            ul: {
              marginTop: '.5em',
            },
          },
          '.root': {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          },
          body: {
            lineHeight: '1.5',
            fontFamily,
            background: baseTheme.palette.background.paper,
            margin: 0,
            color: baseTheme.palette.text.primary,
            boxSizing: 'border-box',
          },
          main: {
            flex: 1,
          },
          h1: {
            ...baseTheme.typography.h4,
            marginTop: 0,
          },
          h2: {
            ...baseTheme.typography.h5,
            marginTop: defaultSpacing * 4,
          },
          h3: {
            ...baseTheme.typography.h6,
            marginTop: defaultSpacing * 4,
          },
          h4: {
            ...baseTheme.typography.h6,
            fontSize: '1.25rem',
          },
          h6: {
            color: 'red',
            ...baseTheme.typography.h6,
            fontSize: '1.25rem',
          },
          blockquote: {
            color: baseTheme.palette.text.secondary,
            marginLeft: 0,
            paddingLeft: baseTheme.spacing(2),
            borderLeft: `2px solid ${baseTheme.palette.divider}`,
          },
          hr: {
            border: 'none',
            borderBottom: `1px solid ${baseTheme.palette.divider}`,
          },
          table: {
            background: baseTheme.palette.background.paper,
            border: `1px solid ${baseTheme.palette.divider}`,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 2,
            position: 'relative',
            width: '100%',
            borderCollapse: 'collapse',

            '& td': {
              fontWeight: 400,
              padding: '1em',
              textAlign: 'left',
              borderTop: `1px solid ${baseTheme.palette.divider}`,
            },
            '& th': {
              padding: '1em',
              textAlign: 'left',
            },
            '& thead th': {
              background: baseTheme.palette.action.disabledBackground,
              borderBottom: `1px solid ${baseTheme.palette.divider}`,
              // font-size: 0.875em,
              // font-weight: 700,
              textTransform: 'uppercase',
            },
          },
          //
          // 'table td, table th' {
          //     padding: 1em;
          //     text-align: left;
          //   }
          //
          // .table td {
          //     border-top: 1px solid #ebeff3;
          //     border-top: 1px solid $lighter-grey;
          //   }
          //
          // .table thead th {
          //     background: #fafbfc;
          //     background: $lightest-grey;
          //     border-bottom: 1px solid #c9d3df;
          //     border-bottom: 1px solid $theme-border-lighter;
          //     font-size: 0.875em;
          //     font-weight: 700;
          //     text-transform: uppercase;
          //   }
          //
          // .table:not(.no-hover) tr:hover {
          //     background: #fafbfc;
          //     background: $lightest-grey;
          //   }
          // h2: {
          //   ...baseTheme.typography.h6,
          //   marginBottom: baseTheme.spacing(2),
          //   marginTop: baseTheme.spacing(3),
          // },
          p: {
            textAlign: 'justify',
          },
          a: {
            color: 'inherit',
            textDecoration: 'none',
          },
          ':focus': {
            outline: 0,
          },
          ...carouselCss,
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
      MuiAutocomplete: {
        // styleOverrides: {
        //   endAdornment: {
        //     position: 'relative',
        //   },
        // }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
          outlinedPrimary: {
            borderColor: baseTheme.palette.divider,
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
            borderColor: baseTheme.palette.divider,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '1rem',
            minHeight: 42,
            [baseTheme.breakpoints.up('xs')]: {
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
            fontSize: baseTheme.typography.fontSize,
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
              borderColor: alpha(colorPrimary.base, 0.7),
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
    ...{...baseTheme, ...theme},
    ...(dark
      ? {
          MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: '#d9dce0',
              },
            },
          },
        }
      : ({} as any)),
  })
}

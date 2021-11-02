import {makeStyles} from '@mui/styles'
import {Theme} from '@mui/material'

export const useGlobalCss = makeStyles((t: Theme) => ({
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    '.material-icons': {
      display: 'inherit',
    },
    html: {
      fontSize: t.typography.fontSize,
      color: t.palette.text.primary,
    },
    body: {
      lineHeight: '1.5',
      fontFamily: t.typography.fontFamily,
      background: t.palette.background.paper,
      margin: 0,
      color: t.palette.text.primary,
      boxSizing: 'border-box',
    },
    ul: {
      marginTop: '.5em',
    },
    h1: t.typography.h4,
    h2: {
      ...t.typography.h6,
      marginBottom: t.spacing(2),
      marginTop: t.spacing(3),
    },
    p: {
      ...t.typography.body1,
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
}))

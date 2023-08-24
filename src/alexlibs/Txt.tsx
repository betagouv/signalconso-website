'use client'

import {Box, BoxProps, Skeleton} from '@mui/material'
import * as React from 'react'
import {forwardRef} from 'react'

interface Props extends BoxProps {
  bold?: boolean
  block?: boolean
  size?: 'big' | 'title' | 'small'
  color?: 'primary' | 'secondary' | 'disabled' | 'hint' | 'default' | 'error' | 'textsecondary'
  truncate?: boolean
  link?: boolean
  span?: boolean
  component?: 'h3' | 'h2' | 'h1' | 'p'
}

export const Txt = forwardRef(
  ({children, block, bold, size, link, color, truncate, span, sx, component, ...otherProps}: Props, ref: any) => {
    return (
      <Box
        {...(span ? {component: 'span'} : null)}
        {...(component ? {component} : null)}
        sx={{
          display: 'inline',
          lineHeight: '1.5',
          ...(size &&
            {
              title: {
                fontSize: '1.30rem',
              },
              big: {
                fontSize: '1.10rem',
              },
              small: {
                fontSize: '0.90rem',
              },
            }[size]),
          ...(color &&
            {
              primary: {
                color: (t: any) => t.palette.primary.main,
              },
              secondary: {
                color: (t: any) => t.palette.secondary.main,
              },
              textsecondary: {
                color: (t: any) => t.palette.text.secondary,
              },
              disabled: {
                color: (t: any) => t.palette.text.disabled,
              },
              hint: {
                color: (t: any) => t.palette.text.secondary,
              },
              error: {
                color: (t: any) => t.palette.error.main,
              },
              default: {
                color: (t: any) => t.palette.text.primary,
              },
            }[color]),
          ...(block && {
            display: 'block',
          }),
          ...(bold && {
            fontWeight: t => t.typography.fontWeightMedium,
          }),
          ...(link && {
            color: t => t.palette.primary.main,
          }),
          ...(truncate && {
            whiteSpace: 'nowrap' as any,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }),
          ...sx,
        }}
        {...otherProps}
        ref={ref}
      >
        {children}
      </Box>
    )
  },
)

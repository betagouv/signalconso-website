import React, {ReactElement, ReactNode} from 'react'
import {Box} from '@mui/material'
import {Txt} from 'mui-extension'
import {styleUtils} from '../../../core/theme/theme'

interface ConfirmationStepperProps {
  children: Array<ReactElement<ConfirmationStepProps>>
}

interface ConfirmationStepProps {
  title?: ReactNode
  children?: ReactNode
  index?: number
}

export const ConfirmationStepper = ({children}: ConfirmationStepperProps) => {
  return (
    <>
      {/*{children.map((child, index) =>*/}
      {/*  React.cloneElement(child, {...child.props, key: index, index})*/}
      {/*)}*/}
      {children}
    </>
  )
}

export const ConfirmationStep = ({
  title,
  children,
  index,
}: ConfirmationStepProps) => {
  const indexSize = 40
  return (
    <Box>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{
          mr: 2,
          height: indexSize,
          width: indexSize,
          fontSize: t => styleUtils(t).fontSize.big,
          fontWeight: t => t.typography.fontWeightBold,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: t => `1px solid ${t.palette.divider}`,
          borderRadius: indexSize,
        }}>
          {index}
        </Box>
        <Txt size="title">{title}</Txt>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

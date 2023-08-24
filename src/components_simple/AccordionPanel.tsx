import {Box, BoxProps, Collapse, Icon, IconButton} from '@mui/material'
import {ReactNode, useState} from 'react'
import {Txt} from './Txt'

export const AccordionPanels = ({children, ...props}: BoxProps) => {
  return <Box {...props}>{children}</Box>
}

export const AccordionPanel = ({
  title,
  desc,
  children,
  className,
  onOpen,
  ...props
}: {
  title: string
  desc?: string
  children: ReactNode
  onOpen?: () => void
} & BoxProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Box
      {...props}
      className={className + '-opened'}
      sx={{
        border: t => `1px solid ${t.palette.divider}`,
        ':not(:last-of-type)': {
          mt: '-1px',
          borderBottom: 'none',
        },
        ':first-of-type': {
          borderTopLeftRadius: t => t.shape.borderRadius,
          borderTopRightRadius: t => t.shape.borderRadius,
        },
        ':last-of-type': {
          borderBottomLeftRadius: t => t.shape.borderRadius,
          borderBottomRightRadius: t => t.shape.borderRadius,
        },
        ...(open && {
          borderLeft: t => `2px solid ${t.palette.primary.main} !important`,
        }),
      }}
    >
      <Box
        role="button"
        onClick={() => {
          setOpen(_ => {
            if (!_) {
              onOpen?.()
            }
            return !_
          })
        }}
        sx={{
          pr: 2,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          minHeight: 42,
          py: 1,
        }}
      >
        <IconButton size="small" color="primary" sx={{ml: 1, mr: 2}}>
          <Icon>{open ? 'expand_more' : 'chevron_right'}</Icon>
        </IconButton>
        <div>
          <h3 className="font-normal text-lg m-0">{title}</h3>
          <Txt color="hint" sx={{m: 0, p: 0}}>
            {desc}
          </Txt>
        </div>
      </Box>
      <Collapse in={open}>
        <Box
          aria-labelledby={props.id}
          sx={{
            px: 3,
            py: 1,
            borderTop: t => `1px solid ${t.palette.divider}`,
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

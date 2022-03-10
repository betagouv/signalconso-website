import {ReactNode, useState} from 'react'
import {Box, BoxProps, Collapse, Icon} from '@mui/material'
import {IconBtn} from 'mui-extension/lib'
import {Txt} from 'mui-extension'

export const AccordionPanels = ({
  children
}: {
  children: ReactNode
}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export const AccordionPanel = ({
  title,
  desc,
  children,
  className,
  ...props
}: {
  title: string
  desc?: string
  children: ReactNode
} & BoxProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Box {...props} className={className + '-opened'} sx={{
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
      ...open && {
        mb: 2,
        borderRadius: t => `${t.shape.borderRadius}px`,
        borderLeft: t => `2px solid ${t.palette.primary.main} !important`,
        // borderBottom: t => `1px solid ${t.palette.divider} !important`,
      },
    }}>
      <Box
        role="button"
        onClick={() => setOpen(_ => !_)}
        sx={{
          pr: 2,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          minHeight: 42,
          py: 1,
        }}
      >
        <IconBtn size="small" color="primary" sx={{ml: 1, mr: 2}}>
          <Icon>
            {open ? 'expand_more' : 'chevron_right'}
          </Icon>
        </IconBtn>
        <div>
          <Box component="h3" sx={{m: 0, p: 0, fontSize: t => `1.15rem !important`}}>{title}</Box>
          <Txt color="secondary" sx={{m: 0, p: 0, }}>{desc}</Txt>
        </div>
      </Box>
      <Collapse in={open}>
        <Box aria-labelledby={props.id} sx={{
          px: 3,
          py: 1,
          borderTop: t => `1px solid ${t.palette.divider}`
        }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

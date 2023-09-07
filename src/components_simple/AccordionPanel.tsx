import {Box, Collapse, Icon, IconButton} from '@mui/material'
import {ReactNode, useState} from 'react'

export const AccordionPanel = ({title, children}: {title: string; children: ReactNode}) => {
  const [open, setOpen] = useState(false)
  return (
    <Box
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
        </div>
      </Box>
      <Collapse in={open}>
        <Box
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

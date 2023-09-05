import {Box, Collapse, Icon} from '@mui/material'
import React, {ReactNode, useEffect, useState} from 'react'

interface Props {
  label: ReactNode
  children: ReactNode
  className?: string
}

export const AccordionInline = ({label, children, className = ''}: Props) => {
  const [innerOpen, setInnerOpen] = useState<boolean>(false)

  return (
    <div {...{className}}>
      <button
        className="flex items-center hover:underline text-base text-scbluefrance"
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setInnerOpen(_ => !_)
        }}
        aria-expanded={innerOpen}
      >
        {label}
        <Icon sx={{ml: 1}} fontSize="small">
          {innerOpen ? 'expand_less' : 'expand_more'}
        </Icon>
      </button>
      <Collapse in={innerOpen}>
        <div className="mt-2">{children}</div>
      </Collapse>
    </div>
  )
}

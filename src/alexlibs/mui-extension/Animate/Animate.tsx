import * as React from 'react'
import {useState} from 'react'
import {useTheme} from '@mui/material'
import {useTimeout} from '@alexandreannic/react-hooks-lib'

export interface AnimateProps {
  delay?: number,
  children: any,
}

export const Animate = ({children, delay}: AnimateProps) => {
  const [appeared, setAppeared] = useState<boolean>(false)
  const theme = useTheme()
  useTimeout(() => setAppeared(true), delay || 0)

  return React.cloneElement(children, {
    style: {
      transition: theme.transitions.create('all'),
      opacity: 0,
      transform: 'translateY(60px)',
      ...appeared && {
        opacity: 1,
        transform: 'translateY(0)',
      }
    }
  })
}

import * as React from 'react'
import {useMemo, useRef, useState} from 'react'
import {useTimeout} from '../../alexlibs/react-hooks-lib/reactHooksUtils'
import {useTheme} from '@mui/material'

export interface AnimateProps {
  children: any
  autoScrollTo?: boolean
}

let idCounter = 0

export const Animate = ({autoScrollTo = true, children}: AnimateProps) => {
  const theme = useTheme()
  const [appeared, setAppeared] = useState<boolean>(false)
  const ref = useRef(null)
  const id = useMemo(() => idCounter++, [])
  const animationDuration = 500
  const direction = 'Y'
  const offsetY = 90
  const translateAnimation = 50

  const scrollTo = () => {
    if (autoScrollTo && ref) {
      const el = document.querySelector('.Animate-scroll-' + id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offsetY - translateAnimation
        window.scrollTo({top: y, behavior: 'smooth'})
      }
    }
  }

  useTimeout(() => {
    setAppeared(true)
  }, 0)
  useTimeout(scrollTo, 0)

  return React.cloneElement(children, {
    className: (children.props.className ?? '') + (' Animate-scroll-' + id),
    style: {
      transition: theme.transitions.create('all', {duration: animationDuration, delay: 50}),
      opacity: 0,
      transform: `translate${direction}(${translateAnimation}px)`,
      ...(appeared
        ? {
            opacity: 1,
            transform: `translate${direction}(0)`,
          }
        : {}),
    },
  })
}

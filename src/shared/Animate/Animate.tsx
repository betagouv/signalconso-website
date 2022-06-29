import * as React from 'react'
import {useMemo, useRef, useState} from 'react'
import {useTimeout} from '../../alexlibs/react-hooks-lib'
import {useTheme} from '@mui/material'

export interface AnimateProps {
  direction?: 'X' | 'Y'
  delay?: number
  children: any
  autoScrollTo?: boolean
  animationDuration?: number
  translateAnimation?: number
  offsetY?: number
  animate?: boolean
}

let idCounter = 0

export const Animate = ({
  direction = 'Y',
  translateAnimation = 50,
  offsetY = 90,
  autoScrollTo = true,
  animate = true,
  children,
  delay,
  animationDuration = 500,
}: AnimateProps) => {
  const theme = useTheme()
  const [appeared, setAppeared] = useState<boolean>(false)
  const ref = useRef(null)
  const id = useMemo(() => idCounter++, [])

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
    if (animate) setAppeared(true)
  }, delay || 0)
  useTimeout(scrollTo, 0)

  return React.cloneElement(children, {
    className: (children.props.className ?? '') + (' Animate-scroll-' + id),
    style: {
      transition: theme.transitions.create('all', {duration: animationDuration, delay: 50}),
      opacity: 0,
      transform: `translate${direction}(${translateAnimation}px)`,
      ...(appeared || !animate
        ? {
            opacity: 1,
            transform: `translate${direction}(0)`,
          }
        : {}),
    },
  })
}

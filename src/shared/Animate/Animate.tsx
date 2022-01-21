import * as React from 'react'
import {useMemo, useRef, useState} from 'react'
import {useTimeout} from '@alexandreannic/react-hooks-lib'
import {useTheme} from '@mui/material'

export interface AnimateProps {
  delay?: number,
  children: any,
  autoScrollTo?: boolean
  animationDuration?: number
  translateAnimationY?: number
  offsetY?: number
  animate?: boolean
}

let idCounter = 0

export const Animate = ({
  translateAnimationY = 60,
  offsetY = 90,
  autoScrollTo,
  animate,
  children,
  delay,
  animationDuration = 200
}: AnimateProps) => {
  const theme = useTheme()
  const [appeared, setAppeared] = useState<boolean>(false)
  const ref = useRef(null)
  const id = useMemo(() => idCounter++, [])

  const scrollTo = () => {
    if (autoScrollTo && ref) {
      const el = document.querySelector('#Animate-scroll-' + id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offsetY - translateAnimationY
        window.scrollTo({top: y, behavior: 'smooth'})
      }
    }
  }

  useTimeout(() => {
    if (animate) setAppeared(true)
  }, delay || 0)
  useTimeout(scrollTo, 0)

  return React.cloneElement(children, {
    id: 'Animate-scroll-' + id,
    style: {
      transition: theme.transitions.create('all', {duration: animationDuration}),
      opacity: 0,
      transform: `translateY(${translateAnimationY}px)`,
      ...(appeared || !animate ? {
        opacity: 1,
        transform: 'translateY(0)',
      } : {})
    },
  })
}

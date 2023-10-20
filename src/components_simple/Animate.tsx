import * as React from 'react'
import {useId, useRef, useState} from 'react'
import {useTimeout} from '../hooks/useTimeout'
import {useTheme} from '@mui/material'
import {useAutoscrollContext} from 'context/AutoscrollContext'

export interface AnimateProps {
  children: React.ReactElement
  autoScrollTo?: boolean
}

// Wrap a child element
// When the child element is mounted, it will immediately appear with a small animation
// And optionally we will scroll to it
export const Animate = ({autoScrollTo = true, children}: AnimateProps) => {
  const {autoscrollEnabled} = useAutoscrollContext()

  const theme = useTheme()
  const [appeared, setAppeared] = useState<boolean>(false)
  const ref = useRef(null)
  const id = useId()

  // the element will appear a bit lower at first
  const startingTranslation = 50

  function scrollTo() {
    if (autoScrollTo && autoscrollEnabled && ref) {
      const el = document.getElementsByClassName('Animate-scroll-' + id)[0]
      if (el) {
        const offsetY = 90 // offset so we don't put the element at the very top of the window
        const y = el.getBoundingClientRect().top + window.scrollY - offsetY - startingTranslation
        window.scrollTo({top: y, behavior: 'smooth'})
      }
    }
  }

  useTimeout(() => {
    setAppeared(true)
    scrollTo()
  }, 0)

  const className = `${children.props.className ?? ''} Animate-scroll-${id}`

  return React.cloneElement(children, {
    className,
    style: {
      transition: theme.transitions.create('all', {duration: 500, delay: 50}),

      ...(appeared
        ? {
            opacity: 1,
            transform: `translateY(0)`,
          }
        : {opacity: 0, transform: `translateY(${startingTranslation}px)`}),
    },
  })
}

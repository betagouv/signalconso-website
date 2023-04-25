import {useEffect, useState} from 'react'

const breakpoints = {
  // same as DSFR
  sm: 576,
  md: 768,
  lg: 992,
  xl: 768,
}

// Listen to the device width in JS
// We should probably use CSS-based breakpoints instead, as much as possible

export const useBreakpoints = () => {
  const [isSmOrMore, setIsSmOrMore] = useState(true)
  const [isLgOrMore, setIsLgOrMore] = useState(true)

  useEffect(() => {
    function handleResize() {
      setIsSmOrMore(window.innerWidth >= breakpoints.sm)
      setIsLgOrMore(window.innerWidth >= breakpoints.lg)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isSmOrMore,
    isLgOrMore,
  }
}

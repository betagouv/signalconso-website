import {useEffect, useState} from 'react'

interface UseWindowWidthParams {
  breakpoints?: {
    xs: number,
    sm: number,
    md: number,
    lg: number,
  }
}

export interface WindowWidthHook {
  isXsOrLess: boolean
  isSmOrLess: boolean
  isMdOrLess: boolean
  isLgOrLess: boolean
  isLgOrMore: boolean
  isMobileWidthMax: boolean
  windowWidth: number
}

export const useWindowWidth = ({
  breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
  }
}: UseWindowWidthParams = {}): WindowWidthHook => {
  const [windowWidth, setWindowWidth] = useState(960)

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isXsOrLess: windowWidth < breakpoints.xs,
    isSmOrLess: windowWidth < breakpoints.sm,
    isMdOrLess: windowWidth < breakpoints.md,
    isLgOrLess: windowWidth < breakpoints.lg,
    isLgOrMore: windowWidth >= breakpoints.lg,
    isMobileWidthMax: windowWidth < breakpoints.md,
    windowWidth
  }
}

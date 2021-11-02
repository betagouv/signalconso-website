import {useEffect, useState} from 'react'

interface UseWindowWidthParams {
  breakpoints?: {
    xs: number,
    sm: number,
    md: number,
    lg: number,
  }
}

export const useWindowWidth = ({
  breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
  }
}: UseWindowWidthParams = {}) => {
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
    isXs: windowWidth < breakpoints.xs,
    isSm: windowWidth < breakpoints.sm,
    isMd: windowWidth < breakpoints.md,
    isLg: windowWidth < breakpoints.lg,
    isXl: windowWidth >= breakpoints.lg,
    windowWidth
  }
}

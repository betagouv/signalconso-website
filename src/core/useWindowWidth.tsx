import {useEffect, useState} from 'react'

interface UseWindowWidthParams {
  breakpoints?: {
    xs: number,
    sm: number,
    md: number,
    lg: number,
  }
}

// export interface WindowWidthHook {
//   isXsOrLess: boolean
//   isSmOrLess: boolean
//   isMdOrLess: boolean
//   isLgOrLess: boolean
//   isLgOrMore: boolean
//   isMobileWidthMax: boolean
//   windowWidth: number
//   switch?: <T, >(_: {
//     isXsOrLess?: T
//     isSmOrLess?: T
//     isMdOrLess?: T
//     isLgOrLess?: T
//     isLgOrMore?: T
//   }) => T
// }

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

  const isBreakpoints = {
    isXsOrLess: windowWidth < breakpoints.xs,
    isSmOrLess: windowWidth < breakpoints.sm,
    isMdOrLess: windowWidth < breakpoints.md,
    isLgOrLess: windowWidth < breakpoints.lg,
    isLgOrMore: windowWidth >= breakpoints.lg,
  }
  return {
    ...isBreakpoints,
    isMobileWidthMax: isBreakpoints.isMdOrLess,
    windowWidth,
    switch: <T, >(params: {
      isXsOrLess?: T
      isSmOrLess?: T
      isMdOrLess?: T
      isLgOrLess?: T
      isLgOrMore?: T
    }): T => {
      const key = Object.entries(isBreakpoints).reverse().find(([bp, active]) => !!active)![0] as keyof typeof params
      return params[key]!
    }
  }
}

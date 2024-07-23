import {useEffect, useState} from 'react'

function computeNextInterval(attempts: number) {
  if (attempts > 7) return null
  // 250ms after first attempt
  // then 500ms, 1000ms, 2000ms, 4000ms
  return 250 * Math.pow(2, attempts - 1)
}

// Hook to wait until an image is actually reachable
// Because when we try to show the thumbnail, the file might not be 100% uploaded yet
export function useImageLoaderWithRetries(src: string) {
  const [loaded, setLoaded] = useState(false)
  const [attempts, setAttempts] = useState(1)
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setLoaded(true)
    }
    img.onerror = () => {
      const interval = computeNextInterval(attempts)
      if (interval) {
        setTimeout(() => {
          // each time "attempts" change, we trigger the useEffect
          // so we will try again with a new Image
          setAttempts(_ => _ + 1)
        }, interval)
      }
    }
    img.src = src
    // cleanup
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, attempts])
  return loaded
}

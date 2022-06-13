import { useState, useRef, RefObject, useLayoutEffect } from 'react'

export const useResizeObserver = (candlesRef: RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState<{ width: number; height: number }>()
  const observer = useRef(
    new ResizeObserver((entries) => {
      // Only care about the first element, we expect one element ot be watched
      const { width, height } = entries[0].contentRect
      setSize({ width: Math.floor(width), height: Math.floor(height) })
    }),
  )
  useLayoutEffect(() => {
    const obsRef = observer.current
    if (candlesRef.current) {
      obsRef.observe(candlesRef.current)
    }
    return () => {
      obsRef.disconnect()
    }
  }, [candlesRef, observer])
  return size
}

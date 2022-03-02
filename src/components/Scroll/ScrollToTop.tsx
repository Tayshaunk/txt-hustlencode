import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

/**
 * Component scrolls to top of page on path change.
 * @returns 
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  // call the auto scroll on pathname change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

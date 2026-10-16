import { useLayoutEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import Nav from './Nav.jsx'
import CurrentlyWorkingOn from './CurrentlyWorkingOn.jsx'
import PageBridge from './PageBridge.jsx'
import './Layout.css'

function Layout() {
  const location = useLocation()
  const { pathname, hash, key } = location
  const [initialLocation] = useState(location)
  const navigationType = useNavigationType()
  const positions = useRef(new Map())
  // Router reports POP on every document load, including a refresh. A stored
  // history key alone does not mean the user pressed Back or Forward.
  const isHistoryNavigation = navigationType === 'POP' && (
    location !== initialLocation ||
    performance.getEntriesByType('navigation')[0]?.type === 'back_forward'
  )

  // React Router doesn't reset scroll on navigation by default, so without
  // this a page landed on mid-scroll (e.g. from a nav click) opens wherever
  // the previous page's scroll position happened to be.
  useLayoutEffect(() => {
    const savedPositions = positions.current
    const saved = savedPositions.get(key)
    let targetId = hash.slice(1)
    try { targetId = decodeURIComponent(targetId) } catch { /* Keep malformed hashes harmless. */ }
    const target = targetId && document.getElementById(targetId)
    if (target) {
      let top = 0
      for (let node = target; node; node = node.offsetParent) top += node.offsetTop
      window.scrollTo({ top: Math.max(0, top - (document.querySelector('.nav')?.offsetHeight ?? 0) - 16), behavior: 'instant' })
    } else if (navigationType === 'POP') {
      if (saved !== undefined) window.scrollTo({ top: saved, behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    let lastY = window.scrollY
    const remember = () => { lastY = window.scrollY }
    window.addEventListener('scroll', remember, { passive: true })
    return () => {
      savedPositions.set(key, lastY)
      window.removeEventListener('scroll', remember)
    }
  }, [pathname, hash, key, navigationType])

  return (
    <>
      <Nav />
      <main className="page-content">
        <Outlet context={{ isHistoryNavigation }} />
      </main>
      <CurrentlyWorkingOn />
      <PageBridge />
    </>
  )
}

export default Layout

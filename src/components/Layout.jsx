import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import CurrentlyWorkingOn from './CurrentlyWorkingOn.jsx'
import PageBridge from './PageBridge.jsx'
import './Layout.css'

function Layout() {
  const { pathname } = useLocation()

  // React Router doesn't reset scroll on navigation by default, so without
  // this a page landed on mid-scroll (e.g. from a nav click) opens wherever
  // the previous page's scroll position happened to be.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Nav />
      <main className="page-content">
        <Outlet />
      </main>
      <CurrentlyWorkingOn />
      <PageBridge />
    </>
  )
}

export default Layout

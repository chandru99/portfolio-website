import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'
import CurrentlyWorkingOn from './CurrentlyWorkingOn.jsx'
import PageBridge from './PageBridge.jsx'
import './Layout.css'

function Layout() {
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

import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ThemeToggle from './ThemeToggle.jsx'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './Nav.css'

const NAV_ITEMS = [
  { path: '/', label: 'Overview' },
  { path: '/experience', label: 'Experience' },
  { path: '/into', label: "What I'm Into" },
  { path: '/ask', label: 'Ask Anything' },
  { path: '/resume', label: 'Resume' },
]

function navLinkClassName({ isActive }) {
  return isActive ? 'nav-link nav-link-active' : 'nav-link'
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { pathname } = useLocation()

  const closeMenu = () => setIsOpen(false)

  // Layout's scroll reset only fires on a pathname change, so clicking Home
  // while already on Overview would otherwise do nothing.
  function handleHomeClick(event) {
    closeMenu()
    if (pathname !== '/') return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_BASE, ease: EASE_STANDARD }

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-bar">
        <NavLink to="/" className="nav-home" aria-label="Home — Overview" onClick={handleHomeClick}>
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M3 10.6 12 3.5l9 7.1" />
            <path d="M5.4 9.3V20h13.2V9.3" />
          </svg>
        </NavLink>

        <ul className="nav-links nav-links-desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === '/'} className={navLinkClassName}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* After the links on desktop, which puts it at the far right; at
            mobile widths the links are hidden, so it lands beside the
            hamburger without needing a second instance. */}
        <ThemeToggle />

        <motion.button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="nav-mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            id="nav-mobile-menu"
            className="nav-links-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={panelTransition}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={closeMenu}
                  className={navLinkClassName}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav

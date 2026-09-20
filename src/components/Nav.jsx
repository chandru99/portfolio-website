import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './Nav.css'

const NAV_ITEMS = [
  { path: '/', label: 'Overview' },
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

  const closeMenu = () => setIsOpen(false)

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_BASE, ease: EASE_STANDARD }

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-bar">
        <ul className="nav-links nav-links-desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.path === '/'} className={navLinkClassName}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="nav-mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
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

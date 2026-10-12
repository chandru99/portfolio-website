import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { toggleTheme, useTheme } from '../lib/theme.js'
import { DURATION_FAST, EASE_STANDARD } from '../lib/motion.js'
import './ThemeToggle.css'

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.25M12 19.25v2.25M4.22 4.22l1.6 1.6M18.18 18.18l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.22 19.78l1.6-1.6M18.18 5.82l1.6-1.6" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 14.9A8.75 8.75 0 0 1 9.1 3.5a8.75 8.75 0 1 0 11.4 11.4Z" />
    </svg>
  )
}

function ThemeToggle() {
  const theme = useTheme()
  const shouldReduceMotion = useReducedMotion()

  const isDark = theme === 'dark'
  // The icon shows the destination, not the current state: a sun means
  // "go light".
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  const iconTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_FAST, ease: EASE_STANDARD }

  return (
    <>
      <motion.button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={theme}
            className="theme-toggle-icon"
            initial={shouldReduceMotion ? false : { opacity: 0, rotate: -40 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 40 }}
            transition={iconTransition}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* The button's label describes the action, so it can't also describe
          the current state without contradicting itself (an aria-pressed
          toggle here reads as "pressed: switch to dark mode"). This status
          region carries the state instead, and announces the result when it
          changes. */}
      <span className="theme-toggle-status" role="status">
        {isDark ? 'Dark mode' : 'Light mode'}
      </span>
    </>
  )
}

export default ThemeToggle

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AVATAR_SRC } from '../data/avatar.js'
import { DURATION_BASE, DURATION_SLOW, EASE_STANDARD } from '../lib/motion.js'
import './Intro.css'

// How long the intro holds on screen before auto-dismissing. Not sourced
// from the motion tokens: those (150/300/500ms) are transition durations
// for UI feedback, not "how long to display a full screen" — this is a
// one-off specific to this component.
const AUTO_DISMISS_MS = 3500

function Intro({ onDismiss }) {
  const shouldReduceMotion = useReducedMotion()
  const skipButtonRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    skipButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const exitTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_SLOW, ease: EASE_STANDARD }

  const avatarTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_BASE, ease: EASE_STANDARD }

  const greetingTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_BASE, ease: EASE_STANDARD, delay: DURATION_BASE }

  return (
    <motion.div
      className="intro"
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
      exit={{ opacity: 0 }}
      transition={exitTransition}
    >
      <motion.img
        src={AVATAR_SRC}
        alt=""
        className="intro-avatar"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={avatarTransition}
      />

      <motion.p
        className="intro-greeting"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={greetingTransition}
      >
        Hey, I'm Chandra.
      </motion.p>

      <button ref={skipButtonRef} type="button" className="intro-skip" onClick={onDismiss}>
        Skip
      </button>
    </motion.div>
  )
}

export default Intro

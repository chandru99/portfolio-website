import { useReducedMotion } from 'framer-motion'
import { scrollToSection } from '../lib/scrollToSection.js'
import './ScrollCue.css'

function ScrollCue({ targetId, label, onContinue }) {
  const shouldReduceMotion = useReducedMotion()

  function handleClick() {
    onContinue?.()
    scrollToSection(targetId, shouldReduceMotion)
  }

  return (
    <button type="button" className="scroll-cue" onClick={handleClick} aria-label={label}>
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </button>
  )
}

export default ScrollCue
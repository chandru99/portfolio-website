import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './HeroHeading.css'

// Typing cadence. 20 characters at 48ms lands the line just under a second,
// with a beat at the line break so the name reads as its own thought.
const CHAR_MS = 48
const LINE_BREAK_MS = 260

// Keeps an empty line's box open at full line-height, so the heading does
// not grow as it types and shove the rest of the hero down.
const ZERO_WIDTH_SPACE = '​'

function HeroHeading({ greeting, name, onComplete }) {
  const shouldReduceMotion = useReducedMotion()
  const total = greeting.length + name.length

  const [typed, setTyped] = useState(0)
  const count = shouldReduceMotion ? total : typed
  const complete = count >= total

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete?.()
      return undefined
    }

    let index = 0
    let timer

    const step = () => {
      index += 1
      setTyped(index)
      if (index >= total) {
        onComplete?.()
        return
      }
      // Pause a beat once the greeting is done, before the name starts.
      timer = setTimeout(step, index === greeting.length ? LINE_BREAK_MS : CHAR_MS)
    }

    timer = setTimeout(step, CHAR_MS)
    return () => clearTimeout(timer)
  }, [greeting.length, total, onComplete, shouldReduceMotion])

  const greetingShown = greeting.slice(0, Math.min(count, greeting.length))
  const nameShown = name.slice(0, Math.max(0, count - greeting.length))
  // The caret sits at the end of whichever line is still being typed.
  const caretOnName = count > greeting.length
  const showCaret = !shouldReduceMotion && !complete

  return (
    <h1 className="hero-heading" aria-label={`${greeting} ${name}`}>
      <span className="hero-heading-line" aria-hidden="true">
        {greetingShown}
        {ZERO_WIDTH_SPACE}
        {showCaret && !caretOnName && <span className="hero-heading-cursor" />}
      </span>
      <span className="hero-heading-line hero-heading-name" aria-hidden="true">
        {nameShown}
        {ZERO_WIDTH_SPACE}
        {showCaret && caretOnName && <span className="hero-heading-cursor" />}
      </span>
    </h1>
  )
}

export default HeroHeading

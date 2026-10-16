import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './HeroHeading.css'

const WORD_STAGGER = 0.2

function HeroHeading({ greeting, name, onComplete }) {
  const shouldReduceMotion = useReducedMotion()
  const [complete, setComplete] = useState(false)
  const words = greeting.split(' ')

  function wordMotion(index, last = false) {
    const immediate = shouldReduceMotion || index === 0
    return {
      // "Hi," is already visible on the first hero paint, beside the photo.
      initial: immediate ? false : { opacity: 0, y: '0.14em' },
      animate: 'visible',
      variants: {
        visible: { opacity: 1, y: 0 },
      },
      transition: {
        duration: immediate ? 0 : DURATION_BASE,
        delay: immediate ? 0 : index * WORD_STAGGER,
        ease: EASE_STANDARD,
      },
      onAnimationComplete: last ? (definition) => {
        if (definition !== 'visible') return
        setComplete(true)
        onComplete?.()
      } : undefined,
    }
  }

  return (
    <h1 className="hero-heading" aria-label={`${greeting} ${name}`}>
      {/* Every word occupies its final position from the first render. */}
      <span className="hero-heading-line" aria-hidden="true">
        {words.map((word, index) => (
          <motion.span key={index} className="hero-heading-word" {...wordMotion(index)}>
            {word}
          </motion.span>
        ))}
      </span>
      <span className="hero-heading-line hero-heading-name" aria-hidden="true">
        <motion.span className="hero-heading-word" {...wordMotion(words.length, true)}>
          {name}
        </motion.span>
        {!shouldReduceMotion && !complete && (
          <span className="hero-heading-cursor" />
        )}
      </span>
    </h1>
  )
}

export default HeroHeading

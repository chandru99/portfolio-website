import { motion, useReducedMotion } from 'framer-motion'
import { sections } from '../data/whatImIntoContent.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './WhatImInto.css'

function WhatImInto() {
  const shouldReduceMotion = useReducedMotion()

  // Under reduced motion, no motion props at all: the sections are plain,
  // fully visible elements from the first paint.
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
      }

  return (
    <div className="into">
      <h1 className="into-title">What I'm Into</h1>

      {sections.map((section) => (
        <motion.section
          key={section.id}
          className={`into-section into-section-${section.id}`}
          aria-labelledby={`into-${section.id}-heading`}
          {...reveal}
        >
          <h2 id={`into-${section.id}-heading`} className="into-heading">
            {section.heading}
          </h2>
          <p className="into-body">{section.body}</p>
        </motion.section>
      ))}
    </div>
  )
}

export default WhatImInto

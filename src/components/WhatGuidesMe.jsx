import { motion, useReducedMotion } from 'framer-motion'
import { philosophy } from '../data/overviewContent.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './WhatGuidesMe.css'

// A short transition between the hero and Projects, not a full screen of
// its own — see the height cap in WhatGuidesMe.css.
function WhatGuidesMe() {
  const shouldReduceMotion = useReducedMotion()

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
      }

  return (
    <motion.section
      id="what-guides-me"
      className="guides"
      aria-labelledby="what-guides-me-heading"
      {...reveal}
    >
      <h2 id="what-guides-me-heading" className="guides-heading">
        {philosophy.heading}
      </h2>

      <p className="guides-quote">
        {philosophy.quote.map((segment, index) => (
          <span key={index} className={segment.accent ? 'guides-accent' : undefined}>
            {segment.text}
          </span>
        ))}
      </p>
    </motion.section>
  )
}

export default WhatGuidesMe

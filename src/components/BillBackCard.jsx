import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DURATION_BASE, DURATION_FAST, EASE_STANDARD } from '../lib/motion.js'
import './BillBackCard.css'

const cardVariants = {
  idle: { scale: 1, opacity: 1 },
  leaving: { scale: 1.03, opacity: 0 },
}

function BillBackCard({ name, description, url }) {
  const shouldReduceMotion = useReducedMotion()
  const [isLeaving, setIsLeaving] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  function handleClick(event) {
    // Reduced motion: let the anchor's own target="_blank" open the tab now.
    if (shouldReduceMotion) return

    event.preventDefault()
    if (isLeaving) return

    setIsLeaving(true)
    timeoutRef.current = setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer')
      setIsLeaving(false)
    }, DURATION_BASE * 1000)
  }

  const hostname = new URL(url).hostname.replace(/^www\./, '')

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="billback-card"
      onClick={handleClick}
      variants={cardVariants}
      animate={isLeaving ? 'leaving' : 'idle'}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{
        default: { duration: DURATION_BASE, ease: EASE_STANDARD },
        y: { duration: DURATION_FAST, ease: EASE_STANDARD },
      }}
    >
      <p className="billback-card-text">
        <span className="billback-card-name">{name}</span> — {description}
      </p>
      <span className="billback-card-link">{hostname} ↗</span>
    </motion.a>
  )
}

export default BillBackCard

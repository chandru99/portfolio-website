import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './SplitLines.css'

const LINE_STAGGER = 0.14

// Visual lines are a product of layout, not of the copy, so they have to be
// measured rather than hard-coded: a sentence that wraps twice on desktop
// wraps three times on a phone. Walking the text node word by word and
// grouping by the top of each word's client rect gives the real line boxes.
function measureLines(element) {
  const node = element.firstChild
  if (!node || node.nodeType !== Node.TEXT_NODE) return null

  const text = node.textContent
  const range = document.createRange()
  const lines = []
  let current = null

  for (const match of text.matchAll(/\S+/g)) {
    range.setStart(node, match.index)
    range.setEnd(node, match.index + match[0].length)
    const { top } = range.getBoundingClientRect()

    if (!current || Math.abs(top - current.top) > 1) {
      current = { top, words: [] }
      lines.push(current)
    }
    current.words.push(match[0])
  }

  return lines.map((line) => line.words.join(' '))
}

function SplitLines({ text, className, ready, onComplete, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  const measureRef = useRef(null)
  const [lines, setLines] = useState(null)

  useLayoutEffect(() => {
    if (shouldReduceMotion) return undefined
    const element = measureRef.current
    if (!element) return undefined

    const update = () => setLines(measureLines(element))
    update()

    // The hidden copy keeps its plain text, so re-measuring after a resize
    // still sees real wrapping rather than the already-split markup.
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [text, shouldReduceMotion])

  if (shouldReduceMotion) {
    return <p className={className}>{text}</p>
  }

  return (
    <p className={`${className} split-lines`}>
      <span className="split-lines-measure" ref={measureRef} aria-hidden="true">
        {text}
      </span>

      <span className="split-lines-live">
        {(lines ?? []).map((line, index) => (
          <span className="split-lines-mask" key={`${index}-${line}`}>
            <motion.span
              className="split-lines-line"
              initial={{ y: '110%' }}
              animate={ready ? { y: '0%' } : { y: '110%' }}
              transition={{
                duration: DURATION_BASE,
                ease: EASE_STANDARD,
                delay: ready ? delay + index * LINE_STAGGER : 0,
              }}
              onAnimationComplete={
                ready && index === lines.length - 1 ? onComplete : undefined
              }
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </p>
  )
}

export default SplitLines

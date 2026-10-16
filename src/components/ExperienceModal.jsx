import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { UNDOCUMENTED } from '../data/experienceContent.js'
import { DURATION_FAST, EASE_STANDARD } from '../lib/motion.js'
import './ExperienceModal.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function SituationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function ActionIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  )
}

function ImpactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 20V10" />
      <path d="M12 20V4" />
      <path d="M19 20v-7" />
    </svg>
  )
}

// The artwork is optional. The frame renders its placeholder first and only
// fades a real file in once it has decoded, so a missing asset degrades to
// the placeholder instead of a broken image.
function DialogMedia({ image, title }) {
  // The dialog is keyed by item id, so this remounts per experience and
  // needs no reset when the source changes.
  const [state, setState] = useState('loading')

  return (
    <div className={`xp-modal-media is-${state}`}>
      {image?.src ? (
        <img
          src={image.src}
          alt={image.alt || ''}
          onLoad={() => setState('ready')}
          onError={() => setState('missing')}
        />
      ) : null}

      {state !== 'ready' && (
        <span className="xp-modal-media-placeholder" aria-hidden="true">
          {title}
        </span>
      )}
    </div>
  )
}

function DetailRow({ icon, label, value }) {
  const missing = !value
  return (
    <div className="xp-modal-row">
      <span className="xp-modal-row-icon" aria-hidden="true">
        {icon}
      </span>
      <div className="xp-modal-row-body">
        <p className="xp-modal-row-label">{label}</p>
        <p className={`xp-modal-row-text${missing ? ' is-undocumented' : ''}`}>
          {value || UNDOCUMENTED}
        </p>
      </div>
    </div>
  )
}

function Dialog({ entry, onClose, triggerRef }) {
  const { item, company, role } = entry
  const dialogRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const titleId = `xp-modal-title-${item.id}`

  // Hold the page still behind the dialog, and keep its width: removing the
  // scrollbar without compensating shifts the whole layout sideways.
  useEffect(() => {
    const { body, documentElement } = document
    const gap = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [])

  // Send focus into the dialog, and put it back on the + button that opened
  // it once the dialog goes away.
  useEffect(() => {
    const trigger = triggerRef.current
    dialogRef.current?.focus()
    return () => {
      if (trigger?.isConnected) trigger.focus()
    }
  }, [triggerRef])

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = [...(dialogRef.current?.querySelectorAll(FOCUSABLE) ?? [])]
      if (!nodes.length) {
        event.preventDefault()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      // Wrap at both ends so Tab can never reach the page behind.
      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  const fade = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.97, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: 4 },
      }

  return (
    <motion.div
      className="xp-modal-scrim"
      // A click that starts inside the dialog and drags out shouldn't close
      // it, so only a press that both starts and ends on the scrim counts.
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION_FAST, ease: EASE_STANDARD }}
    >
      <motion.div
        className="xp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
        onKeyDown={onKeyDown}
        {...fade}
        transition={{ duration: DURATION_FAST, ease: EASE_STANDARD }}
      >
        <header className="xp-modal-head">
          <div>
            <p className="xp-modal-context">
              <span>{company.name}</span>
              <span className="xp-modal-context-sep" aria-hidden="true">·</span>
              <span>{role.title}</span>
            </p>
            <h2 className="xp-modal-title" id={titleId}>
              {item.title}
            </h2>
          </div>

          <button type="button" className="xp-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="xp-modal-body">
          <DialogMedia image={item.image} title={item.title} />

          <div className="xp-modal-rows">
            <DetailRow icon={<SituationIcon />} label="Situation" value={item.situation} />
            <DetailRow icon={<ActionIcon />} label="Action" value={item.action} />
            <DetailRow icon={<ImpactIcon />} label="Impact" value={item.impact} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ExperienceModal({ entry, onClose, triggerRef }) {
  if (typeof document === 'undefined') return null

  return createPortal(
    // Portalled to the body on purpose: the rows sit inside Framer Motion
    // elements that carry transforms, and a transformed ancestor becomes the
    // containing block for position: fixed, which would trap the overlay
    // inside the row instead of covering the viewport.
    <AnimatePresence>
      {entry ? (
        <Dialog key={entry.item.id} entry={entry} onClose={onClose} triggerRef={triggerRef} />
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default ExperienceModal

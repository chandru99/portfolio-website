import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import TagRow from '../components/TagRow.jsx'
import ExperienceConnectors from '../components/ExperienceConnectors.jsx'
import ExperienceModal from '../components/ExperienceModal.jsx'
import { intro, companies, education, skills } from '../data/experienceContent.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './Experience.css'

// The company name is already set in type beside this, so the fallback is a
// monogram rather than the name again. A real logo file replaces it the
// moment one decodes; a missing file simply never swaps in.
function CompanyLogo({ company }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span className="xp-logo">
      {company.logo?.src ? (
        <img
          src={company.logo.src}
          alt=""
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      ) : null}

      {!loaded && (
        <span className="xp-logo-monogram" aria-hidden="true">
          {company.monogram}
        </span>
      )}
    </span>
  )
}

function PromotionMark() {
  return (
    // Sits directly above the role that was stepped up into, so the arrow
    // and the words both point the same way: Analyst -> Consultant.
    <span className="xp-promotion">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
      </svg>
      <span className="xp-promotion-label">Promoted to</span>
    </span>
  )
}

// One slim row: the title and the + that opens its dialog. Nothing else, by
// design — the detail lives in the dialog.
function ExperienceRow({ item, onOpen, innerRef }) {
  return (
    <li className="xp-item" ref={innerRef}>
      <span className="xp-item-title">{item.title}</span>

      <button
        type="button"
        className="xp-item-open"
        onClick={(event) => onOpen(item, event.currentTarget)}
        aria-label={`View details: ${item.title}`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </li>
  )
}

// Splits a company's experiences into its role levels. Deloitte is the only
// one with two, and its groups run newest first like the rest of the page
// while the card lists the roles oldest first to draw the promotion upward.
function roleGroups(company) {
  if (company.roles.length < 2) {
    return [{ role: company.roles[0], items: company.items, labelled: false }]
  }
  return [...company.roles]
    .reverse()
    .map((role) => ({
      role,
      items: company.items.filter((item) => item.roleId === role.id),
      labelled: true,
    }))
    .filter((group) => group.items.length > 0)
}

function CompanyEntry({ company, index, revealed, expanded, reduced, onToggle, onOpen, registerRow }) {
  // The connector code measures against a ref object, while the page needs
  // the same node for its observer, so the callback does both.
  const rowRef = useRef(null)
  const cardRef = useRef(null)
  const itemRefs = useRef([])
  const panelId = `xp-panel-${company.id}`
  const groups = roleGroups(company)

  let flatIndex = 0

  return (
    <motion.li
      className="xp-row"
      data-index={index}
      data-expanded={expanded || undefined}
      ref={(node) => {
        rowRef.current = node
        registerRow(node)
      }}
      // Position-only: the compact transition moves rows but never rescales
      // them, so text is never animated through a blurry scale.
      layout={reduced ? false : 'position'}
      transition={{ duration: 0.45, ease: EASE_STANDARD }}
    >
      {/* The reveal rides the slot rather than the row so it never competes
          with the row's own layout animation for the transform. */}
      <motion.div
        className="xp-company-slot"
        initial={false}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 18 }}
        transition={{ duration: DURATION_BASE, ease: EASE_STANDARD }}
      >
        <span className="xp-dot" aria-hidden="true" />

        {/* The connector starts at this element's vertical centre, so it is
            the whole card — using just the header would start the line above
            the card's middle and break the single-experience straight run. */}
        <article className="xp-company" ref={cardRef}>
          <div className="xp-company-head">
            <CompanyLogo company={company} />

            <div className="xp-company-identity">
              <h2 className="xp-company-name">{company.name}</h2>
              <p className="xp-meta">
                <span>{company.dates}</span>
                {company.location ? (
                  <>
                    <span className="xp-meta-sep" aria-hidden="true">·</span>
                    <span>{company.location}</span>
                  </>
                ) : null}
              </p>
            </div>

            <button
              type="button"
              className="xp-expand"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => onToggle(company.id)}
              aria-label={
                expanded
                  ? `Hide ${company.name} experiences`
                  : `Show ${company.name} experiences`
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M5 12h13M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <ol className="xp-roles">
            {company.roles.map((role) => (
              <li key={role.id} className="xp-role">
                {role.promotion ? <PromotionMark /> : null}
                <p className="xp-role-title">{role.title}</p>
                <p className="xp-role-dates">{role.dates}</p>
              </li>
            ))}
          </ol>
        </article>
      </motion.div>

      {/* Kept a direct child of the row: the SVG's coordinate space is the
          row, which is what the measurement code expects. */}
      {expanded && (
        <ExperienceConnectors
          id={company.id}
          rowRef={rowRef}
          sourceRef={cardRef}
          targetRefs={itemRefs}
        />
      )}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="xp-panel"
            id={panelId}
            // Only opacity animates. The row reaches its final height at
            // once, so the connectors measure settled geometry instead of
            // chasing a growing box.
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_STANDARD }}
          >
            {groups.map((group) => (
              <section
                className="xp-group"
                key={group.role.id}
                aria-label={group.labelled ? group.role.title : undefined}
              >
                {group.labelled && <p className="xp-group-label">{group.role.title}</p>}

                <ul className="xp-items">
                  {group.items.map((item) => {
                    const slot = flatIndex++
                    return (
                      <ExperienceRow
                        key={item.id}
                        item={item}
                        innerRef={(node) => {
                          itemRefs.current[slot] = node
                        }}
                        onOpen={(openedItem, trigger) =>
                          onOpen(openedItem, company, group.role, trigger)
                        }
                      />
                    )
                  })}
                </ul>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

function Experience() {
  const reduced = useReducedMotion()
  const timelineRef = useRef(null)
  const rowRefs = useRef([])
  const anchorTop = useRef(null)

  // Reduced motion skips the whole storytelling sequence and lands straight
  // on the readable overview.
  const [revealed, setRevealed] = useState(reduced ? companies.length : 0)
  const [stage, setStage] = useState(reduced ? 'overview' : 'reveal')
  // A set, not a single id: opening one company leaves any other open
  // company exactly as it was.
  const [expandedIds, setExpandedIds] = useState(() => new Set())

  const [entry, setEntry] = useState(null)
  const triggerRef = useRef(null)

  // ---- the rail draws itself as the page scrolls -----------------------
  // Stable across renders that don't change which companies are open.
  const expandedKey = [...expandedIds].sort().join('|')

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 60%'],
  })
  const drawn = useMotionValue(reduced ? 1 : 0)

  // Grows only. Scrolling back up leaves the line where it got to, which is
  // what keeps the reveal from replaying.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value > drawn.get()) drawn.set(value)
  })

  useEffect(() => {
    if (stage === 'overview') drawn.set(1)
  }, [stage, drawn])

  // ---- reveal each company once ----------------------------------------
  // Mirrors `revealed` so the observer can read the running count without
  // the callback having to be rebuilt on every reveal.
  const revealedRef = useRef(reduced ? companies.length : 0)

  useEffect(() => {
    if (reduced) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((item) => {
          if (!item.isIntersecting) return
          // Seen once is seen for good.
          observer.unobserve(item.target)

          const count = Number(item.target.dataset.index) + 1
          if (count <= revealedRef.current) return
          revealedRef.current = count
          setRevealed(count)

          // The last company landing is what zooms the journey out. The
          // anchor is measured here, before the layout changes, so the
          // correction below can put the visitor back where they were.
          if (count >= companies.length) {
            const last = rowRefs.current[companies.length - 1]
            anchorTop.current = last ? last.getBoundingClientRect().top : null
            setStage('overview')
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    rowRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [reduced])

  // Compacting shortens the document, and the rows reach their final layout
  // in one step while Framer animates the positions with transforms. Scroll
  // is deliberately left alone: correcting it here would be counted twice —
  // once by the scroll change and once by Framer — which threw the last card
  // 249px down before it slid back. Leaving it be gives one clean glide
  // upward, which is the zoom-out this stage is meant to read as. The only
  // intervention is for the browser clamping scroll when the page becomes
  // shorter than the current offset, which would be an abrupt jump nothing
  // is animating.
  useLayoutEffect(() => {
    if (stage !== 'overview' || anchorTop.current === null) return
    anchorTop.current = null

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (window.scrollY > maxScroll) {
      window.scrollTo({ top: Math.max(0, maxScroll), behavior: 'instant' })
    }
  }, [stage])

  // The rail should run from the first dot to the last, not to arbitrary
  // insets, so it is measured from the dots themselves. Written straight to
  // CSS custom properties because this runs on every layout change and must
  // not trigger a render. Rows reach their final layout in one step and only
  // then glide, so these values are right even while the glide is playing.
  useLayoutEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return undefined

    // Offsets rather than bounding rects: a rect includes the transforms
    // Framer is animating with, which at this point still hold the rows at
    // their previous positions, and the rail would be measured against a
    // layout that is on its way out. Offsets report the settled layout.
    // A dot sits at top: 50% of its slot and is pulled back by half its own
    // height, so its accumulated offset is already its centre.
    const centreOf = (node) => {
      let y = 0
      for (let n = node; n && n !== timeline; n = n.offsetParent) y += n.offsetTop
      return y
    }

    const measure = () => {
      const dots = timeline.querySelectorAll('.xp-dot')
      if (dots.length < 2) return
      const top = centreOf(dots[0])
      const end = centreOf(dots[dots.length - 1])
      timeline.style.setProperty('--xp-rail-top', top + 'px')
      timeline.style.setProperty('--xp-rail-height', Math.max(0, end - top) + 'px')
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(timeline)
    window.addEventListener('resize', measure)

    let live = true
    document.fonts?.ready.then(() => {
      if (live) measure()
    })

    return () => {
      live = false
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
    // Re-measured whenever the open set changes, since each panel changes
    // where the dots sit.
  }, [stage, expandedKey])

  const toggleCompany = (id) =>
    setExpandedIds((current) => {
      const next = new Set(current)
      if (!next.delete(id)) next.add(id)
      return next
    })

  const openItem = (item, company, role, trigger) => {
    triggerRef.current = trigger
    setEntry({ item, company, role })
  }

  const sectionReveal = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 'some', margin: '0px 0px -80px 0px' },
        transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
      }

  return (
    <div className="experience" data-stage={stage}>
      <header className="experience-intro">
        <p className="experience-eyebrow">{intro.eyebrow}</p>
        <h1 className="experience-headline">{intro.headline}</h1>
        <p className="experience-description">{intro.description}</p>
      </header>

      <section aria-label="Career timeline">
        <ol className="xp-timeline" ref={timelineRef}>
          <span className="xp-rail" aria-hidden="true">
            <motion.span className="xp-rail-fill" style={{ scaleY: drawn }} />
          </span>

          {companies.map((company, index) => (
            <CompanyEntry
              key={company.id}
              company={company}
              index={index}
              reduced={reduced}
              revealed={index < revealed}
              expanded={expandedIds.has(company.id)}
              onToggle={toggleCompany}
              onOpen={openItem}
              registerRow={(node) => {
                rowRefs.current[index] = node
              }}
            />
          ))}
        </ol>
      </section>

      <motion.section
        className="experience-education"
        aria-labelledby="education-heading"
        {...sectionReveal}
      >
        <h2 id="education-heading" className="xp-company-name">
          Education &amp; Skills
        </h2>

        <p className="xp-label">Education</p>
        <ul className="xp-entries">
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="xp-label">Skills</p>
        <TagRow items={skills} />
      </motion.section>

      <ExperienceModal entry={entry} triggerRef={triggerRef} onClose={() => setEntry(null)} />
    </div>
  )
}

export default Experience

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { projects } from '../data/overviewContent.js'
import './ProjectsShowcase.css'

// Pixels per second. Slow enough to read a card in passing.
const SPEED = 35
// Pointer travel past which a gesture counts as a drag, not a click.
const DRAG_THRESHOLD = 6

// `clone` marks the duplicated pass that exists only to fill the gap the
// first one leaves behind. aria-hidden keeps it out of the accessibility
// tree; it needs no `inert` because the card holds nothing focusable, and
// inert would also stop the clone responding to hover.
function ProjectCard({ title, metric, tags, image, clone, ref }) {
  return (
    <article className="project-card" ref={ref} aria-hidden={clone || undefined}>
      <div className="project-card-media">
        {image ? <img src={image.src} alt={image.alt} loading="lazy" /> : null}
      </div>

      <h3 className="project-card-title">{title}</h3>
      <p className="project-card-metric">{metric}</p>

      <ul className="project-card-tags">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  )
}

function ProjectsShowcase() {
  const shouldReduceMotion = useReducedMotion()

  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const firstCloneRef = useRef(null)

  // Everything the animation loop reads lives in refs: the loop runs every
  // frame and must never trigger a React render.
  const offset = useRef(0)
  const setWidth = useRef(0)
  const holds = useRef({ hover: false, focus: false, drag: false, offscreen: false, hidden: false })
  const drag = useRef({ active: false, startX: 0, startOffset: 0, moved: false, pointerId: null })

  // The only piece of animation state React owns, because it renders a label.
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const togglePaused = useCallback(() => {
    setPaused((current) => {
      pausedRef.current = !current
      return !current
    })
  }, [])

  const animated = !shouldReduceMotion

  // One set's width, including the gap that follows it. Taking it from the
  // first clone's offset means the real rendered gap is always included,
  // whatever the breakpoint.
  const measure = useCallback(() => {
    const track = trackRef.current
    const clone = firstCloneRef.current
    if (!track || !clone) return
    setWidth.current = clone.offsetLeft - track.firstElementChild.offsetLeft
  }, [])

  useLayoutEffect(() => {
    if (!animated) return undefined
    measure()

    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [animated, measure])

  // Stop while the section is scrolled away or the tab is in the background,
  // so an offscreen carousel isn't burning frames.
  useEffect(() => {
    if (!animated) return undefined
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        holds.current.offscreen = !entry.isIntersecting
      },
      { rootMargin: '100px' },
    )
    observer.observe(viewport)

    const onVisibility = () => {
      holds.current.hidden = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)
    onVisibility()

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [animated])

  useEffect(() => {
    if (!animated) return undefined

    let frame
    let last = performance.now()

    const tick = (now) => {
      const elapsed = Math.min((now - last) / 1000, 0.1)
      last = now

      const held = holds.current
      const moving =
        !pausedRef.current && !held.hover && !held.focus && !held.drag && !held.offscreen && !held.hidden

      if (moving && setWidth.current > 0) {
        offset.current -= SPEED * elapsed
        // Wrapping by exactly one set means the clone is already sitting
        // where the original was: no jump, no gap.
        if (offset.current <= -setWidth.current) offset.current += setWidth.current
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offset.current}px, 0, 0)`
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animated])

  // ---- pointer dragging -------------------------------------------------

  const onPointerDown = (event) => {
    if (!animated || event.pointerType === 'mouse') return
    drag.current = {
      active: true,
      startX: event.clientX,
      startOffset: offset.current,
      moved: false,
      pointerId: event.pointerId,
    }
    holds.current.drag = true
  }

  const onPointerMove = (event) => {
    const state = drag.current
    if (!state.active || event.pointerId !== state.pointerId) return

    const delta = event.clientX - state.startX
    if (Math.abs(delta) > DRAG_THRESHOLD) state.moved = true

    let next = state.startOffset + delta
    const width = setWidth.current
    if (width > 0) {
      // Keep the offset inside one set so the clone always covers the gap.
      next = ((next % width) - width) % width
    }
    offset.current = next
  }

  const endDrag = (event) => {
    const state = drag.current
    if (!state.active || (event && event.pointerId !== state.pointerId)) return
    state.active = false
    state.pointerId = null
    // Picks up from wherever the finger left it rather than snapping back.
    holds.current.drag = false
  }

  // A swipe shouldn't also register as a tap on whatever was under the finger.
  const onClickCapture = (event) => {
    if (!drag.current.moved) return
    drag.current.moved = false
    event.preventDefault()
    event.stopPropagation()
  }

  const items = projects.items

  return (
    <section
      className="projects"
      aria-labelledby="projects-heading"
      // On the section, not just the track: the pause control lives in the
      // header, and tabbing to it should stop the row too.
      onFocus={() => { holds.current.focus = true }}
      onBlur={() => { holds.current.focus = false }}
    >
      <header className="projects-header">
        <div>
          <p className="projects-eyebrow">{projects.eyebrow}</p>
          <h2 id="projects-heading" className="projects-heading">
            {projects.heading}
          </h2>
        </div>

        <div className="projects-actions">
          {/* Deliberately out of sight until it is tabbed to. The cards hold
              no focusable content, so without this there would be no
              keyboard way to stop content that moves on its own. */}
          {animated && (
            <button type="button" className="projects-toggle" onClick={togglePaused}>
              {paused ? 'Resume project carousel' : 'Pause project carousel'}
            </button>
          )}

          {/* No destination yet — focusable and announced as unavailable
              rather than pointed at a route that doesn't exist. */}
          <button type="button" className="projects-view-all" aria-disabled="true">
            {projects.viewAll.label}
            <span className="projects-view-all-note"> (coming soon)</span>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={animated ? 'projects-viewport' : 'projects-viewport projects-viewport-static'}
        ref={viewportRef}
        onPointerEnter={() => { holds.current.hover = true }}
        onPointerLeave={() => { holds.current.hover = false; endDrag() }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <div className="projects-track" ref={trackRef}>
          {items.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}

          {animated &&
            items.map((project, index) => (
              <ProjectCard
                key={`clone-${project.id}`}
                {...project}
                clone
                ref={index === 0 ? firstCloneRef : undefined}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase

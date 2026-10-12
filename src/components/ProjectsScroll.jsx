import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './ProjectsScroll.css'

function ProjectCard({ name, blurb, onSelect }) {
  return (
    <button type="button" className="project-card" onClick={() => onSelect?.(name)}>
      <span className="project-card-name">{name}</span>
      <span className="project-card-blurb">{blurb}</span>
    </button>
  )
}

function ProjectsScroll({ projects, onSelectProject }) {
  const shouldReduceMotion = useReducedMotion()
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const [scrollDistance, setScrollDistance] = useState(0)

  useLayoutEffect(() => {
    if (shouldReduceMotion) return undefined

    function measure() {
      if (!trackRef.current || !pinRef.current) return
      const trackWidth = trackRef.current.scrollWidth
      const viewportWidth = pinRef.current.clientWidth
      setScrollDistance(Math.max(trackWidth - viewportWidth, 0))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [shouldReduceMotion])

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])

  // Reduced motion / no-JS-measurement fallback: a normal horizontally
  // scrollable strip in the page flow, no scroll-jacking.
  if (shouldReduceMotion) {
    return (
      <div className="projects-track projects-track-static">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} onSelect={onSelectProject} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="projects-pin"
      ref={pinRef}
      style={{ height: `calc(100vh + ${scrollDistance}px)` }}
    >
      <div className="projects-sticky">
        <motion.div className="projects-track" ref={trackRef} style={{ x }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} onSelect={onSelectProject} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectsScroll

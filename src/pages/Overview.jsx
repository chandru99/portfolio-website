import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import BillBackCard from '../components/BillBackCard.jsx'
import TagRow from '../components/TagRow.jsx'
import { introduction, panels } from '../data/overviewContent.js'
import { PHOTO_ALT, PHOTO_SRC } from '../data/photo.js'
import { DURATION_BASE, DURATION_FAST, EASE_STANDARD } from '../lib/motion.js'
import './Overview.css'

// Gap between staggered beats within a role. Derived from DURATION_FAST
// (150ms) halved rather than a new value, landing at 75ms — inside the
// tight 60-80ms range this needs, without adding a duration token.
const BEAT_STAGGER_DELAY = DURATION_FAST / 2

const beatContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: BEAT_STAGGER_DELAY },
  },
}

const beatVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
  },
}

function ExperiencePanel({ roles, shouldReduceMotion }) {
  const containerMotionProps = shouldReduceMotion
    ? {}
    : { initial: 'hidden', animate: 'visible', variants: beatContainerVariants }
  const beatMotionProps = shouldReduceMotion ? {} : { variants: beatVariants }

  return (
    <div className="overview-roles">
      {roles.map((role) => (
        <motion.article key={role.company} className="role" {...containerMotionProps}>
          <h3 className="role-title">
            {role.company}, {role.title}
            <span className="role-years">{role.years}</span>
          </h3>
          <motion.p className="role-beat" {...beatMotionProps}>
            <span className="overview-label">Signal</span>
            {role.signal}
          </motion.p>
          <motion.p className="role-beat" {...beatMotionProps}>
            <span className="overview-label">Response</span>
            {role.response}
          </motion.p>
          <motion.p className="role-beat" {...beatMotionProps}>
            <span className="overview-label">Shift</span>
            {role.shift}
          </motion.p>
          <motion.div {...beatMotionProps}>
            <TagRow items={role.tags} />
          </motion.div>
        </motion.article>
      ))}
    </div>
  )
}

function ProjectsPanel({ featured, entries }) {
  return (
    <>
      <BillBackCard {...featured} />
      <ul className="overview-entries">
        {entries.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </>
  )
}

function EducationPanel({ education, skills }) {
  return (
    <>
      <p className="overview-label">Education</p>
      <ul className="overview-entries">
        {education.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
      <p className="overview-label">Skills</p>
      <TagRow items={skills} />
    </>
  )
}

const PANEL_RENDERERS = {
  experience: (panel, shouldReduceMotion) => (
    <ExperiencePanel roles={panel.roles} shouldReduceMotion={shouldReduceMotion} />
  ),
  projects: (panel) => <ProjectsPanel featured={panel.featured} entries={panel.entries} />,
  education: (panel) => <EducationPanel education={panel.education} skills={panel.skills} />,
}

function Overview() {
  const [activePanel, setActivePanel] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: DURATION_BASE, ease: EASE_STANDARD }

  const active = panels.find((panel) => panel.id === activePanel)

  function togglePanel(id) {
    setActivePanel((current) => (current === id ? null : id))
  }

  return (
    <div className="overview">
      <h1 className="overview-title">Overview</h1>

      <section className="overview-intro" aria-label="Introduction">
        <img className="overview-photo" src={PHOTO_SRC} alt={PHOTO_ALT} />
        <div>
          <p className="overview-bio">{introduction.bio}</p>
          <p className="overview-quote">{introduction.quote}</p>
        </div>
      </section>

      <section className="overview-panels" aria-label="Background">
        <div className="overview-panel-buttons">
          {panels.map((panel) => (
            <motion.button
              key={panel.id}
              type="button"
              className={
                panel.id === activePanel
                  ? 'overview-panel-button overview-panel-button-active'
                  : 'overview-panel-button'
              }
              aria-expanded={panel.id === activePanel}
              aria-controls="overview-panel"
              onClick={() => togglePanel(panel.id)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            >
              {panel.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence initial={false} mode="wait">
          {active && (
            <motion.div
              key={active.id}
              id="overview-panel"
              className="overview-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={panelTransition}
            >
              <div className="overview-panel-inner">
                {PANEL_RENDERERS[active.id](active, shouldReduceMotion)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default Overview

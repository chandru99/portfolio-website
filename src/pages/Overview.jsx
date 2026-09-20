import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import BillBackCard from '../components/BillBackCard.jsx'
import TagRow from '../components/TagRow.jsx'
import { introduction, panels } from '../data/overviewContent.js'
import { PHOTO_ALT, PHOTO_SRC } from '../data/photo.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './Overview.css'

function ExperiencePanel({ roles }) {
  return (
    <div className="overview-roles">
      {roles.map((role) => (
        <article key={role.company} className="role">
          <h3 className="role-title">
            {role.company}, {role.title}
            <span className="role-years">{role.years}</span>
          </h3>
          <p className="role-beat">
            <span className="overview-label">Signal</span>
            {role.signal}
          </p>
          <p className="role-beat">
            <span className="overview-label">Response</span>
            {role.response}
          </p>
          <p className="role-beat">
            <span className="overview-label">Shift</span>
            {role.shift}
          </p>
          <TagRow items={role.tags} />
        </article>
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
  experience: (panel) => <ExperiencePanel roles={panel.roles} />,
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
            <button
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
            >
              {panel.label}
            </button>
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
              <div className="overview-panel-inner">{PANEL_RENDERERS[active.id](active)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default Overview

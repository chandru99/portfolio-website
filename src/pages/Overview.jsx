import { motion, useReducedMotion } from 'framer-motion'
import BillBackCard from '../components/BillBackCard.jsx'
import ProjectsScroll from '../components/ProjectsScroll.jsx'
import { introduction, ventures, projects } from '../data/overviewContent.js'
import { PHOTO_ALT, PHOTO_SRC } from '../data/photo.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import './Overview.css'

function VentureCard({ name, description, url }) {
  if (url) {
    return <BillBackCard name={name} description={description} url={url} />
  }

  return (
    <div className="billback-card venture-card-static">
      <p className="billback-card-text">
        <span className="billback-card-name">{name}</span> — {description}
      </p>
    </div>
  )
}

function Overview() {
  const shouldReduceMotion = useReducedMotion()

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
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

      <motion.section className="overview-ventures" aria-label="Current Ventures" {...reveal}>
        <h2 className="overview-section-heading">Current Ventures</h2>
        <div className="overview-ventures-grid">
          {ventures.map((venture) => (
            <VentureCard key={venture.id} {...venture} />
          ))}
        </div>
      </motion.section>

      <section className="overview-projects" aria-label="Projects">
        <motion.h2 className="overview-section-heading" {...reveal}>
          Projects
        </motion.h2>
        <ProjectsScroll projects={projects} />
      </section>
    </div>
  )
}

export default Overview

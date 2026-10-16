import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import BillBackCard from '../components/BillBackCard.jsx'
import HeroHeading from '../components/HeroHeading.jsx'
import HeroVisual from '../components/HeroVisual.jsx'
import ProjectsScroll from '../components/ProjectsScroll.jsx'
import ScrollCue from '../components/ScrollCue.jsx'
import { hero, ventures, projects } from '../data/overviewContent.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import { useHeroScrollGate } from '../lib/useHeroScrollGate.js'
import { scrollToSection } from '../lib/scrollToSection.js'
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

  const heroRef = useRef(null)
  const releaseScroll = useHeroScrollGate(heroRef)
  const { isHistoryNavigation } = useOutletContext()
  const [hasContinued, setHasContinued] = useState(isHistoryNavigation)
  const handleContinue = useCallback(() => {
    releaseScroll()
    setHasContinued(true)
  }, [releaseScroll])
  const [introDone, setIntroDone] = useState(false)
  const [statementDone, setStatementDone] = useState(false)
  const handleIntroComplete = useCallback(() => setIntroDone(true), [])
  const handleStatementComplete = useCallback(() => setStatementDone(true), [])

  const stage = (ready, delay = 0) =>
    shouldReduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          animate: ready ? 'visible' : 'hidden',
          variants: { visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 12 } },
          transition: {
            duration: DURATION_BASE,
            ease: EASE_STANDARD,
            delay: ready ? delay : 0,
          },
        }

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
      {/* Stable id: a later phase watches this element to decide when the
          floating assistant should appear. Nothing observes it yet. */}
      <section ref={heroRef} id="overview-hero" className="overview-hero" aria-label="Introduction">
        <a className="overview-skip" href="#current-ventures" onClick={(event) => {
          event.preventDefault()
          handleContinue()
          scrollToSection('current-ventures', shouldReduceMotion)
        }}>Skip introduction, continue to Current Ventures</a>
        {/* One column on desktop; `display: contents` on mobile so the lede
            and body can be placed into separate grid areas around the photo. */}
        <div className="overview-hero-copy">
          <div className="overview-hero-lede">
            <HeroHeading
              greeting={hero.greeting}
              name={hero.name}
              onComplete={handleIntroComplete}
            />
          </div>

          <div className="overview-hero-body">
            <motion.p className="overview-positioning" {...stage(introDone, 1)}
              onAnimationComplete={(definition) => {
                if (definition === 'visible') handleStatementComplete()
              }}>
              {hero.positioning}
            </motion.p>
            <motion.p className="overview-description" {...stage(statementDone)}>
              {hero.description}
            </motion.p>
          </div>
          <motion.div className="overview-actions" {...stage(statementDone)}>
            <a
              className="overview-button overview-button-primary"
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.primaryCta.label}
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
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
            </a>

            {/* No destination exists yet. Kept focusable and announced as
                unavailable rather than pointed at an unrelated route. */}
            <button
              type="button"
              className="overview-button overview-button-secondary"
              aria-disabled="true"
            >
              {hero.secondaryCta.label}
              <span className="overview-button-note"> (coming soon)</span>
            </button>
          </motion.div>
        </div>

        <HeroVisual />

        <div className="overview-hero-cue" data-dismissed={hasContinued} aria-hidden={hasContinued} inert={hasContinued}>
          <ScrollCue targetId="current-ventures" label="Continue to Current Ventures" onContinue={handleContinue} />
        </div>
      </section>

      <motion.section
        id="current-ventures"
        className="overview-ventures"
        aria-label="Current Ventures"
        {...reveal}
      >
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

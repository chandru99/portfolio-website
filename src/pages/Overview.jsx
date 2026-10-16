import { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import ContactStrip from '../components/ContactStrip.jsx'
import HeroHeading from '../components/HeroHeading.jsx'
import HeroVisual from '../components/HeroVisual.jsx'
import ProjectsShowcase from '../components/ProjectsShowcase.jsx'
import ScrollCue from '../components/ScrollCue.jsx'
import SplitLines from '../components/SplitLines.jsx'
import WhatGuidesMe from '../components/WhatGuidesMe.jsx'
import { hero } from '../data/overviewContent.js'
import { DURATION_BASE, EASE_STANDARD } from '../lib/motion.js'
import { useHeroScrollGate } from '../lib/useHeroScrollGate.js'
import { scrollToSection } from '../lib/scrollToSection.js'
import './Overview.css'

// Beat of silence after the name finishes, before the statement begins.
const STATEMENT_PAUSE = 0.7

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

  // The cue arrives with the buttons: both are the last beat of the intro.
  const cuePending = !shouldReduceMotion && !statementDone
  const cueHidden = hasContinued || cuePending

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

  return (
    <div className="overview">
      {/* Stable id: a later phase watches this element to decide when the
          floating assistant should appear. Nothing observes it yet. */}
      <section ref={heroRef} id="overview-hero" className="overview-hero" aria-label="Introduction">
        <a className="overview-skip" href="#what-guides-me" onClick={(event) => {
          event.preventDefault()
          handleContinue()
          scrollToSection('what-guides-me', shouldReduceMotion)
        }}>Skip introduction, continue to What Guides Me</a>
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
            {/* Reveals one measured visual line at a time, rather than the
                paragraph fading in as a block. The lead-in delay lets the
                name land and settle before the statement starts. */}
            <SplitLines
              className="overview-positioning"
              text={hero.positioning}
              ready={introDone}
              delay={STATEMENT_PAUSE}
              onComplete={handleStatementComplete}
            />
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

        <div className="overview-hero-cue" data-pending={cuePending} data-dismissed={hasContinued}
          aria-hidden={cueHidden} inert={cueHidden}>
          <ScrollCue targetId="what-guides-me" label="Continue to What Guides Me" onContinue={handleContinue} />
        </div>
      </section>

      <WhatGuidesMe />

      <ProjectsShowcase />

      <ContactStrip />
    </div>
  )
}

export default Overview

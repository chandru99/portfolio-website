import { motion, useReducedMotion } from 'framer-motion'
import TagRow from '../components/TagRow.jsx'
import { roles, education, skills } from '../data/experienceContent.js'
import { DURATION_BASE, DURATION_FAST, EASE_STANDARD } from '../lib/motion.js'
import './Experience.css'

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

// Groups consecutive roles at the same company into one scroll step, so
// Deloitte's Consultant and Analyst entries reveal together as a single
// "then Deloitte" beat rather than two separate ones.
function groupRolesByCompany(allRoles) {
  return allRoles.reduce((groups, role) => {
    const last = groups[groups.length - 1]
    if (last && last.company === role.company) {
      last.roles.push(role)
    } else {
      groups.push({ company: role.company, roles: [role] })
    }
    return groups
  }, [])
}

const roleGroups = groupRolesByCompany(roles)

function Experience() {
  const shouldReduceMotion = useReducedMotion()

  // Each step only reveals once a third of it has scrolled into view, and
  // every step reserves a tall slice of viewport height (see .experience-step
  // in Experience.css), so Applied Medical, then Deloitte, then Education
  // appear one at a time as you scroll rather than all at once.
  const sectionReveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
      }

  const roleContainerMotionProps = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.3 },
        variants: beatContainerVariants,
      }
  const beatMotionProps = shouldReduceMotion ? {} : { variants: beatVariants }

  return (
    <div className="experience">
      <h1 className="experience-title">Experience</h1>

      <section className="experience-roles" aria-label="Experience">
        <h2 className="experience-heading">Experience</h2>
        {roleGroups.map((group) => (
          <motion.div key={group.company} className="experience-step" {...sectionReveal}>
            <div className="overview-roles">
              {group.roles.map((role) => (
                <motion.article
                  key={`${role.company}-${role.title}`}
                  className="role"
                  {...roleContainerMotionProps}
                >
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
          </motion.div>
        ))}
      </section>

      <motion.section
        className="experience-step experience-education"
        aria-label="Education & Skills"
        {...sectionReveal}
      >
        <h2 className="experience-heading">Education &amp; Skills</h2>
        <p className="overview-label">Education</p>
        <ul className="overview-entries">
          {education.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
        <p className="overview-label">Skills</p>
        <TagRow items={skills} />
      </motion.section>
    </div>
  )
}

export default Experience

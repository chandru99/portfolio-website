import currentlyWorkingOn from '../data/currentlyWorkingOn.js'
import './CurrentlyWorkingOn.css'

function CurrentlyWorkingOn() {
  return (
    <section className="currently-working-on" aria-label="Currently working on">
      <span className="currently-working-on-label">Currently working on</span>
      <ul className="currently-working-on-list">
        {currentlyWorkingOn.map((item) => (
          <li key={item} className="currently-working-on-item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CurrentlyWorkingOn

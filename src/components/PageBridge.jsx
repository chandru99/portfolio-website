import { Link, useLocation } from 'react-router-dom'
import pageBridge from '../data/pageBridge.js'
import './PageBridge.css'

function PageBridge() {
  const { pathname } = useLocation()
  const entry = pageBridge[pathname]

  if (!entry) {
    return null
  }

  return (
    <section className="page-bridge" aria-label="Continue exploring">
      <p className="page-bridge-statement">{entry.statement}</p>
      <Link className="page-bridge-link" to={entry.nextPath}>
        {entry.nextLabel} →
      </Link>
    </section>
  )
}

export default PageBridge

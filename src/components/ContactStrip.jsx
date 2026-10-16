import { contact } from '../data/overviewContent.js'
import './ContactStrip.css'

const ICONS = {
  linkedin: (
    <path d="M4.98 3.5a2 2 0 1 1-.01 4 2 2 0 0 1 .01-4zM3.5 8.9h3v11.6h-3zM9.4 8.9h2.87v1.59h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v5.97h-3v-5.3c0-1.26-.02-2.9-1.76-2.9-1.77 0-2.04 1.38-2.04 2.8v5.4h-3z" />
  ),
  email: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  github: (
    <path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.49.09.67-.21.67-.47v-1.8c-2.72.59-3.3-1.16-3.3-1.16-.44-1.14-1.09-1.44-1.09-1.44-.89-.6.07-.59.07-.59.99.07 1.5 1.02 1.5 1.02.88 1.5 2.3 1.07 2.86.82.09-.64.34-1.07.62-1.32-2.17-.25-4.45-1.09-4.45-4.84 0-1.07.38-1.95 1.01-2.63-.1-.25-.44-1.25.1-2.6 0 0 .83-.27 2.72 1a9.4 9.4 0 0 1 4.95 0c1.88-1.27 2.71-1 2.71-1 .54 1.35.2 2.35.1 2.6.63.68 1.01 1.56 1.01 2.63 0 3.76-2.29 4.59-4.47 4.83.35.3.67.9.67 1.82v2.7c0 .26.18.57.68.47A9.8 9.8 0 0 0 12 2.2z" />
  ),
}

function ContactIcon({ id }) {
  const filled = id !== 'email'
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[id]}
    </svg>
  )
}

// Closes out the Overview page. Rendered by Overview itself rather than the
// shared Layout, so it never appears on the other routes.
function ContactStrip() {
  return (
    <section className="contact" aria-labelledby="contact-heading">
      <p className="contact-eyebrow">{contact.eyebrow}</p>
      <h2 id="contact-heading" className="contact-heading">
        {contact.heading}
      </h2>
      <p className="contact-description">{contact.description}</p>

      <div className="contact-links">
        {contact.links.map((link) => (
          <a
            key={link.id}
            className={`contact-link${link.primary ? ' contact-link-primary' : ''}`}
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <ContactIcon id={link.id} />
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default ContactStrip

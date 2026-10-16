export const hero = {
  // Split across two lines in the heading, and revealed word by word.
  greeting: 'Hi, I am',
  name: 'Chandramouli',
  positioning:
    'I solve complex enterprise problems with efficient and scalable tech solutions.',
  description:
    "I spent four years at Deloitte driving enterprise-grade technology transformations with SAP. Now, through my MBA, I'm sharpening the skills to lead and transform organizations.",
  primaryCta: {
    label: "Let's connect",
    // Taken from the contact line of the resume PDF in public/resume/.
    href: 'https://www.linkedin.com/in/chanmouli',
  },
  // No destination yet — rendered as an unavailable action until there is one.
  secondaryCta: { label: 'How I Think' },
}

// One statement, split only so two phrases can carry the accent colour.
// Keep the segments joined exactly as written — the wording is fixed.
export const philosophy = {
  heading: 'What guides me',
  quote: [
    { text: '“Earn your luck through ' },
    { text: 'hard work', accent: true },
    { text: ', never compromise on ' },
    { text: 'honesty', accent: true },
    { text: ', and use what you need, respect what you take.”' },
  ],
}

export const ventures = [
  {
    id: 'billback',
    name: 'BillBack',
    description:
      'Co-founded with an MBA cohort mate — an AI-powered medical billing audit platform that catches errors manual review misses. Full audit in under a minute versus 2+ hours by hand.',
    url: 'https://www.billbackai.com',
  },
  {
    id: 'personal-automation',
    name: 'Personal Automation',
    description: 'Placeholder — two-line summary to come.',
    url: null,
  },
]

// Placeholder entries — real descriptions/results to be filled in one
// project at a time.
// Email and LinkedIn come from the contact line of the resume PDF in
// public/resume/. The GitHub handle is taken from this repository's own
// origin remote — it is not stated anywhere as a contact link, so confirm
// it before relying on it.
export const contact = {
  eyebrow: 'Interested in connecting?',
  heading: "Let's connect.",
  description:
    "I'm always open to conversations about product strategy, enterprise technology, AI, and opportunities to solve meaningful business problems.",
  links: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chanmouli',
      external: true,
      primary: true,
    },
    { id: 'email', label: 'Email', href: 'mailto:sivakumc@uci.edu' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/chandru99', external: true },
  ],
}

// Card artwork isn't in the repo yet. Drop a file in public/images/projects/
// and point `image` at it; the card falls back to a plain tinted panel until
// then, so nothing invents a thumbnail.
export const projects = {
  eyebrow: 'Selected work',
  heading: 'Projects',
  // No projects route exists yet, so this renders as an unavailable action
  // rather than pointing somewhere that isn't built.
  viewAll: { label: 'View all' },
  items: [
    {
      id: 'sap-salesforce',
      title: 'SAP–Salesforce Order Platform',
      metric: '+35–40% processing efficiency',
      tags: ['SAP', 'Salesforce', 'APIs'],
      image: null,
    },
    {
      id: 'compliance-snowflake',
      title: 'Compliance Automation with Snowflake',
      metric: '80% faster approvals',
      tags: ['SAP', 'Snowflake', 'Automation'],
      image: null,
    },
    {
      id: 'poland-ksef',
      title: 'Poland e-Invoicing (KSeF)',
      metric: '100% regulatory readiness',
      tags: ['EDICOM', 'SAP', 'Integration'],
      image: null,
    },
  ],
}

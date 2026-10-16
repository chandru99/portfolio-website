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
export const projects = [
  {
    id: 'frw',
    name: 'FRW Case Competition',
    blurb: 'Placeholder description — details to come.',
  },
  {
    id: 'sega',
    name: 'SEGA Case Competition',
    blurb: 'Placeholder description — details to come.',
  },
  {
    id: 'datathon-lmu',
    name: 'Datathon at LMU',
    blurb: 'Placeholder description — details to come.',
  },
  {
    id: 'usc-marshall',
    name: 'AI Product Challenge, USC Marshall',
    blurb: 'Placeholder description — details to come.',
  },
  {
    id: 'butterworth',
    name: 'Butterworth Product Competition',
    blurb: 'Placeholder description — details to come.',
  },
]

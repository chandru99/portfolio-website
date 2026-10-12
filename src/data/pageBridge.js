const pageBridge = {
  '/': {
    statement: 'This is how I think.',
    nextPath: '/experience',
    nextLabel: 'Experience',
  },
  '/experience': {
    statement: "This is what I've done.",
    nextPath: '/into',
    nextLabel: "What I'm Into",
  },
  '/into': {
    statement: 'This is who I am outside of work.',
    nextPath: '/ask',
    nextLabel: 'Ask Anything',
  },
  '/ask': {
    statement: 'This is how I build.',
    nextPath: '/resume',
    nextLabel: 'Resume',
  },
  '/resume': {
    statement: "This is where it's headed.",
    nextPath: '/',
    nextLabel: 'Overview',
  },
}

export default pageBridge

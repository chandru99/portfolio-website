import { lazy, Suspense, useCallback, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro.jsx'
import Layout from './components/Layout.jsx'
import Overview from './pages/Overview.jsx'
import WhatImInto from './pages/WhatImInto.jsx'
import AskAnything from './pages/AskAnything.jsx'

// react-pdf (and the pdf.js engine it pulls in) is ~1MB on its own and is
// only ever used on this one route, so it's code-split out of the main
// bundle rather than shipping to every page's initial load.
const Resume = lazy(() => import('./pages/Resume.jsx'))

const INTRO_SESSION_KEY = 'portfolio-intro-shown'

function App() {
  const [showIntro, setShowIntro] = useState(
    () => sessionStorage.getItem(INTRO_SESSION_KEY) !== 'true',
  )

  const dismissIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    setShowIntro(false)
  }, [])

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onDismiss={dismissIntro} />}</AnimatePresence>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Overview />} />
          <Route path="/into" element={<WhatImInto />} />
          <Route path="/ask" element={<AskAnything />} />
          <Route
            path="/resume"
            element={
              <Suspense fallback={<p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>}>
                <Resume />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App

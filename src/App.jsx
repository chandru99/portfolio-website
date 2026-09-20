import { useCallback, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro.jsx'
import Layout from './components/Layout.jsx'
import Overview from './pages/Overview.jsx'
import WhatImInto from './pages/WhatImInto.jsx'
import AskAnything from './pages/AskAnything.jsx'
import Resume from './pages/Resume.jsx'

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
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

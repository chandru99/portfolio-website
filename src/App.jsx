import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Overview from './pages/Overview.jsx'
import Experience from './pages/Experience.jsx'
import WhatImInto from './pages/WhatImInto.jsx'
import AskAnything from './pages/AskAnything.jsx'

// react-pdf (and the pdf.js engine it pulls in) is ~1MB on its own and is
// only ever used on this one route, so it's code-split out of the main
// bundle rather than shipping to every page's initial load.
const Resume = lazy(() => import('./pages/Resume.jsx'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/experience" element={<Experience />} />
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
  )
}

export default App

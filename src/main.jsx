import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      {/* No `route` prop on purpose: passing one would disable the script's
          auto-tracking and make us fire pageviews manually. Every route here
          is static, so auto-tracking already covers client-side navigation. */}
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)

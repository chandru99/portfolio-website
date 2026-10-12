import { useSyncExternalStore } from 'react'
import { DURATION_BASE } from './motion.js'

// Single source of truth for theme behavior. The resolution order here —
// stored manual choice first, OS preference second — is duplicated by the
// pre-paint bootstrap in index.html, which has to run before any module
// loads and so cannot import from here. Keep the two in sync; this key is
// the contract between them.
export const THEME_STORAGE_KEY = 'portfolio-theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

// Browser chrome color per theme, mirroring --color-bg in src/index.css.
const THEME_COLORS = { light: '#ffffff', dark: '#0b0f17' }

function isTheme(value) {
  return value === 'light' || value === 'dark'
}

// localStorage throws in private mode and when site data is blocked, so
// every access is guarded: a visitor who can't persist a choice should
// still get a working toggle for the current visit.
function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : null
  } catch {
    return null
  }
}

function writeStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Choice still applies to this visit, it just won't be remembered.
  }
}

function getSystemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function resolveTheme() {
  return readStoredTheme() ?? getSystemTheme()
}

const THEME_TRANSITION_MS = DURATION_BASE * 1000

let currentTheme = null
let mediaQuery = null
let transitionTimer = null
// Mirrors the stored preference, but survives storage being unavailable —
// see the note in setTheme.
let hasManualOverride = false
const listeners = new Set()

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLORS[theme])
}

// Opts the document into the cross-fade defined in src/index.css for one
// duration. Only runtime changes route through here: the pre-paint
// bootstrap and React's first read both apply the theme that is already in
// effect, so the initial load never animates.
function beginThemeTransition() {
  const root = document.documentElement
  root.dataset.themeTransition = ''

  clearTimeout(transitionTimer)
  transitionTimer = setTimeout(() => {
    delete root.dataset.themeTransition
    transitionTimer = null
  }, THEME_TRANSITION_MS)
}

function setTheme(theme, { persist }) {
  if (persist) {
    // Held in memory as well as in storage. When storage is blocked the
    // write silently fails, and without this flag the next OS-level change
    // would quietly undo the choice the visitor just made.
    hasManualOverride = true
    writeStoredTheme(theme)
  }
  if (theme === currentTheme) return

  currentTheme = theme
  beginThemeTransition()
  applyTheme(theme)
  for (const listener of listeners) listener()
}

// An OS-level change only wins while the visitor has no choice of their own;
// once they've picked, their pick stands for the rest of the session even if
// it could not be written to storage.
function handleSystemChange(event) {
  if (hasManualOverride || readStoredTheme()) return
  setTheme(event.matches ? 'dark' : 'light', { persist: false })
}

// Fired by other tabs on the same origin. A null key means storage was
// cleared wholesale, which also needs a re-resolve.
function handleStorage(event) {
  if (event.key !== null && event.key !== THEME_STORAGE_KEY) return

  // Follow whatever the other tab did, including clearing the key, which
  // hands control back to the OS preference.
  hasManualOverride = readStoredTheme() !== null
  setTheme(resolveTheme(), { persist: false })
}

function subscribe(listener) {
  listeners.add(listener)

  if (listeners.size === 1) {
    mediaQuery = window.matchMedia(DARK_QUERY)
    mediaQuery.addEventListener('change', handleSystemChange)
    window.addEventListener('storage', handleStorage)
  }

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      mediaQuery.removeEventListener('change', handleSystemChange)
      window.removeEventListener('storage', handleStorage)
      mediaQuery = null
    }
  }
}

function getSnapshot() {
  if (currentTheme === null) {
    // The bootstrap script already resolved and painted a theme. Adopting
    // the attribute it set — rather than re-resolving — is what stops React
    // from contradicting the first paint on hydration.
    const applied = document.documentElement.dataset.theme
    currentTheme = isTheme(applied) ? applied : resolveTheme()
    applyTheme(currentTheme)
  }
  return currentTheme
}

// Module-level and stable, so passing it down never invalidates a memo or
// forces a rerender.
export function toggleTheme() {
  setTheme(getSnapshot() === 'dark' ? 'light' : 'dark', { persist: true })
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot)
}

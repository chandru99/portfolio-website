import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'

// Only pointer scrolling is gated. Keyboard, focus, hash navigation and
// history restoration always win; no body lock or scroll-position snapping.
export function useHeroScrollGate(heroRef) {
  const location = useLocation()
  const { isHistoryNavigation } = useOutletContext()
  const released = useRef(false)
  const release = useCallback(() => { released.current = true }, [])

  useEffect(() => {
    if (released.current || location.hash || isHistoryNavigation) return

    const hero = heroRef.current
    if (!hero) return
    let touchY = 0
    let checkedInitialPosition = false

    const boundary = () => Math.max(0, hero.offsetTop + hero.offsetHeight - window.innerHeight)
    const canGate = () => {
      // Check on the first gesture, after Layout has reset/restored the route.
      // A passive effect can run before that reset when a child measures itself.
      if (!checkedInitialPosition) {
        checkedInitialPosition = true
        if (window.scrollY > 2) release()
      }
      const cue = hero.querySelector('.scroll-cue')
      const rect = cue?.getBoundingClientRect()
      const style = cue && getComputedStyle(cue)
      // A timed reveal is intentional. Keep the gate while the cue is waiting;
      // keyboard/skip links can still leave the introduction immediately.
      const cuePending = cue?.closest('[data-pending="true"]')
      const navBottom = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0
      // Sticky cues can already be reachable before a tall hero reaches its
      // scroll boundary. Only project a normal-flow cue if it is off screen.
      const cueInView = rect && rect.top >= navBottom && rect.bottom <= window.innerHeight
      const cueAtBoundary = rect &&
        rect.bottom + window.scrollY <= boundary() + window.innerHeight &&
        rect.top + window.scrollY - boundary() >= navBottom
      if (!rect || rect.width < 24 || rect.height < 24 ||
          (!cuePending && (style.visibility === 'hidden' || style.opacity === '0')) || style.pointerEvents === 'none' || cue.disabled ||
          (!cueInView && !cueAtBoundary) ||
          document.querySelector('.nav-toggle[aria-expanded="true"]')) release()
      return !released.current
    }

    function wheel(event) {
      if (event.ctrlKey || !canGate()) return
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      const delta = event.deltaY * unit
      const limit = boundary()
      if (delta !== 0 && event.cancelable) {
        // Apply every gated delta ourselves so queued native wheel momentum
        // cannot carry a sequence of small events past the hero boundary.
        event.preventDefault()
        window.scrollTo({ top: Math.max(0, Math.min(limit, window.scrollY + delta)), behavior: 'instant' })
      }
    }

    function touchStart(event) {
      touchY = event.touches[0]?.clientY ?? 0
    }

    function touchMove(event) {
      if (event.touches.length !== 1 || !canGate()) return
      const { clientY } = event.touches[0]
      const delta = touchY - clientY
      touchY = clientY
      if (delta === 0 || !event.cancelable) return
      // Prevent native momentum carrying this gesture past the cue.
      event.preventDefault()
      window.scrollTo({ top: Math.max(0, Math.min(boundary(), window.scrollY + delta)), behavior: 'instant' })
    }

    function keyboard(event) {
      if (['Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Escape'].includes(event.key)) release()
    }
    function focus(event) {
      if (!hero.contains(event.target) && !event.target.closest('.nav')) release()
    }
    function scroll() {
      // Includes AT, scrollbar dragging, find-in-page and restored positions.
      if (window.scrollY > boundary() + 2) release()
    }

    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('touchstart', touchStart, { passive: true })
    window.addEventListener('touchmove', touchMove, { passive: false })
    window.addEventListener('keydown', keyboard)
    window.addEventListener('focusin', focus)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('hashchange', release)
    window.addEventListener('popstate', release)
    return () => {
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('touchstart', touchStart)
      window.removeEventListener('touchmove', touchMove)
      window.removeEventListener('keydown', keyboard)
      window.removeEventListener('focusin', focus)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('hashchange', release)
      window.removeEventListener('popstate', release)
    }
  }, [heroRef, location.hash, location.key, isHistoryNavigation, release])

  return release
}

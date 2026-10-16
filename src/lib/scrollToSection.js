// Use layout offsets rather than the transient transform on a revealed section.
export function scrollToSection(targetId, shouldReduceMotion) {
  const target = document.getElementById(targetId)
  if (!target) return

  let top = 0
  for (let node = target; node; node = node.offsetParent) top += node.offsetTop
  const navHeight = document.querySelector('.nav')?.offsetHeight ?? 0
  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  window.scrollTo({
    top: Math.max(top - navHeight - 16, 0),
    behavior: shouldReduceMotion ? 'instant' : 'smooth',
  })
}

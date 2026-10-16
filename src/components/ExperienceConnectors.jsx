import { useLayoutEffect, useState } from 'react'

// Radius of the elbow where a branch turns out of the trunk.
const CORNER = 10
// How far the arrowhead sits from the item card's edge.
const ARROW = 7

// Draws company → item connectors from the cards' real rendered positions,
// so they stay correct when text wraps, a card changes height, or the
// viewport resizes. Nothing here is a fixed pixel guess.
function useConnectorPaths(rowRef, sourceRef, targetRefs) {
  const [paths, setPaths] = useState([])
  const [box, setBox] = useState({ width: 0, height: 0 })

  // Measurement reads refs rather than props, so there is nothing for a
  // memo to key on and it lives inside the effect.
  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current
      const source = sourceRef.current
      if (!row || !source) return

      const rowRect = row.getBoundingClientRect()
      const sourceRect = source.getBoundingClientRect()

      const targets = targetRefs.current.filter(Boolean)
      if (!targets.length) {
        setPaths([])
        setBox({ width: rowRect.width, height: rowRect.height })
        return
      }

      // All coordinates are relative to the row, which is the SVG's own box.
      const startX = sourceRect.right - rowRect.left
      const startY = sourceRect.top + sourceRect.height / 2 - rowRect.top

      const ends = targets.map((node) => {
        const rect = node.getBoundingClientRect()
        return {
          x: rect.left - rowRect.left - ARROW,
          y: rect.top + rect.height / 2 - rowRect.top,
        }
      })

      // The trunk runs halfway across the gap, then each branch turns off it.
      const trunkX = startX + (Math.min(...ends.map((end) => end.x)) - startX) / 2

      const next = ends.map((end) => {
        if (Math.abs(end.y - startY) < 1) {
          return `M ${startX} ${startY} H ${end.x}`
        }
        const down = end.y > startY ? 1 : -1
        return [
          `M ${startX} ${startY}`,
          `H ${trunkX - CORNER}`,
          `Q ${trunkX} ${startY} ${trunkX} ${startY + CORNER * down}`,
          `V ${end.y - CORNER * down}`,
          `Q ${trunkX} ${end.y} ${trunkX + CORNER} ${end.y}`,
          `H ${end.x}`,
        ].join(' ')
      })

      setPaths(next)
      setBox({ width: rowRect.width, height: rowRect.height })
    }

    const observer = new ResizeObserver(measure)

    const bind = () => {
      observer.disconnect()
      if (rowRef.current) observer.observe(rowRef.current)
      if (sourceRef.current) observer.observe(sourceRef.current)
      targetRefs.current.forEach((node) => node && observer.observe(node))
      measure()
    }

    bind()

    // The row is this component's parent and the items are a later sibling,
    // and React attaches both of those refs only after this child's layout
    // effect has run. Without binding again on the next frame the row is
    // never observed, and the arrows keep the geometry they had before the
    // web font swapped and the text re-wrapped.
    const frame = requestAnimationFrame(bind)

    // Belt and braces for that same font swap, in case it lands between the
    // two binds.
    let live = true
    document.fonts?.ready.then(() => {
      if (live) measure()
    })

    window.addEventListener('resize', measure)
    return () => {
      live = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [rowRef, sourceRef, targetRefs])

  return { paths, box }
}

function ExperienceConnectors({ rowRef, sourceRef, targetRefs, id }) {
  const { paths, box } = useConnectorPaths(rowRef, sourceRef, targetRefs)
  const markerId = `xp-arrow-${id}`

  if (!paths.length || !box.width) return null

  return (
    <svg
      className="xp-connectors"
      width={box.width}
      height={box.height}
      viewBox={`0 0 ${box.width} ${box.height}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="7"
          markerHeight="7"
          refX="5.5"
          refY="3"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M1 1 L5.5 3 L1 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {paths.map((d, index) => (
        <path key={index} d={d} fill="none" strokeWidth="1.5" markerEnd={`url(#${markerId})`} />
      ))}
    </svg>
  )
}

export default ExperienceConnectors

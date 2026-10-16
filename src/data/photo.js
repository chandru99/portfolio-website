// Single swap point for the Overview hero image. Two cuts of the same
// photograph, one per theme, so it merges into the page instead of sitting
// in a visible box.
//
// Both were derived from the supplied originals: downscaled to 768w (the
// hero renders ~340 CSS px wide, so this covers a 2x display) and their
// backdrops flood-filled from the border to exactly --color-bg — #ffffff
// for light, #0b0f17 for dark. The subject is untouched; only backdrop
// pixels connected to the edge were recoloured. Lossless WebP on purpose:
// every lossy setting shifted that flat backdrop a level or two off the
// page colour, which is visible as a rectangle on a near-black page.
//
// To change the photo, replace the files in public/images/hero/ or point
// these at new ones; HeroVisual.jsx never needs to change. Keep the two
// cuts the same dimensions, and update PHOTO_WIDTH/HEIGHT if they change —
// the hero sizes itself from those.
export const PHOTO_SRC_LIGHT = '/images/hero/professional-photo-light.webp'
export const PHOTO_SRC_DARK = '/images/hero/professional-photo-dark.webp'
export const PHOTO_ALT = 'Chandramouli Sivakumar, standing in a navy suit and tie'
export const PHOTO_WIDTH = 768
export const PHOTO_HEIGHT = 1376

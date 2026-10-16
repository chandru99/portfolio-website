import {
  PHOTO_ALT,
  PHOTO_HEIGHT,
  PHOTO_SRC_DARK,
  PHOTO_SRC_LIGHT,
  PHOTO_WIDTH,
} from '../data/photo.js'
import './HeroVisual.css'

function HeroVisual() {
  return (
    <div className="hero-visual">
      {/* Visible immediately. Theme changes fade only the top image layer;
          both approved photographs remain mounted. */}
      <img className="hero-photo hero-photo-light" src={PHOTO_SRC_LIGHT}
        alt={PHOTO_ALT} width={PHOTO_WIDTH} height={PHOTO_HEIGHT}
        fetchPriority="high" decoding="sync" />
      <img className="hero-photo hero-photo-dark" src={PHOTO_SRC_DARK}
        alt="" aria-hidden="true" width={PHOTO_WIDTH} height={PHOTO_HEIGHT}
        fetchPriority="high" decoding="sync" />
    </div>
  )
}

export default HeroVisual

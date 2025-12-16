export type AmbientEmotion =
  | "calm"
  | "curious"
  | "focused"
  | "excited"
  | "rest"

type AmbientState = {
  glow: number
  motion: number
  hue: number
}

export class AmbientField {
  private intensity = 0.45
  private targetIntensity = 0.45
  private hue = 190 // ocean cyan
  private time = 0

  private prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  /* =========================================
     INPUT SIGNALS
  ========================================= */

  updateEmotion(emotion: AmbientEmotion) {
    switch (emotion) {
      case "calm":
        this.targetIntensity = 0.3
        break
      case "focused":
        this.targetIntensity = 0.4
        break
      case "curious":
        this.targetIntensity = 0.55
        break
      case "excited":
        this.targetIntensity = 0.7
        break
      case "rest":
        this.targetIntensity = 0.25
        break
    }
  }

  updatePresence(resonance: number) {
    // Nearby learners gently amplify field
    this.targetIntensity += resonance * 0.08
  }

  updateTime(delta: number) {
    this.time += delta
  }

  /* =========================================
     CORE STATE
  ========================================= */

  state(): AmbientState {
    // Smooth damping (mobile-safe)
    this.intensity += (this.targetIntensity - this.intensity) * 0.05

    const motion = this.prefersReducedMotion
      ? 0
      : Math.sin(this.time * 0.8) * this.intensity * 12

    return {
      glow: clamp(this.intensity, 0.15, 0.85),
      motion,
      hue: this.hue
    }
  }
}

/* =========================================
   UTIL
========================================= */

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}
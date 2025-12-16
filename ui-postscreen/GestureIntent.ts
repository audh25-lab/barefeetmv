export type GestureIntentType =
  | "explore"
  | "rest"
  | "advance"
  | "reflect"
  | "neutral"

type GestureConfig = {
  distanceThreshold: number
  velocityThreshold: number
  deadZone: number
}

export class GestureIntent {
  private lastIntent: GestureIntentType = "neutral"

  private config: GestureConfig = {
    distanceThreshold: 40, // px
    velocityThreshold: 0.3, // px/ms
    deadZone: 12 // px
  }

  /**
   * Interpret a gesture based on distance + velocity
   */
  interpret(
    deltaX: number,
    deltaY: number,
    velocityX = 0,
    velocityY = 0
  ): GestureIntentType {
    // Dead zone (prevents jitter)
    if (
      Math.abs(deltaX) < this.config.deadZone &&
      Math.abs(deltaY) < this.config.deadZone
    ) {
      return "neutral"
    }

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    const fastEnough =
      Math.abs(velocityX) > this.config.velocityThreshold ||
      Math.abs(velocityY) > this.config.velocityThreshold

    // Vertical intent dominates (natural scroll)
    if (absY > absX && absY > this.config.distanceThreshold && fastEnough) {
      if (deltaY < 0) return this.commit("explore")
      if (deltaY > 0) return this.commit("rest")
    }

    // Horizontal intent (deliberate swipe)
    if (absX > this.config.distanceThreshold && fastEnough) {
      if (deltaX > 0) return this.commit("advance")
      if (deltaX < 0) return this.commit("reflect")
    }

    return "neutral"
  }

  /**
   * Prevent rapid intent flickering
   */
  private commit(intent: GestureIntentType): GestureIntentType {
    if (intent === this.lastIntent) return "neutral"
    this.lastIntent = intent
    return intent
  }

  /**
   * Optional runtime tuning (mobile / XR)
   */
  configure(partial: Partial<GestureConfig>) {
    this.config = { ...this.config, ...partial }
  }
}
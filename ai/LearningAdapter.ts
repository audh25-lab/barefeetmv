export type Emotion = "joy" | "curiosity" | "focus" | "calm" | "bored"

export class EmotionalModel {
  private state: Record<Emotion, number> = {
    joy: 0.7,
    curiosity: 0.8,
    focus: 0.6,
    calm: 0.5,
    bored: 0.1
  }

  update(event: string) {
    if (event === "play") this.state.joy += 0.05
    if (event === "learn") this.state.focus += 0.05
    if (event === "repeat") this.state.bored += 0.03
  }

  snapshot() {
    return this.state
  }
}
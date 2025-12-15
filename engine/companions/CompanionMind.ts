export type Emotion = "calm" | "happy" | "curious" | "focused"

export class CompanionMind {
  emotion: Emotion = "calm"

  adapt(userAction: string) {
    if (userAction === "explore") this.emotion = "curious"
    if (userAction === "learn") this.emotion = "focused"
    if (userAction === "play") this.emotion = "happy"

    return this.emotion
  }
}
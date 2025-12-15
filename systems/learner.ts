export type LearnerState = {
  age: number
  curiosity: number
  mastery: number
  lastActive: number
}

export class LearnerProfile {
  private key = "barefeetmv:learner"
  state: LearnerState

  constructor() {
    const saved = localStorage.getItem(this.key)
    this.state = saved
      ? JSON.parse(saved)
      : { age: 6, curiosity: 0.5, mastery: 0.1, lastActive: Date.now() }
  }

  update(event: "learn" | "play" | "rest") {
    if (event === "learn") {
      this.state.curiosity += 0.05
      this.state.mastery += 0.02
    }
    this.state.lastActive = Date.now()
    localStorage.setItem(this.key, JSON.stringify(this.state))
  }
}
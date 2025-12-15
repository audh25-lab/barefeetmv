export class EmotionalModel {
  private state: string = "neutral"

  update(event: string) {
    if (event.includes("happy")) this.state = "happy"
    else if (event.includes("sad")) this.state = "sad"
    else if (event.includes("excited")) this.state = "excited"
    else this.state = "neutral"
  }

  snapshot() {
    return {
      mood: this.state,
      timestamp: Date.now()
    }
  }
}
export class EmotionalModel {
  private mood = "neutral"

  update(event: string) {
    if (event.includes("happy")) this.mood = "happy"
    else if (event.includes("sad")) this.mood = "sad"
    else this.mood = "neutral"
  }

  snapshot() {
    return {
      mood: this.mood
    }
  }
}
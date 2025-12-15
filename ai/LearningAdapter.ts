import { EmotionalModel } from "./EmotionalModel"

export default class LearningAdapter {
  constructor(private emotion: EmotionalModel) {}

  adapt(subject: string, age: number) {
    if (age <= 5) return `Let’s play with ${subject} 🎈`
    if (age <= 8) return `Let’s explore ${subject} together 📘`
    return `Let’s learn ${subject} creatively ✨`
  }
}
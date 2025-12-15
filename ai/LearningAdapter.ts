import { EmotionalModel } from "./EmotionalModel"

export default class LearningAdapter {
  constructor(private emotion: EmotionalModel) {}

  adapt(subject: string, age: number) {
    if (age < 5) return `Learning ${subject} through play 🎈`
    if (age < 9) return `Exploring ${subject} with stories 📘`
    return `Understanding ${subject} creatively ✨`
  }
}
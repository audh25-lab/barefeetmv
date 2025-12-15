import { EmotionalModel } from "./EmotionalModel"

export default class LearningAdapter {
  constructor(private emotion: EmotionalModel) {}

  adapt(subject: string, age: number) {
    if (age < 5) {
      return `Let's play and learn ${subject} with fun sounds 🎵`
    }

    if (age < 9) {
      return `Let's explore ${subject} with stories and puzzles 🧩`
    }

    return `Let's study ${subject} in a smart and creative way ✨`
  }
}
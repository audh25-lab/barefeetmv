import { EmotionalModel } from "./EmotionalModel"
import { LearningAdapter } from "./LearningAdapter"

export class CognitiveAI {
  emotion = new EmotionalModel()
  learner = new LearningAdapter(this.emotion)

  constructor(
    public name: string,
    public culture: string,
    public language: string
  ) {}

  interact(event: string, subject: string, age: number) {
    this.emotion.update(event)

    return {
      companion: this.name,
      response: this.learner.adapt(subject, age),
      emotion: this.emotion.snapshot()
    }
  }
}
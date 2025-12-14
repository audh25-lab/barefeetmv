import { CognitiveAI } from "./CognitiveAI"

export class WorldBrain {
  private minds: Record<string, CognitiveAI> = {}

  spawn(userId: string, culture: string, language: string) {
    this.minds[userId] = new CognitiveAI(
      `Bare-${userId.slice(0,3)}`,
      culture,
      language
    )
  }

  think(userId: string, event: string, subject: string, age: number) {
    return this.minds[userId].interact(event, subject, age)
  }
}
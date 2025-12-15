import { worldState } from "./WorldState"

const EMOTION_MAP: Record<string, string> = {
  explore: "curious",
  rest: "calm",
  advance: "excited",
  reflect: "thoughtful"
}

export class EmotionLoop {
  react(intent: string) {
    const mood = EMOTION_MAP[intent] || "neutral"
    worldState.set({ companionMood: mood })
    worldState.remember(`Companion feels ${mood}`)
  }
}
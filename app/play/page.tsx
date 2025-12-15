import { CognitiveAI } from "../../ai/CognitiveAI"

export default function Play() {
  const ai = new CognitiveAI("Barefeet", "Maldivian", "en")
  const result = ai.interact("happy", "letters", 6)

  return (
    <main>
      <h2>Your Learning Companion</h2>
      <p>{result.response}</p>
      <small>Mood: {result.emotion.mood}</small>
    </main>
  )
}
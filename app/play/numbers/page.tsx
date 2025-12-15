import { CognitiveAI } from "../../../ai/CognitiveAI"

export default function NumbersGame() {
  const ai = new CognitiveAI("Barefeet", "Maldivian", "en")
  const result = ai.interact("excited", "numbers", 7)

  return (
    <main>
      <h2>🔢 Numbers Game</h2>
      <p>{result.response}</p>

      <div style={{ fontSize: 40, marginTop: 20 }}>
        1 • 2 • 3 • 4
      </div>
    </main>
  )
}
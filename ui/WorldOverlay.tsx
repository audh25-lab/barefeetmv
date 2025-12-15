"use client"
import { useEffect, useState } from "react"
import { worldState } from "@/engine/WorldState"

export default function WorldOverlay() {
  const [state, setState] = useState(worldState.get())

  useEffect(() => {
    const id = setInterval(() => setState({ ...worldState.get() }), 500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: "absolute",
      top: 20,
      left: 20,
      color: "#fff",
      fontFamily: "sans-serif"
    }}>
      <div>Island: {state.island}</div>
      <div>Mood: {state.companionMood}</div>
      <div>Memory:</div>
      <ul>
        {state.memory.slice(-3).map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  )
}
"use client"

import { useEffect, useRef } from "react"
import { WorldEngine } from "@/engine/WorldEngine"
import AdaptiveSurface from "@/ui-postscreen/AdaptiveSurface"
import { PresenceUI } from "@/ui-postscreen/PresenceUI"

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<WorldEngine | null>(null)

  useEffect(() => {
    if (!mountRef.current || engineRef.current) return

    const engine = new WorldEngine(mountRef.current)
    engineRef.current = engine

    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  return (
    <>
      {/* AI + Curriculum Overlay */}
      <AdaptiveSurface />

      {/* Three.js World */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          touchAction: "none" // 🔥 important for mobile gestures
        }}
      />

      {/* Presence / Emotional Feedback */}
      <PresenceUI resonance={0.6} />
    </>
  )
}
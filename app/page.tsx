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

    engineRef.current = new WorldEngine(mountRef.current)

    return () => {
      engineRef.current?.destroy()
      engineRef.current = null
      mountRef.current?.replaceChildren()
    }
  }, [])

  return (
    <>
      {/* AI / Curriculum Overlay */}
      <div className="fade-in">
        <AdaptiveSurface />
      </div>

      {/* Three.js World */}
      <div
        ref={mountRef}
        role="application"
        aria-label="Interactive learning world"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden"
        }}
      />

      {/* Emotional / Presence UI */}
      <PresenceUI resonance={0.6} />
    </>
  )
}
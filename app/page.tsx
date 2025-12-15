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
      // Safe cleanup for Next.js 14 strict mode
      engineRef.current = null
      mountRef.current?.replaceChildren()
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
          overflow: "hidden"
        }}
      />

      {/* Presence / Emotional Feedback */}
      <PresenceUI resonance={0.6} />
    </>
  )
}
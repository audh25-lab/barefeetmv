"use client"

import { useEffect, useRef } from "react"
import { WorldEngine } from "@/engine/WorldEngine"
import AdaptiveSurface from "@/ui-postscreen/AdaptiveSurface"
import { PresenceUI } from "@/ui-postscreen/PresenceUI"

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    new WorldEngine(ref.current)
  }, [])

  return (
    <>
      <AdaptiveSurface />
      <div ref={ref} style={{ position: "absolute", inset: 0 }} />
      <PresenceUI resonance={0.6} />
    </>
  )
}
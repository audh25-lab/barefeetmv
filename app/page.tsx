"use client"

import { useEffect, useRef } from "react"
import { WorldEngine } from "@/engine/WorldEngine"
import AdaptiveSurface from "@/ui-postscreen/AdaptiveSurface"
import { PresenceUI } from "@/ui-postscreen/PresenceUI"

export default function Home() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mount.current) return
    new WorldEngine(mount.current)
  }, [])

  return (
    <>
      <AdaptiveSurface />
      <div ref={mount} style={{ position: "absolute", inset: 0 }} />
      <PresenceUI resonance={0.6} />
    </>
  )
}
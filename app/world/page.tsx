"use client"

import { useEffect, useRef } from "react"
import { WorldEngine } from "@/engine/WorldEngine"

export default function WorldPage() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return
    const world = new WorldEngine()
    world.mount(container.current)
  }, [])

  return (
    <div
      ref={container}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    />
  )
}
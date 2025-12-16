"use client"

import { useEffect, useRef, useState } from "react"
import { AmbientField } from "./AmbientField"

export default function AdaptiveSurface() {
  const fieldRef = useRef<AmbientField | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(performance.now())

  const [state, setState] = useState({
    glow: 0.25,
    motion: 0,
    hue: 190
  })

  useEffect(() => {
    fieldRef.current = new AmbientField()

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const loop = (time: number) => {
      if (!fieldRef.current) return

      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      fieldRef.current.updateTime(dt)

      // Throttle visual updates slightly for mobile
      if (!prefersReducedMotion || time % 2 < 1) {
        setState(fieldRef.current.state())
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      fieldRef.current = null
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",

        background: `radial-gradient(circle,
          hsla(${state.hue}, 90%, 60%, ${state.glow}) 0%,
          hsl(${state.hue}, 40%, 8%) 70%)`,

        transform: `translateY(${state.motion}px)`,
        transition: "background 0.3s ease"
      }}
    />
  )
}
"use client"
import { useEffect, useState } from "react"
import { AmbientField } from "./AmbientField"

export default function AdaptiveSurface() {
  const [field] = useState(new AmbientField())
  const [state, setState] = useState(field.state())

  useEffect(() => {
    const loop = () => {
      setState(field.state())
      requestAnimationFrame(loop)
    }
    loop()
  }, [field])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle,
          rgba(0,229,255,${state.glow}) 0%,
          #001 70%)`,
        transform: `translateY(${state.motion}px)`
      }}
    />
  )
}
"use client"

import { useEffect, useState } from "react"

export function PresenceUI({ resonance }: { resonance: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(resonance > 0.05)
  }, [resonance])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",

        padding: "8px 14px",
        borderRadius: 12,

        background: "rgba(0,0,0,0.55)",
        color: "white",
        fontSize: 13,
        letterSpacing: 0.2,

        opacity: resonance,
        transition: "opacity 0.3s ease",

        pointerEvents: "none",
        userSelect: "none"
      }}
    >
      Someone you know is learning nearby
    </div>
  )
}
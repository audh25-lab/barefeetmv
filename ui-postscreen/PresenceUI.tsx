export function PresenceUI({ resonance }: { resonance: number }) {
  return (
    <div style={{
      position: "absolute",
      bottom: 40,
      left: "50%",
      transform: "translateX(-50%)",
      opacity: resonance
    }}>
      Someone you know is learning nearby
    </div>
  )
}

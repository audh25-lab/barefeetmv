use client"
import { useEffect, useRef } from "react"

export default function BarefeetHome() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = canvas.current!.getContext("2d")!
    let t = 0
    function loop() {
      ctx.fillStyle = "#003"
      ctx.fillRect(0,0,innerWidth,innerHeight)
      ctx.beginPath()
      ctx.arc(innerWidth/2, innerHeight/2, 150 + Math.sin(t/20)*20, 0, Math.PI*2)
      ctx.fillStyle = "#00e5ff"
      ctx.fill()
      t++
      requestAnimationFrame(loop)
    }
    loop()
  }, [])

  return (
    <>
      <canvas ref={canvas} width={innerWidth} height={innerHeight}/>
      <h1 className="brand">BarefeetMV</h1>
      <p className="tag">A living world of learning</p>
    </>
  )
}
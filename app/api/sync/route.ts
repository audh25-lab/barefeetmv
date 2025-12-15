import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

type SavePayload = {
  learner?: any
  world?: any
  timestamp?: number
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as SavePayload

    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      )
    }

    // Soft size guard (Edge-safe)
    const size = JSON.stringify(payload).length
    if (size > 50_000) {
      return NextResponse.json(
        { error: "Payload too large" },
        { status: 413 }
      )
    }

    /**
     * FUTURE:
     * - DB (Postgres / PlanetScale)
     * - Object storage (S3 / R2)
     * - Firebase / Supabase
     */

    return NextResponse.json({
      ok: true,
      receivedAt: Date.now()
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    )
  }
}
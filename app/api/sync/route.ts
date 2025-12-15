import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const payload = await req.json()
  // replace with DB / S3 / Firebase later
  return NextResponse.json({ ok: true, payload })
}
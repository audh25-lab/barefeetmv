import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

type BasicLessonRequest = {
  topic: string
  age: number
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BasicLessonRequest
    const { topic, age } = body

    if (!topic || typeof age !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid topic or age" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      title: `Explore ${topic}`,
      objective: `Learn ${topic} at age ${age}`,
      activities: [
        "Observe the environment",
        "Interact with objects",
        "Answer a reflection question"
      ],
      difficulty:
        age < 7 ? "early" : age < 12 ? "intermediate" : "advanced",
      generatedAt: Date.now()
    })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 500 }
    )
  }
}
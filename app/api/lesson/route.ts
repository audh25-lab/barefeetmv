import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  try {
    const { world, age } = await req.json()

    if (!world || !age) {
      return NextResponse.json(
        { error: "Missing world or age" },
        { status: 400 }
      )
    }

    const prompt = `
Create a short educational lesson.

World: ${world}
Age: ${age}

Rules:
- Friendly
- Factual
- Age appropriate
- 3 short sections
- Encourage curiosity
`

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json(
        { error: "LLM error", details: err },
        { status: 500 }
      )
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content ?? ""

    return NextResponse.json({
      world,
      age,
      lesson: content
    })
  } catch (e) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}
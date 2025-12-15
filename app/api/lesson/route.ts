import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const { world, age } = await req.json()

  const prompt = `
  Create a short educational lesson.
  World: ${world}
  Age: ${age}
  Friendly, factual, engaging.
  `

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  })

  const data = await res.json()
  return new Response(data.choices[0].message.content)
}
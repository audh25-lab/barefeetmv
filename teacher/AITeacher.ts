export class AITeacher {
  async generateLesson(topic: string, age: number) {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ topic, age })
    })
    return res.json()
  }
}
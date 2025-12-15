export class IslandSync {
  private queue: any[] = []

  record(event: any) {
    this.queue.push({
      ...event,
      ts: Date.now()
    })
    localStorage.setItem("bfmv:queue", JSON.stringify(this.queue))
  }

  async sync(send: (data: any[]) => Promise<void>) {
    if (!navigator.onLine) return

    const data = JSON.parse(
      localStorage.getItem("bfmv:queue") || "[]"
    )

    if (!data.length) return

    await send(data)

    this.queue = []
    localStorage.removeItem("bfmv:queue")
  }
}
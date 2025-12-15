export class LiveSyncClient {
  ws!: WebSocket
  userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  connect() {
    this.ws = new WebSocket("ws://localhost:3001")
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({ type: "join", userId: this.userId }))
    }
  }

  sendState(payload: any) {
    this.ws.send(
      JSON.stringify({
        type: "state",
        userId: this.userId,
        payload
      })
    )
  }

  onRemote(cb: (data: any) => void) {
    this.ws.onmessage = e => cb(JSON.parse(e.data))
  }
}
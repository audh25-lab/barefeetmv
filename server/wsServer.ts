import { WebSocketServer } from "ws"

export type WSMessage =
  | { type: "join"; userId: string }
  | { type: "state"; userId: string; payload: any }

export function startWSServer(port = 3001) {
  const wss = new WebSocketServer({ port })
  const clients = new Map<string, any>()

  wss.on("connection", ws => {
    let id = ""

    ws.on("message", raw => {
      const msg = JSON.parse(raw.toString()) as WSMessage

      if (msg.type === "join") {
        id = msg.userId
        clients.set(id, ws)
      }

      if (msg.type === "state") {
        for (const [uid, client] of clients) {
          if (uid !== msg.userId && client.readyState === 1) {
            client.send(JSON.stringify(msg))
          }
        }
      }
    })

    ws.on("close", () => {
      if (id) clients.delete(id)
    })
  })

  console.log(`🌐 WebSocket running on :${port}`)
}
import WebSocket = require("ws")

const wss = new WebSocket.WebSocketServer({
  port: 3001,
})

wss.on("connection", (ws) => {
  console.log("Client connected")

  ws.send(
    JSON.stringify({
      message: "Connected to weather socket",
    })
  )
})

console.log("WebSocket server running on port 3001")
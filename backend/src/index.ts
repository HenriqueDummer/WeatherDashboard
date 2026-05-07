import { WebSocketServer } from "ws"  

const wss = new WebSocketServer({
  port: 3001,
})

wss.on("connection", (ws) => {
  console.log("Client connected")
})

async function broadcastWeather() {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=-29.46&longitude=-51.96&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
  )

  const data = await response.json()

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data))
  })

  console.log(data)
}

setInterval(broadcastWeather, 1000 * 60)

console.log("WebSocket server running on port 3001")
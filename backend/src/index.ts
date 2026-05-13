import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";
import { weatherRouter } from "./routes/weather.route.js";
import { registerWeatherSocket } from "./websocket/weather.websocket.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/weather", weatherRouter);

const server = app.listen(3001, () => {
	console.log("HTTP server running on port 3001");
});

const wss = new WebSocketServer({
	server,
});

registerWeatherSocket(wss);

console.log("WebSocket server running");

import type { WebSocket, WebSocketServer } from "ws";
import { getWeather } from "../services/weather.service.js";

export function registerWeatherSocket(wss: WebSocketServer) {
	wss.on("connection", (ws: WebSocket, req) => {
		console.log("Client connected");

		const url = new URL(req.url || "", "http://localhost");

		const latitude = url.searchParams.get("lat");
		const longitude = url.searchParams.get("lon");

		if (!latitude || !longitude) {
			ws.send(
				JSON.stringify({
					error: "Latitude and longitude are required",
				}),
			);

			ws.close();

			return;
		}

		const sendWeather = async () => {
			try {
				const weather = await getWeather(latitude, longitude);

				ws.send(JSON.stringify(weather));
			} catch (error) {
				console.error("Weather fetch error:", error);

				ws.send(
					JSON.stringify({
						error: "Failed to fetch weather",
					}),
				);
			}
		};

		sendWeather();

		const interval = setInterval(sendWeather, 1000 * 60 * 5);

		ws.on("close", () => {
			console.log("Client disconnected");

			clearInterval(interval);
		});
	});
}

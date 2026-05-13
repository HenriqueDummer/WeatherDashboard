import { useEffect, useState } from "react";

interface WeatherData {
	temperature: number;
	humidity: number;
	windSpeed: number;
	time: string;
}

export function useWeatherSocket() {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let ws: WebSocket;

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				ws = new WebSocket(
					`ws://localhost:3001?lat=${latitude}&lon=${longitude}`,
				);

				ws.onopen = () => {
					console.log("Connected to weather websocket");
				};

				ws.onmessage = (event) => {
					try {
						const data: WeatherData = JSON.parse(event.data);
						console.log("Received weather data:", data);

						setWeather(data);
					} catch {
						setError("Failed to parse weather data");
					}
				};

				ws.onerror = () => {
					setError("WebSocket connection error");
				};

				ws.onclose = () => {
					console.log("WebSocket connection closed");
				};
			},
			(err) => {
				setError(`Geolocation error: ${err.message}`);
			},
		);

		return () => {
			ws?.close();
		};
	}, []);

	return {
		weather,
		error,
	};
}

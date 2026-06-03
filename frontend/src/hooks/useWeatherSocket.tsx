import { useEffect, useState } from "react";

export interface WeatherData {
	temperature: number;
	humidity: number;
	windSpeed: number;
	time: string;
}

const WEATHER_SOCKET_URL =
	import.meta.env.VITE_WEATHER_SOCKET_URL ?? "ws://localhost:3001";

export function useWeatherSocket() {
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let ws: WebSocket;

		if (!navigator.geolocation) {
			setError("Geolocation is not supported by this browser");
			setIsLoading(false);

			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const latitude = position.coords.latitude;
				const longitude = position.coords.longitude;

				ws = new WebSocket(
					`${WEATHER_SOCKET_URL}?lat=${latitude}&lon=${longitude}`,
				);

				ws.onopen = () => {
					console.log("Connected to weather websocket");
				};

				ws.onmessage = (event) => {
					try {
						const data: WeatherData = JSON.parse(event.data);
						console.log("Received weather data:", data);

						setWeather(data);
						setError(null);
						setIsLoading(false);
					} catch {
						setError("Failed to parse weather data");
						setIsLoading(false);
					}
				};

				ws.onerror = () => {
					setError("WebSocket connection error");
					setIsLoading(false);
				};

				ws.onclose = () => {
					console.log("WebSocket connection closed");
				};
			},
			(err) => {
				setError(`Geolocation error: ${err.message}`);
				setIsLoading(false);
			},
		);

		return () => {
			ws?.close();
		};
	}, []);

	return {
		weather,
		error,
		isLoading,
	};
}

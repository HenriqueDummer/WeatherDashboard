import { useWeatherSocket } from "./hooks/useWeatherSocket";

export default function App() {
	const { weather, error } = useWeatherSocket();

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<>
			<h1 className="text-4xl font-bold text-center mt-8">Weather Dashboard</h1>

			{weather && (
				<div className="mt-8 text-center">
					<p>Temperature: {weather.temperature}°C</p>
					<p>Humidity: {weather.humidity}%</p>
					<p>Wind: {weather.windSpeed} km/h</p>
				</div>
			)}
		</>
	);
}

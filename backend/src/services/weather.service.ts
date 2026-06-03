export interface WeatherData {
	temperature: number;
	humidity: number;
	windSpeed: number;
	time: string;
}

export interface CityWeatherData extends WeatherData {
	city: string;
	country: string;
	latitude: number;
	longitude: number;
}

interface MainCity {
	city: string;
	country: string;
	latitude: number;
	longitude: number;
}

const MAIN_WORLD_CITIES: MainCity[] = [
	{ city: "New York", country: "United States", latitude: 40.7128, longitude: -74.006 },
	{ city: "London", country: "United Kingdom", latitude: 51.5072, longitude: -0.1276 },
	{ city: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
	{ city: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
	{ city: "Beijing", country: "China", latitude: 39.9042, longitude: 116.4074 },
	{ city: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708 },
	{ city: "Mumbai", country: "India", latitude: 19.076, longitude: 72.8777 },
	{ city: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
	{ city: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357 },
	{ city: "Sao Paulo", country: "Brazil", latitude: -23.5558, longitude: -46.6396 },
	{ city: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332 },
	{ city: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832 },
];

export async function getWeather(
	latitude: string,
	longitude: string,
): Promise<WeatherData> {
	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
	);

	const data = await response.json();

	return {
		temperature: data.current.temperature_2m,
		humidity: data.current.relative_humidity_2m,
		windSpeed: data.current.wind_speed_10m,
		time: data.current.time,
	};
}

export async function getMainWorldCitiesWeather(): Promise<CityWeatherData[]> {
	return Promise.all(
		MAIN_WORLD_CITIES.map(async (city) => {
			const weather = await getWeather(
				city.latitude.toString(),
				city.longitude.toString(),
			);

			return {
				...city,
				...weather,
			};
		}),
	);
}

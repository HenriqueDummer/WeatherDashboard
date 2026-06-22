export interface WeatherData {
	temperature: number;
	humidity: number;
	windSpeed: number;
	time: string;
	apparentTemperature?: number;
	precipitation?: number;
	cloudCover?: number;
	weatherCode?: number;
}

export interface CityWeatherData extends WeatherData {
	city: string;
	country: string;
	latitude: number;
	longitude: number;
}

export interface CitySearchResult {
	id: number;
	name: string;
	country: string;
	admin1?: string;
	latitude: number;
	longitude: number;
	timezone?: string;
	population?: number;
}

interface GeocodingApiResult {
	id: number;
	name: string;
	country: string;
	admin1?: string;
	latitude: number;
	longitude: number;
	timezone?: string;
	population?: number;
}

interface GeocodingApiResponse {
	results?: GeocodingApiResult[];
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
	{ city: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
	{ city: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708 },
	{ city: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357 },
	{ city: "Sao Paulo", country: "Brazil", latitude: -23.5558, longitude: -46.6396 },
	{ city: "Mexico City", country: "Mexico", latitude: 19.4326, longitude: -99.1332 },
	{ city: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832 },
];

export async function getWeather(
	latitude: string,
	longitude: string,
): Promise<WeatherData> {
	const currentVariables = [
		"temperature_2m",
		"relative_humidity_2m",
		"wind_speed_10m",
		"apparent_temperature",
		"precipitation",
		"cloud_cover",
		"weather_code",
	].join(",");

	const params = new URLSearchParams({
		latitude,
		longitude,
		current: currentVariables,
	});

	const response = await fetch(
		`https://api.open-meteo.com/v1/forecast?${params.toString()}`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch weather data");
	}

	const data = await response.json();

	return {
		temperature: data.current.temperature_2m,
		humidity: data.current.relative_humidity_2m,
		windSpeed: data.current.wind_speed_10m,
		time: data.current.time,
		apparentTemperature: data.current.apparent_temperature,
		precipitation: data.current.precipitation,
		cloudCover: data.current.cloud_cover,
		weatherCode: data.current.weather_code,
	};
}

export async function searchCities(city: string): Promise<CitySearchResult[]> {
	const params = new URLSearchParams({
		name: city,
		count: "8",
		language: "pt",
		format: "json",
	});

	const response = await fetch(
		`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`,
	);

	if (!response.ok) {
		throw new Error("Failed to search cities");
	}

	const data = (await response.json()) as GeocodingApiResponse;

	return (data.results ?? []).map((result) => {
		const city: CitySearchResult = {
			id: result.id,
			name: result.name,
			country: result.country,
			latitude: result.latitude,
			longitude: result.longitude,
		};

		if (result.admin1 !== undefined) {
			city.admin1 = result.admin1;
		}

		if (result.timezone !== undefined) {
			city.timezone = result.timezone;
		}

		if (result.population !== undefined) {
			city.population = result.population;
		}

		return city;
	});
}

export async function getCityWeather(
	latitude: string,
	longitude: string,
	city: string,
	country: string,
): Promise<CityWeatherData> {
	const weather = await getWeather(latitude, longitude);

	return {
		city,
		country,
		latitude: Number(latitude),
		longitude: Number(longitude),
		...weather,
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
